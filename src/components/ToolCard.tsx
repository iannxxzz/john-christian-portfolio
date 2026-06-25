import { motion } from "motion/react"

import { fadeUp } from "@/lib/animations"
import type { ToolsType } from "@/types"

export const ToolCard = ({ tool }: { tool: ToolsType }) => {
  return (
    <motion.div
      variants={fadeUp}
      className="group border border-neutral-700 rounded-xl flex flex-col items-center py-6 transition-all duration-100 hover:border-primary/50 hover:-translate-y-1">
      <div
        className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 transition-all duration-200 group-hover:bg-primary/20 group-hover:scale-105">
        <img
          src={tool.imgSrc}
          alt={tool.label}
          className="h-10 w-15 object-contain"
        />
      </div>

      <p className="mt-4 text-sm font-semibold text-center">
        {tool.label}
      </p>
    </motion.div>
  )
}