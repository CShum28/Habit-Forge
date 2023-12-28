import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MyHabits from "./pages/MyHabits";
import WeeklyReview from "./pages/WeeklyReview";
import About from "./pages/About";
import Account from "./pages/Account";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-habits" element={<MyHabits />} />
        <Route path="/weekly-review" element={<WeeklyReview />} />
        <Route path="/about" element={<About />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
