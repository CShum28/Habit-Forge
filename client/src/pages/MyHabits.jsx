import React from "react";
import Header from "../components/Header";
import DateFlipper from "../components/DateFlipper";
import AddCategory from "../components/AddCategory";

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
            return <Category key={category._id} category={category} />;
          })}

        <AddCategory />
      </div>
    </div>
  );
}

export default MyHabits;
