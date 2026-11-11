import { createContext, useContext } from "react";
export const NavigationContext = createContext(null);
export const useNavigation = () => {
  return useContext(NavigationContext);
};
