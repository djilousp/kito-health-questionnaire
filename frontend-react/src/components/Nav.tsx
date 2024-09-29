import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="flex md:col-span-2 col-span-3 md:justify-around justify-between">
      <Link to="/start">
        <h1 className="px-8 py-2 hover:text-primary-text hover:shadow-lg font-bold text-lg text-accent">
          Start Again
        </h1>
      </Link>
      <Link to="/quiz">
        <h1 className="px-8 py-2 hover:text-primary-text  hover:shadow-lg font-bold text-lg text-accent">
          Take Test Quiz
        </h1>
      </Link>
    </nav>
  );
}

export default Nav;
