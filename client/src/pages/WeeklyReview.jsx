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

  console.log(weeklyReviewData);

  return (
    <div>
      <Header />
      <div className="content-container content-header-margin">
        {weeklyReviewData &&
          weeklyReviewData.map((weeklyData) => {
            console.log(weeklyData);
            return (
              <div>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      Week of {weeklyData.week_start_date.split("T")[0]}
                    </AccordionTrigger>
                    <AccordionContent>
                      {Object.entries(weeklyData.accomplishments).map(
                        ([day, { completed, total }]) => (
                          <div className="flex flex-row" key={day}>
                            <p>
                              {day} {completed}/{total}
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
