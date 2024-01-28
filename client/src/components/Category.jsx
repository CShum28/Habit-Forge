import React from "react";

import AddHabitModal from "./AddHabitModal";
import EditCategoryModal from "../components/EditCategoryModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import Habit from "./Habit";

import { useGetHabitsByIdQuery } from "../app/api/habits/habitsApi";

function Category({ category }) {
  const { data: habitsData } = useGetHabitsByIdQuery(category._id);

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
          <AddHabitModal category={category} />
          <EditCategoryModal category={category} />
          <ConfirmDeleteModal category={category} />
        </div>
      </div>
      <div className="mx-2">
        {habitsData &&
          habitsData.map((habit) => {
            return (
              // passed down categoryId to be used on delete habit
              <Habit key={habit._id} habit={habit} categoryId={category._id} />
            );
          })}
      </div>
    </div>
  );
}

export default Category;
