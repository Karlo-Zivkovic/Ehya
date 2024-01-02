import { NavLink } from 'react-router-dom';

function NavLinkMobile({
  children,
  to,
  onChangeToggle,
}: {
  children: React.ReactNode;
  to: string;
  onChangeToggle: () => void;
}) {
  return (
    <NavLink
      onClick={onChangeToggle}
      className="hover:bg-gray-600 py-3 px-6 rounded-md"
      to={to}
    >
      {children}
    </NavLink>
  );
}

export default NavLinkMobile;

