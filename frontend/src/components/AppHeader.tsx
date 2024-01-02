import { AiOutlineMenu } from 'react-icons/ai';
import { useNavigate } from 'react-router';
import HeaderNavLink from './HeaderNavLink';
import { useContext } from 'react';
import { AppContext } from '../context/context';
import NavLinkMobile from './NavLinkMobile';
import { MdOutlineClose } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

function AppHeader() {
  const { toggleMenu, setToggleMenu } = useContext(AppContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
    setToggleMenu(false);
    queryClient.clear();
  };

  const handleToggleMenu = () => {
    setToggleMenu((cur) => !cur);
  };
  return (
    <>
      <div 
        className={`lg:mx-auto w-full lg:max-w-5xl lg:justify-between h-16 flex justify-between xl:max-w-7xl 2xl:max-w-[90rem] items-center px-4 sticky lg:h-20 overflow-y-hidden`}
      >
        <Link to="/">
          <img src="/Logo.svg" alt="logo" className="h-16 w-16" />
        </Link>
        {toggleMenu ? (
          <MdOutlineClose
            onClick={handleToggleMenu}
            className="h-7 w-7 lg:hidden cursor-pointer"
          />
        ) : (
          <AiOutlineMenu
            onClick={handleToggleMenu}
            className="h-7 w-7 lg:hidden cursor-pointer"
          />
        )}
        <div className="lg:flex gap-10 items-center font-semibold text-slate-600  hidden">
          <HeaderNavLink to="/">Home</HeaderNavLink>
          <HeaderNavLink to="/articles">Articles</HeaderNavLink>
          <HeaderNavLink to="/account">Account</HeaderNavLink>
          <HeaderNavLink to="/faq">Faq</HeaderNavLink>
          <button
            className="border-2 font-semibold border-blue-500 hover:bg-blue-500 hover:text-white rounded-full py-1 px-4"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </div>
      <div
        className={`absolute transition-all duration-300 ${
          toggleMenu
            ? 'right-0 h-[calc(100vh-64px)] z-20'
            : 'z-20 h-0 -right-full'
        } overflow-x-hidden bg-blue-950 w-full z-50 text-white flex flex-col items-center justify-center gap-6 text-lg font-semibold`}
      >
        <NavLinkMobile onChangeToggle={handleToggleMenu} to="/">
          Home
        </NavLinkMobile>
        <NavLinkMobile onChangeToggle={handleToggleMenu} to="/articles">
          Articles
        </NavLinkMobile>
        <NavLinkMobile onChangeToggle={handleToggleMenu} to="/account">
          Account
        </NavLinkMobile>
        <NavLinkMobile onChangeToggle={handleToggleMenu} to="/faq">
          Faq
        </NavLinkMobile>
        <button
          className="border-2 font-semibold border-blue-500 hover:bg-blue-500 hover:text-white rounded-full py-1 px-4"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    </>
  );
}

export default AppHeader;

