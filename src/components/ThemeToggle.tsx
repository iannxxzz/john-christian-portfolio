import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark")
      setDarkMode(true)
    }
  }, [])

  const toggleTheme = () => {
        const isDark = !darkMode

        console.log("Dark mode:", isDark)

        setDarkMode(isDark)

        if (isDark) {
            document.documentElement.classList.add("dark")
            localStorage.setItem("theme", "dark")
        } else {
            document.documentElement.classList.remove("dark")
            localStorage.setItem("theme", "light")
        }

        console.log(document.documentElement.className)
    }

  return (
    <button
      onClick={toggleTheme}
      className="
        mt-3
        flex
        items-center
        gap-2
        rounded-full
        border
        border-neutral-700
        px-3
        py-2
        text-sm
        transition-all
        hover:border-primary
      "
    >
      {darkMode ? (
        <>
          <Moon className="size-4" />
          Dark Mode
        </>
      ) : (
        <>
          <Sun className="size-4" />
          Light Mode
        </>
      )}
    </button>
  )
}