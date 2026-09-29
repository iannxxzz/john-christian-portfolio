import { useEffect, useState } from "react"
import { ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

export const BackToTop = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="
                    fixed
                    bottom-24
                    right-7
                    z-50
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    bg-white/10
                    backdrop-blur-md
                    border
                    border-white/10
                    text-white
                    shadow-lg
                    hover:scale-110
                    hover:border-primary
                    transition-all
                    "
        >
          <ChevronUp size={22} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}