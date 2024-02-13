import React from "react";
import axios from "axios";
import Header from "../components/Header";
import DateFlipper from "../components/DateFlipper";
import AddCategoryModal from "../components/AddCategoryModal";
import Category from "../components/Category";
import { Button } from "@/components/ui/button";

import { useSelector } from "react-redux";
import { useGetCategoriesByIdQuery } from "../app/api/categories/categoriesApi";

function MyHabits() {
  const { data: categoriesData } = useGetCategoriesByIdQuery();

  //Grab current date
  const dateString = useSelector((state) => state.date.value);
  // convert ISO string into date
  const date = new Date(dateString);

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
      monday,
      sunday: date,
    };

    axios
      .post(`${baseUrl}/api/weekly-review`, data, { withCredentials: true })
      .then(() => {
        console.log("added");
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
