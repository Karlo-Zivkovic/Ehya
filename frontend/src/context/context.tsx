import { SetStateAction, createContext, useState, Dispatch } from "react";
import { UserType } from "../types";

interface ContextType {
  toggleMenu: boolean;
  setToggleMenu: Dispatch<SetStateAction<boolean>>;
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  userInfo: UserType | null;
  setUserInfo: Dispatch<SetStateAction<UserType | null>>;
}
export const AppContext = createContext<ContextType>({
  userInfo: null,
  setUserInfo: () => {},
  toggleMenu: false,
  setToggleMenu: () => {},
  token: "",
  setToken: () => {},
});

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userInfo, setUserInfo] = useState<UserType | null>(null);
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  return (
    <AppContext.Provider
      value={{
        toggleMenu,
        userInfo,
        setUserInfo,
        setToggleMenu,
        token,
        setToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
