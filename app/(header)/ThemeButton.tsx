'use client'
import {useCallback} from "react";
import {useTheme} from "next-themes"
import {motion, SVGMotionProps} from "framer-motion";
import * as React from "react";

enum ThemeMode {
  Light = 'light',
  Dark = 'dark',
  System = 'system'
}

export default function ThemeButton() {
  const {theme, setTheme} = useTheme()

  const onSetTheme = useCallback(() => {
    if (theme === ThemeMode.Light) {
      setTheme(ThemeMode.Dark)
    } else if (theme === ThemeMode.Dark) {
      setTheme(ThemeMode.System)
    } else if (theme === ThemeMode.System) {
      setTheme(ThemeMode.Light)
    }
  }, [theme, setTheme])
  return (
    <>
        <motion.span
          animate={theme ?? 'system'}
          onClick={onSetTheme}
        >
          <span className="sr-only">Toggle theme</span>
          <ThemeIcon/>
        </motion.span>
    </>
  )
}

const ThemeIcon = () => {
  return (
    <motion.svg width="24" height="24" viewBox="0 0 24 24">
      <Path
        variants={{
          system: {opacity: 0},
          light: {opacity: 0},
          dark: {d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z", opacity: 1}
        }}
        transition={{duration: 0.5}}
      />
      <motion.circle
        fill="transparent"
        strokeWidth="2"
        stroke="currentColor"
        strokeLinecap="round"
        variants={{
          light: {cx: "12", cy: "12", r: "4", opacity: 1},
          system: {opacity: 0},
          dark: {opacity: 0}
        }}
        transition={{duration: 0.5}}
      />
      <SunEdge/>
      <Path
        variants={{
          light: {opacity: 0},
          dark: {opacity: 0},
          system: {d: "M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4", opacity: 1}
        }}
        transition={{duration: 0.5}}
      />
    </motion.svg>
  )
}
const SunEdge = () => {
  return (
    <>
      <Path
        variants={{
          light: {d: "M12 2v2", opacity: 1},
          system: {d: "M12 2v2", opacity: 1,},
          dark: {opacity: 0}
        }}
        transition={{duration: 0.5}}
      />
      <Path
        variants={{
          light: {d: "M12 20v2", opacity: 1},
          system: {d: "M12 20v2", opacity: 1},
          dark: {opacity: 0}
        }}
        transition={{duration: 0.5}}
      />
      <Path
        variants={{
          light: {d: "m4.93 4.93 1.41 1.41", opacity: 1},
          system: {d: "m4.93 4.93 1.41 1.41", opacity: 1},
          dark: {opacity: 0}
        }}
        transition={{duration: 0.5}}
      />
      <Path
        variants={{
          light: {d: "m17.66 17.66 1.41 1.41", opacity: 1},
          system: {d: "m17.66 17.66 1.41 1.41", opacity: 1},
          dark: {opacity: 0}
        }}
        transition={{duration: 0.5}}
      />
      <Path
        variants={{
          light: {d: "M2 12h2", opacity: 1},
          system: {d: "M2 12h2", opacity: 1},
          dark: {opacity: 0}
        }}
        transition={{duration: 0.5}}
      />
      <Path
        variants={{
          light: {d: "M20 12h2", opacity: 1},
          system: {d: "M20 12h2", opacity: 1},
          dark: {opacity: 0}
        }}
        transition={{duration: 0.5}}
      />
      <Path
        variants={{
          light: {d: "m6.34 17.66-1.41 1.41", opacity: 1},
          system: {d: "m6.34 17.66-1.41 1.41", opacity: 1},
          dark: {opacity: 0}
        }}
        transition={{duration: 0.5}}
      />
      <Path
        variants={{
          light: {d: "m19.07 4.93-1.41 1.41", opacity: 1},
          system: {d: "m19.07 4.93-1.41 1.41", opacity: 1},
          dark: {opacity: 0}
        }}
        transition={{duration: 0.5}}
      />
    </>
  )
}

const Path = (props: React.JSX.IntrinsicAttributes & SVGMotionProps<SVGPathElement> & React.RefAttributes<SVGPathElement>) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);