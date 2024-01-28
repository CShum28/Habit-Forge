import React from "react";
import { Square } from "lucide-react";
import axios from "axios";
import { useGetCategoriesByIdQuery } from "../app/api/categories/categoriesApi";

import { Pencil } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

const formSchema = z.object({
  category: z.string().min(1).max(50),
  color: z.string(),
});

function EditCategoryModal({ category }) {
  // refetch the categories and rerenders the list being displayed
  const { refetch } = useGetCategoriesByIdQuery();

  const colors = [
    { color: "No Color", value: "none" },
    {
      color: "Red",
      value: "red",
    },
    { color: "Blue", value: "blue" },
    {
      color: "Green",
      value: "green",
    },
  ];

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: category.name,
      color: category.color,
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values) {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    console.log(values);

    axios
      .put(
        `${baseUrl}/api/category/${category._id}`,
        {
          category: values.category,
          color: values.color,
        },
        {
          withCredentials: true, // Necessary for sending cookies over cross-domain requests
        }
      )
      .then((results) => {
        console.log(results);
        refetch();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Pencil />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 text-left"
              >
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category Name</FormLabel>
                      <FormControl>
                        <Input placeholder="category" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a color" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {colors.map((color) => {
                            return (
                              <SelectItem key={color.value} value={color.value}>
                                <div className="flex flex-row">
                                  <Square /> {color.color}
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogClose asChild>
                  <Button
                    type="submit"
                    onClick={(e) => {
                      const currentValues = form.getValues(); // Get current form values
                      // check if category value is filled or not
                      if (currentValues.category === "") {
                        form.setError("category", {
                          type: "manual",
                          message: "Please enter a category name",
                        });
                        e.preventDefault();
                      }
                    }}
                  >
                    Save
                  </Button>
                </DialogClose>
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditCategoryModal;
