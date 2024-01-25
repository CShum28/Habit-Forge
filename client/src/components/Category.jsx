import React from "react";

import AddHabit from "../components/AddHabit";
import EditCategoryModal from "../components/EditCategoryModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import Habit from "./Habit";

import { useGetHabitsByIdQuery } from "../app/api/habits/habitsApi";

function Category({ category }) {
  const {
    data: habitsData,
    isLoading,
    isError,
    error,
  } = useGetHabitsByIdQuery(category._id);

  return (
    <div>
      <div
        key={category._id}
        className="flex flex-row justify-between border-b-4 mb-2 border-slate-400"
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
      <div className="mx-2">
        {habitsData &&
          habitsData.map((habit) => {
            return <Habit key={habit._id} habit={habit} />;
          })}
      </div>
    </div>
  );
}

export default Category;
