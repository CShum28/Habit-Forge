import React, { useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import DateFlipper from "../components/DateFlipper";
import AddCategoryModal from "../components/AddCategoryModal";
import Category from "../components/Category";
import { Button } from "@/components/ui/button";

import { useSelector } from "react-redux";
import { useGetCategoriesByIdQuery } from "../app/api/categories/categoriesApi";
import { useGetWeeklyReviewsQuery } from "../app/api/weekly-review/weeklyReviewApi";

function MyHabits() {
  const { data: categoriesData, refetch: refetchCategoreisData } =
    useGetCategoriesByIdQuery();

  // Refetch and update categoriesData upon submitting new weekly review data
  const { data: weeklyReviewData, refetch: refetchWeeklyData } =
    useGetWeeklyReviewsQuery();

  // Get the list of dates where a Weekly Review already exists
  // Need ?. to check if a weeklyReviewDate exists or not
  const weeklyReviewDates = weeklyReviewData?.map((weeklyData) => {
    return weeklyData.week_start_date.split("T")[0];
  });

  console.log(weeklyReviewDates);

  const user = useSelector((state) => state.auth.value);

  // Effect to trigger re-fetch of habit category data when the user logs in
  useEffect(() => {
    if (user.username) {
      refetchCategoreisData();
    }
  }, [user.username, refetchCategoreisData]);

  //Grab current date
  const dateString = useSelector((state) => state.date.value);
  // convert ISO string into date
  const date = new Date(dateString);

  // const date = new Date(`${dateString}T00:00:00Z`);

  // Gives you what day it is (ex. Monday, Tuesday, etc.)
  const dayOfWeek = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(date);

  // Setting the first day of the week
  const monday = new Date(dateString);
  // using setDate to get first day of week
  monday.setDate(monday.getDate() - 6);

  const submitWeeklyResults = () => {
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const data = {
      monday: new Date(monday).toISOString(),
      sunday: new Date(date).toISOString(),
    };

    console.log(data);

    axios
      .post(`${baseUrl}/api/weekly-review`, data, { withCredentials: true })
      .then((res) => {
        console.log(res);
        refetchWeeklyData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

        {dayOfWeek === "Sunday" && (
          <div className="mt-4">
            {/* <Button>Submit Weekly Results</Button> */}
            <Button onClick={submitWeeklyResults}>Submit Weekly Results</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyHabits;
