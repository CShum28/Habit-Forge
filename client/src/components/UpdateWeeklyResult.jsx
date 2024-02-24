import React, { useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import {
  useGetWeeklyReviewsQuery,
  useGetWeeklyReviewByDateQuery,
} from "../app/api/weekly-review/weeklyReviewApi";

function UpdateWeeklyResult({ monday, sunday }) {
  const { refetch: refetchWeeklyData } = useGetWeeklyReviewsQuery();

  //Grab current date
  const dateString = useSelector((state) => state.date.value);

  // Rearrange the date to fit and match up with the date we are lookig for inside of weeklyResults database
  const dateParts = dateString.split(",")[0].split("/");

  // Ensure month and day are in two-digit format
  const month = dateParts[0].padStart(2, "0");
  const day = dateParts[1].padStart(2, "0");
  const year = dateParts[2];

  // Format date so its the exact same as the one in the database so we can match it up and pull the right info
  const formattedDate = `${year}-${month}-${day}T05:00:00.000+00:00`;
  // properDate is being used here
  const { data: weeklyReviewByDateData } =
    useGetWeeklyReviewByDateQuery(formattedDate);

  const updateWeeklyResults = () => {
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const data = {
      monday: monday.toLocaleString().split(",")[0],
      sunday: sunday.toLocaleString().split(",")[0],
    };

    // ID of the weekly review that needs to be updated
    const weeklyReviewId = weeklyReviewByDateData[0]._id;

    axios
      .put(`${baseUrl}/api/weekly-review/${weeklyReviewId}`, data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        refetchWeeklyData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="mt-4">
      <Button onClick={updateWeeklyResults}>Update Weekly Results</Button>
    </div>
  );
}

export default UpdateWeeklyResult;
