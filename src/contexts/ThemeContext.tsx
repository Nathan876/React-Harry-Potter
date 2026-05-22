import {createContext} from "react";
import type ThemeContextType from "../interfaces/ThemeContextType.tsx";

export type Theme = 'Gryffindor' | 'Hufflepuff' | 'Ravenclaw' | 'Slytherin' | 'Accessible';


export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
