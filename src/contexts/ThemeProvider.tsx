import { useState } from "react";
import type { ReactNode } from "react";
import { ThemeContext } from "./ThemeContext.tsx";
import type {Theme} from "./ThemeContext.tsx";

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>('Gryffindor');

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}