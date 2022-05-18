import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const location= useLocation();

  const logout = () => {
    signOut(auth);
    navigate('/login', { replace: true });
  };

  const menuItems = (
    <>
    <li>
      <NavLink
        to={location.pathname === '/home' ? '/home' : '/'}
        className={({ isActive }) => (isActive ? 'bg-accent text-white' : '')}
      >
        Home
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/addTask"
        className={({ isActive }) => (isActive ? 'bg-accent text-white' : '')}
      >
        Add Task
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/myTask"
        className={({ isActive }) => (isActive ? 'bg-accent text-white' : '')}
      >
        My Tasks
      </NavLink>
    </li>
    {!user && (
      <li>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? 'bg-accent text-white' : ''
          }
        >
          Login
        </NavLink>
      </li>
    )}
    
    {user && (
      <li>
        <button className="btn btn-outline btn-primary" onClick={logout}>
          Sign Out
        </button>
      </li>
    )}
  </>
  );

  return (
    <div className="navbar bg-base-100 shadow">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex="0" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex="0"
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          TODO-APP
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">{menuItems}</ul>
      </div>
    </div>
  );
};

export default Navbar;
