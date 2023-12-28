function Header() {
  return (
    <nav className="text-slate-200 bg-black flex flex-row justify-between items-center px-8 py-2">
      <a href="/" className="text-2xl">
        Habit Forge
      </a>
      <ul className="m-0 p-0 list-none flex flex-row gap-x-5 hover:cursor-pointer">
        <li>
          <a>My Habits</a>
        </li>
        <li>
          <a>Weekly Review</a>
        </li>
        <li>
          <a>About</a>
        </li>
        <li>
          <a>Account</a>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
