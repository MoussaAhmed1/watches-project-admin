"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Toggle } from "./toggle"


export function ModeToggle() {
    const { setTheme, theme } = useTheme()

    return (
        <>
            <Toggle variant="outline" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Toggle>
        </>
    )
}
