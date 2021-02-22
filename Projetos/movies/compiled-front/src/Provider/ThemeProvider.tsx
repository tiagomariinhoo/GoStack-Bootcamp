import React, { createContext, useState } from 'react'
import { ThemeProvider as ThemeProviderStyled } from 'styled-components'
import dark from '../styles/themes/dark';
import light from '../styles/themes/light';
type Theme = {title: string; colors: {primary: string; secundary: string; background: string; }}
type ThemeContext = { theme: Theme; toggleTheme: () => void };

export const ThemeContext = createContext<ThemeContext>(
    {} as ThemeContext
)

export const ThemeProvider: React.FC = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(light)
    const toggleTheme = () => {
        setTheme(theme.title === 'light' ? dark : light)
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <ThemeProviderStyled theme={theme}>
                {children}
            </ThemeProviderStyled>
        </ThemeContext.Provider>
    )
}