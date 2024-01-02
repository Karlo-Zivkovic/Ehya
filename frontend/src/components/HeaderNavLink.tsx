import { NavLink } from 'react-router-dom';

function HeaderNavLink({
  children,
  to,
}: {
  children: React.ReactNode;
  to: string;
}) {
  return (
    <NavLink className="px-4 group relative" to={to}>
      {children}{' '}
      <span className="text-blue-500 absolute transition-all duration-500 font-bold right-0 top-0 cursor-pointer  group-hover:right-[90%] opacity-0 group-hover:opacity-100">
        /
      </span>
    </NavLink>
  );
}

export default HeaderNavLink;

