import React from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useGetWeeklyReviewsQuery } from "../app/api/weekly-review/weeklyReviewApi";

function UpdateWeeklyResult({ monday, sunday }) {
  const { refetch: refetchWeeklyData } = useGetWeeklyReviewsQuery();

  const updateWeeklyResults = () => {
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const data = {
      monday: monday.toLocaleString().split(",")[0],
      sunday: sunday.toLocaleString().split(",")[0],
    };

    console.log("updated!");
    // axios
    //   .post(`${baseUrl}/api/weekly-review`, data, { withCredentials: true })
    //   .then((res) => {
    //     console.log(res);
    //     refetchWeeklyData();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  return (
    <div className="mt-4">
      <Button onClick={updateWeeklyResults}>Update Weekly Results</Button>
    </div>
  );
}

export default UpdateWeeklyResult;
