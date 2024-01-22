import React, { useState } from "react";
import Header from "../components/Header";
import DateFlipper from "../components/DateFlipper";
import AddHabit from "../components/AddHabit";
import AddCategory from "../components/AddCategory";
import EditCategoryModal from "../components/EditCategoryModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

import { useGetCategoriesByIdQuery } from "../app/api/categories/categoriesApi";

function MyHabits() {
  const {
    data: categoriesData,
    isLoading,
    isError,
    error,
  } = useGetCategoriesByIdQuery();

  return (
    <div>
      <Header />
      <div className="content-container content-header-margin">
        <DateFlipper />

        {categoriesData &&
          categoriesData.map((category) => {
            return (
              <div
                key={category._id}
                className="flex flex-row justify-between border-b-4 mb-4 border-slate-400"
              >
                <p>
                  {category.name} - color: {category.color}
                </p>

                <div className="flex flex-row gap-x-2">
                  <AddHabit category={category} />
                  <EditCategoryModal category={category} />
                  <ConfirmDeleteModal category={category} />
                </div>
              </div>
            );
          })}

        <AddCategory />
      </div>
    </div>
  );
}

export default MyHabits;
