import React from "react";
import Header from "../components/Header";
import { useGetWeeklyReviewsQuery } from "../app/api/weekly-review/weeklyReviewApi";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function WeeklyReview() {
  const { data: weeklyReviewData } = useGetWeeklyReviewsQuery();

  return (
    <div>
      <Header />
      <div className="content-container content-header-margin">
        {weeklyReviewData &&
          weeklyReviewData.map((weeklyData) => {
            const firstDay = weeklyData.week_start_date
              .toLocaleString()
              .split("T")[0];
            const lastDay = weeklyData.week_last_date
              .toLocaleString()
              .split("T")[0];

            return (
              <div>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      Week of {firstDay} to {lastDay}
                    </AccordionTrigger>
                    <AccordionContent>
                      {Object.entries(weeklyData.accomplishments).map(
                        ([dayOfWeek, { day, completed, total }]) => (
                          <div className="flex flex-row mx-2 my-1" key={day}>
                            <p>
                              {day} - {completed}/{total}{" "}
                              {completed === total &&
                                total !== 0 &&
                                "- Great job!"}
                            </p>
                          </div>
                        )
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default WeeklyReview;
