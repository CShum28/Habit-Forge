import React from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { submitTrue, submitFalse } from "../feature/submit/submitSlice";
import { useGetWeeklyReviewsQuery } from "../app/api/weekly-review/weeklyReviewApi";

function AddWeeklyResult({ monday, sunday }) {
  const { refetch: refetchWeeklyData } = useGetWeeklyReviewsQuery();
  const dispatch = useDispatch();

  const submitWeeklyResults = () => {
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const data = {
      monday: monday.toLocaleString().split(",")[0],
      sunday: sunday.toLocaleString().split(",")[0],
    };

    axios
      .post(`${baseUrl}/api/weekly-review`, data, { withCredentials: true })
      .then((res) => {
        console.log(res);
        refetchWeeklyData();

        // Display the update message
        dispatch(submitTrue());
        // Remove update messaage after 3 seconds
        setTimeout(() => {
          dispatch(submitFalse());
        }, "3000");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="mt-4">
      <Button onClick={submitWeeklyResults}>Submit Weekly Results</Button>
    </div>
  );
}

export default AddWeeklyResult;
