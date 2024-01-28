import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGetHabitsByIdQuery } from "../app/api/habits/habitsApi";
import { skipToken } from "@reduxjs/toolkit/query/react";

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
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Plus } from "lucide-react";

import { Input } from "@/components/ui/input";

const formSchema = z.object({
  habit: z.string().min(1).max(50),
});

function AddHabitModal({ category }) {
  // Use skipToken to conditionally skip the query if category._id is not available
  const { refetch } = useGetHabitsByIdQuery(category._id ?? skipToken);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [selectedDays, setSelectedDays] = useState([]);

  const toggleSelectDay = (day) => {
    setSelectedDays((prev) => {
      if (prev.includes(day)) {
        // if prev already includes the selected day, remove selected day instead
        return prev.filter((selectedDay) => selectedDay !== day);
      } else {
        return [...prev, day];
      }
    });
  };

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      habit: "",
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values) {
    const habit = {
      habit: values.habit,
      days: selectedDays,
      category_id: category._id,
    };

    const baseUrl = import.meta.env.VITE_BASE_URL;
    axios
      .post(`${baseUrl}/api/habit`, habit, { withCredentials: true })
      .then((res) => {
        console.log(res);
        form.reset({
          habit: "",
        });
        setSelectedDays([]);
        refetch();
      })
      .catch((err) => console.error(err));
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Plus />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Habit</DialogTitle>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 text-left"
              >
                <FormField
                  control={form.control}
                  name="habit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Habit</FormLabel>
                      <FormControl>
                        <Input placeholder="habit" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-row gap-x-5 items-center">
                  <p>Repeat On:</p>
                  {daysOfWeek.map((day, index) => {
                    // Check if the day is selected
                    const isSelected = selectedDays.includes(day);

                    return (
                      <div key={index}>
                        <p
                          className={`rounded-full border border-black w-8 h-8 flex justify-center items-center hover:cursor-pointer ${
                            isSelected ? "bg-cyan-600 text-slate-50" : ""
                          }`}
                          onClick={() => toggleSelectDay(day)}
                        >
                          {day.charAt(0)}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <DialogClose asChild>
                  <Button
                    type="submit"
                    onClick={(e) => {
                      const currentValues = form.getValues(); // Get current form values
                      // check if habit value is filled or not
                      if (currentValues.habit === "") {
                        form.setError("habit", {
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

export default AddHabitModal;
