import { useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Download, X } from "lucide-react"

    type ResumeModalProps = { open: boolean
        onClose: () => void
    }

    export const ResumeModal = ({
    open,
    onClose,
    }: ResumeModalProps) => {
   
        // Lock body scroll
    useEffect(() => {
    if (!open) return
    const scrollY = window.scrollY

    document.body.style.position = "fixed"
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = "100%"

    return () => {
        document.body.style.position = ""
        document.body.style.top = ""
        document.body.style.width = ""

        window.scrollTo(0, scrollY)
    }
    }, [open])

    // ESC key support
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
        onClose()
        }
        }

        if (open) {
        window.addEventListener("keydown", handleKeyDown)
        }

        return () => {
        window.removeEventListener("keydown", handleKeyDown)
        }


    }, [open, onClose])

    return ( <AnimatePresence>
    {open && (
    <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
    >
    <motion.div
    className="
    relative
    w-full
    max-w-5xl
    overflow-hidden
    rounded-3xl
    border
    border-neutral-700
    bg-neutral-900
    shadow-2xl
    "
    initial={{
    opacity: 0,
    scale: 0.95,
    y: 20,
    }}
    animate={{
    opacity: 1,
    scale: 1,
    y: 0,
    }}
    exit={{
    opacity: 0,
    scale: 0.95,
    y: 20,
    }}
    transition={{
    duration: 0.25,
    }}
    onClick={(e) => e.stopPropagation()}
    >
    {/* Header */} 
    <div className="flex items-center justify-between border-b border-neutral-800 p-4"> <div> <h2 className="text-lg font-semibold">
    Resume Preview </h2>
            </div>

            <button
                onClick={onClose}
                className="
                rounded-xl
                p-2
                transition-colors
                hover:bg-neutral-800
                "
            >
                <X className="h-5 w-5" />
            </button>
            </div>

            {/* Resume Preview */}
            <iframe
            src="/JCAtienza_Resume.pdf"
            title="Resume"
            className="h-[70vh] w-full bg-white"
            />

            {/* Footer */}
            <div className="flex justify-end border-t border-neutral-800 p-4">
            <a
                href="/JCAtienza_Resume.pdf"
                download
                className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-primary
                px-5
                py-2.5
                font-medium
                text-black
                transition-transform
                hover:scale-105
                "
            >
                <Download className="h-4 w-4" />
                Download Resume
            </a>
            </div>
        </motion.div>
        </motion.div>
    )}
    </AnimatePresence>


    )
    }
