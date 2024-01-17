import React from "react";
import axios from "axios";

import { Trash2 } from "lucide-react";
import { useGetCategoriesByIdQuery } from "../app/api/categories/categoriesApi";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

function ConfirmDeleteModal({ category }) {
  // refetch the categories and rerenders the list being displayed
  const { refetch } = useGetCategoriesByIdQuery();

  const handleConfirmDelete = () => {
    console.log("confirm delete");
    // console.log(category);

    const baseUrl = import.meta.env.VITE_BASE_URL;
    axios
      .delete(`${baseUrl}/api/category/${category._id}`, {
        withCredentials: true, // Necessary for sending cookies over cross-domain requests
      })
      .then((res) => {
        console.log(res.data);
        refetch();
      });
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
        <div className="gap-y-4">
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
