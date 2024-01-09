import { useUserPreferenceStore } from "@/hooks/state/userPrefence";
import { ThemeMode, useThemeMode } from "@/hooks/state/useThemeMode";
import { IconButton } from "@radix-ui/themes";
import { useCallback } from "react";
import { CiLight } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
import { HiComputerDesktop } from "react-icons/hi2";
export default function ThemeButton(){
    const {themeMode,updateThemeMode} = useThemeMode()
    const setTheme = useCallback(() => {
        if(themeMode === ThemeMode.Light){
            updateThemeMode(ThemeMode.Dark)
        }else if(themeMode === ThemeMode.Dark){
            updateThemeMode(ThemeMode.System)
        }else if(themeMode === ThemeMode.System){
            updateThemeMode(ThemeMode.Light)
        }
    },[themeMode, updateThemeMode])
    return (
        <>
            <IconButton asChild onClick={setTheme} radius="full" variant="ghost">
                <span>
                    <span className="sr-only">Toggle theme</span>
                    {themeMode === ThemeMode.Light && <CiLight/>}
                    {themeMode === ThemeMode.Dark && <FaMoon/>}
                    {themeMode === ThemeMode.System && <HiComputerDesktop/>}
                </span>

            </IconButton>
        </>
    )
} 