import { useEffect } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Download, FileText, X } from "lucide-react"

  type ResumeModalProps = {
  open: boolean
  onClose: () => void
  }

  export const ResumeModal = ({
  open,
  onClose,
  }: ResumeModalProps) => {

  // Lock background scroll
  useEffect(() => {
  if (!open) return


  document.body.style.overflow = "hidden"

  return () => {
    document.body.style.overflow = "auto"
  }


  }, [open])

  // ESC support
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

  const isMobile =
  typeof window !== "undefined" &&
  window.innerWidth < 768

return ( <AnimatePresence>
{open && (
  <motion.div
    data-testid="resume-modal"
    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
<motion.div
    className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900 shadow-2xl"
    initial={{opacity: 0, scale: 0.95, y: 20,}}
    animate={{ opacity: 1, scale: 1, y: 0,}}
    exit={{ opacity: 0, scale: 0.95, y: 20,}}
    transition={{ duration: 0.25,}}
    onClick={(e) => e.stopPropagation()}
    >
{/* Header */} 
<div className="flex items-center justify-between border-b border-neutral-800 p-4"> <h2 className="text-lg font-semibold">
Resume Preview </h2>
          <button
            aria-label="Close Resume Modal"
            onClick={onClose}
            className="rounded-xl p-2 transition-colors hover:bg-neutral-80">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Desktop */}
        {!isMobile && (
          <iframe
            src="/JCAtienza_Resume.pdf"
            title="Resume"
            className="h-[75vh] w-full bg-white"
          />
        )}

        {/* Mobile */}
        {isMobile && (
          <div className="flex flex-col items-center gap-4 p-10 text-center">
            <FileText className="h-14 w-14 text-primary" />

            <h3 className="text-xl font-semibold">
              Open Resume
            </h3>

            <p className="text-sm text-neutral-400 max-w-md">
              Mobile PDF previews are usually zoomed in.
              Open the resume in a new tab for a better experience.
            </p>

            <a
              href="/JCAtienza_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-primary px-5 py-3 font-medium text-black">
              Open Resume
            </a>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end border-t border-neutral-800 p-4">
          <a
            href="/JCAtienza_Resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-medium text-black transition-transform hover:scale-105"
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
