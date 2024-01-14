
import { IconButton } from "@/components/ui/button";
import { useCallback } from "react";
import { CiLight } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
import { HiComputerDesktop } from "react-icons/hi2";
import { useTheme } from "next-themes"

enum ThemeMode {
    Light = 'light',
    Dark = 'dark',
    System = 'system'
}
export default function ThemeButton(){
    const { theme,setTheme } = useTheme()
    const onSetTheme = useCallback(() => {
        if(theme === ThemeMode.Light){
            setTheme(ThemeMode.Dark)
        }else if(theme === ThemeMode.Dark){
            setTheme(ThemeMode.System)
        }else if(theme === ThemeMode.System){
            setTheme(ThemeMode.Light)
        }
    },[theme, setTheme])
    return (
        <>
            <IconButton asChild onClick={onSetTheme} variant="ghost" className="rounded-full">
                <span>
                    <span className="sr-only">Toggle theme</span>
                    {theme === ThemeMode.Light && <CiLight/>}
                    {theme === ThemeMode.Dark && <FaMoon/>}
                    {theme === ThemeMode.System && <HiComputerDesktop/>}
                </span>

            </IconButton>
        </>
    )
} 