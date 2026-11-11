import { createContext, useContext } from "react";

export const HeroContext = createContext(null);

export const useHero = () => {
  return useContext(HeroContext);
};
