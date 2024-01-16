
import { IconButton } from "@/components/ui/button";
import { useCallback } from "react";
import { useTheme } from "next-themes"
import {Laptop, Moon, Sun} from "lucide-react";

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
                    {theme === ThemeMode.Light && <Sun />}
                    {theme === ThemeMode.Dark && <Moon/>}
                    {theme === ThemeMode.System && <Laptop />}
                </span>

            </IconButton>
        </>
    )
} 