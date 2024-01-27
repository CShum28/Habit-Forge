import React, { useEffect } from "react";
import axios from "axios";

import { Trash2 } from "lucide-react";
import { useGetCategoriesByIdQuery } from "../app/api/categories/categoriesApi";
import { useGetHabitsByIdQuery } from "../app/api/habits/habitsApi";
import { skipToken } from "@reduxjs/toolkit/query/react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

function ConfirmDeleteModal({ category, habit, categoryId }) {
  // refetch the categories and rerenders the list being displayed
  const { refetch: categoryRefetch } = useGetCategoriesByIdQuery();
  // refetch the categories and rerenders the list being displayed
  // use skipToken to not fetch if categoryId does not exist (null or undefined)
  const { refetch: habitRefetch } = useGetHabitsByIdQuery(
    categoryId ?? skipToken
  );

  const handleConfirmDelete = () => {
    console.log("confirm delete");

    const baseUrl = import.meta.env.VITE_BASE_URL;
    // handles category delete
    if (category) {
      axios
        .delete(`${baseUrl}/api/category/${category._id}`, {
          withCredentials: true, // Necessary for sending cookies over cross-domain requests
        })
        .then((res) => {
          console.log(res.data);
          categoryRefetch();
        })
        .catch((err) => {
          console.log(err);
        });
      // handles habit delete
    } else if (habit) {
      axios
        .delete(`${baseUrl}/api/habit/${habit._id}`, {
          withCredentials: true, // Necessary for sending cookies over cross-domain requests
        })
        .then((res) => {
          console.log(res);
          habitRefetch();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>
          <Trash2 />
        </button>
      </DialogTrigger>
      <DialogContent className="flex flex-col justify-center items-center">
        <DialogTitle>Are you sure you want to delete?</DialogTitle>
        <div className="flex flex-row gap-x-3">
          <Button className="bg-red-400" onClick={handleConfirmDelete}>
            Confirm
          </Button>
          <DialogClose asChild>
            <Button>Cancel</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmDeleteModal;
