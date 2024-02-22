import React, { useEffect } from "react";
import Header from "../components/Header";
import DateFlipper from "../components/DateFlipper";
import AddCategoryModal from "../components/AddCategoryModal";
import AddWeeklyResult from "../components/AddWeeklyResult";
import UpdateWeeklyResult from "../components/UpdateWeeklyResult";
import Category from "../components/Category";

import { useSelector } from "react-redux";
import { useGetCategoriesByIdQuery } from "../app/api/categories/categoriesApi";
import { useGetWeeklyReviewsQuery } from "../app/api/weekly-review/weeklyReviewApi";

function MyHabits() {
  const { data: categoriesData, refetch: refetchCategoreisData } =
    useGetCategoriesByIdQuery();

  const { data: weeklyReviewData } = useGetWeeklyReviewsQuery();

  const user = useSelector((state) => state.auth.value);
  //Grab current date
  const dateString = useSelector((state) => state.date.value);
  // convert ISO string into date
  const date = new Date(dateString);

  // Gives you what day it is (ex. Monday, Tuesday, etc.)
  const dayOfWeek = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(date);

  // Setting the first day of the week
  // Grab this date to check if a weekly review already exists for the week or not
  // If it already exists replace button with Update Weekly Results instead
  const monday = new Date(dateString);
  // using setDate to get first day of week
  monday.setDate(monday.getDate() - 6);

  // Get the list of dates where a Weekly Review already exists
  // Need ?. to check if a weeklyReviewDate exists or not
  const weeklyReviewDates = weeklyReviewData?.map((weeklyData) => {
    return weeklyData.week_last_date.split("T")[0];
  });

  // Effect to trigger re-fetch of habit category data when the user logs in
  useEffect(() => {
    if (user.username) {
      refetchCategoreisData();
    }
  }, [user.username, refetchCategoreisData]);

  return (
    <div>
      <Header />
      <div className="content-container content-header-margin">
        <DateFlipper />

        {categoriesData &&
          categoriesData.map((category) => {
            return (
              <div key={category._id} className="mb-4">
                <Category category={category} />
              </div>
            );
          })}

        <div className="mt-4">
          <AddCategoryModal />
        </div>

        {dayOfWeek === "Sunday" &&
          !weeklyReviewDates.includes(date.toISOString().split("T")[0]) && (
            <AddWeeklyResult monday={monday} sunday={date} />
          )}

        {dayOfWeek === "Sunday" &&
          weeklyReviewDates.includes(date.toISOString().split("T")[0]) && (
            <UpdateWeeklyResult monday={monday} sunday={date} />
          )}
      </div>
    </div>
  );
}

export default MyHabits;
