import React from "react";
import Header from "../components/Header";
import DateFlipper from "../components/DateFlipper";
import AddCategoryModal from "../components/AddCategoryModal";

import Category from "../components/Category";

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
              <div key={category._id} className="mb-4">
                <Category category={category} />
              </div>
            );
          })}

        <div className="mt-4">
          <AddCategoryModal />
        </div>
      </div>
    </div>
  );
}

export default MyHabits;
