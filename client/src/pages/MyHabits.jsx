import React, { useEffect } from "react";
import Header from "../components/Header";
import DateFlipper from "../components/DateFlipper";
import AddCategoryModal from "../components/AddCategoryModal";
import AddWeeklyResult from "../components/AddWeeklyResult";
import UpdateWeeklyResult from "../components/UpdateWeeklyResult";
import Category from "../components/Category";
import "../styles/MyHabits.css";

import { useSelector } from "react-redux";
import { useGetCategoriesByIdQuery } from "../app/api/categories/categoriesApi";
import { useGetWeeklyReviewsQuery } from "../app/api/weekly-review/weeklyReviewApi";

function MyHabits() {
  const { data: categoriesData, refetch: refetchCategoreisData } =
    useGetCategoriesByIdQuery();

  const { data: weeklyReviewData } = useGetWeeklyReviewsQuery();

  const update = useSelector((state) => state.update.value);
  const submit = useSelector((state) => state.submit.value);

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

  // Rearrange the date to fit and match up with the date we are lookig for inside of weeklyResults database
  const dateParts = dateString.split(",")[0].split("/");

  // Ensure month and day are in two-digit format
  const month = dateParts[0].padStart(2, "0");
  const day = dateParts[1].padStart(2, "0");
  const year = dateParts[2];

  // Format date so its the exact same as the one in the database so we can match it up and pull the right info
  // Use to compare and check if date is within the weeklyReviewDates array
  const formattedDate = `${year}-${month}-${day}`;

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

        {update && (
          <div
            id="update-submit-notification"
            className="fixed top-2/4 right-2/4 z-50 bg-green-500 text-white p-2 rounded shadow-md"
          >
            <p>Updated!</p>
          </div>
        )}

        {submit && (
          <div
            id="update-submit-notification"
            className="fixed top-2/4 right-2/4 z-50 bg-green-500 text-white p-2 rounded shadow-md"
          >
            <p>Submitted!</p>
          </div>
        )}

        {/* if it is a Sunday and a weekly review is not yet added for this week */}
        {dayOfWeek === "Sunday" &&
          !weeklyReviewDates.includes(formattedDate) && (
            <AddWeeklyResult monday={monday} sunday={date} />
          )}

        {/* if it is a Sunday and a weekly review already exist for this week*/}
        {dayOfWeek === "Sunday" &&
          weeklyReviewDates.includes(formattedDate) && (
            <UpdateWeeklyResult monday={monday} sunday={date} />
          )}
      </div>
    </div>
  );
}

export default MyHabits;
