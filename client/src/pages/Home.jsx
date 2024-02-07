import React from "react";
import Header from "../components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const user = useSelector((state) => state.auth.value);

  return (
    <div>
      <Header />
      <div className="flex flex-col justify-center items-center content-container h-screen text-center">
        <h1 className="text-6xl">Welcome to Habit Forge!</h1>
        <p className="my-8">
          Unlock the power of daily discipline with Habit Forge, the intuitive
          checklist app designed to help you forge and track your habits with
          ease. Whether you're looking to establish a morning meditation, ensure
          you drink enough water, or never miss a workout, Habit Forge is your
          steadfast companion. With our sleek interface, you'll enjoy a clear
          visual of your daily progress, providing that satisfying check-off for
          each task completed. Commit to your goals and build life-changing
          habits, one day at a time, with Habit Forge—because consistency is the
          key to success!
        </p>
        {user.username ? (
          <Link to={"/my-habits"}>
            <Button>See Habits</Button>
          </Link>
        ) : (
          <Link to="/login">
            <Button>Get Started</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Home;
