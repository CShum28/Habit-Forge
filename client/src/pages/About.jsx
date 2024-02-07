import React from "react";
import Header from "../components/Header";
import habitForgeImage from "../assets/images/habit-forge.webp";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function About() {
  return (
    <div>
      <Header />
      <div className=" content-container content-header-margin grow shrink basis-0">
        <div className="flex md:flex-row justify-center gap-x-4 sm:flex-col">
          <Card className="md:w-6/12 flex flex-col justify-around sm:w-100">
            <CardHeader>
              <CardTitle>About Habit Forge</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mt-4">
                Habit Forge is dedicated to helping individuals build positive
                habits that last a lifetime. Our mission is to provide an
                intuitive platform where users can track their habits, measure
                progress, and find the motivation to achieve their personal
                goals. With a community-driven approach, we believe in the power
                of collective support and sharing success stories to inspire
                change.
              </p>
              <p className="mt-4">
                Founded in 2024, our team consists of experts in behavior
                science, product design, and software engineering, all united by
                the desire to create a tool that can make a meaningful
                difference in people’s lives. Whether you’re looking to improve
                your health, increase productivity, or learn new skills, Habit
                Forge is here to guide you every step of the way.
              </p>
            </CardContent>
          </Card>
          <div className="flex flex-col gap-y-4 md:w-6/12 sm:w-100">
            <Card>
              <img src={habitForgeImage} />
            </Card>
          </div>
        </div>
        <div className="mt-3 mb-3">
          <Card className="grid md:grid-cols-2 sm:grid-cols-1 p-3 gap-3">
            <Card>
              <CardHeader>
                <CardTitle>Embrace the Journey</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  We believe that habit formation is a journey, not a
                  destination. Every small step is a part of a larger
                  transformation.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Commit to Consistency</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Consistency is key. Our tools are designed to help you
                  maintain a steady pace in your habit-forming journey.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Celebrate Every Victory</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  No victory is too small. We're here to cheer you on for every
                  habit streak and every goal met.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Continuous Improvement</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Just as we encourage our users to improve, we constantly
                  enhance our platform based on your feedback.
                </p>
              </CardContent>
            </Card>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default About;
