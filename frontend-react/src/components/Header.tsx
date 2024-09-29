import { Link } from 'react-router-dom';
import Nav from './Nav';

export const Header = () => {
  return (
    <header className="min-h-[10vh]">
      <div className="grid grid-cols-3">
        <Link className="hidden md:block" to="/">
          <h1 className="font-bold text-3xl text-accent">
            QuizAppLogo <span className="text-accent-hover">.</span>
          </h1>
        </Link>
        {/* desktop nav */}
        <Nav />
      </div>
    </header>
  );
};
