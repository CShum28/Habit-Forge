import React from "react";
import { Square } from "lucide-react";
import axios from "axios";
import { useGetCategoriesByIdQuery } from "../app/api/categories/categoriesApi";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
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

function AddCategoryModal() {
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
      category: "",
      color: "",
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values) {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    axios
      .post(`${baseUrl}/api/category`, values, {
        withCredentials: true, // Necessary for sending cookies over cross-domain requests
      })
      .then((res) => {
        console.log(res);
        form.reset({
          category: "",
          color: "",
        });
        refetch(); // Trigger a refetch of the categories
      })
      .catch((err) => console.error(err)); // Handle errors
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add Category</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
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
                              <SelectItem value={color.value} key={color.value}>
                                <div className="flex flex-row">
                                  <Square
                                    className={`${
                                      color.value === "blue"
                                        ? "bg-blue-200"
                                        : color.value === "red"
                                        ? "bg-red-200"
                                        : color.value === "green"
                                        ? "bg-green-200"
                                        : ""
                                    }`}
                                  />
                                  <p>{color.color}</p>
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
                    Add
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

export default AddCategoryModal;
