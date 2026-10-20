
import { motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import type { ProjectType } from "@/types"

type ProjectCardProps = ProjectType & {
  screenshots?: string[]
}

export const ProjectCard = ({
  imgSrc,
  projectLink,
  tags,
  title,
  category,
  description,
  screenshots,
}: ProjectCardProps) => {
  const slideshowUrl = screenshots?.length
  ? `/project-viewer.html?title=${encodeURIComponent(title)}&${screenshots
      .map((image) => `image=${encodeURIComponent(image)}`)
      .join('&')}`
  : projectLink

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="
        group
        relative
        h-[300px]
        cursor-pointer
        overflow-hidden
        rounded-3xl
        border
        border-neutral-800
        bg-neutral-900
      "
    >
      <img
        src={imgSrc}
        alt={`${title} project preview`}
        className="
          absolute inset-0 h-full w-full object-cover
          transition-all duration-500
          group-hover:scale-110
          group-hover:blur-md
          group-hover:brightness-50
        "
      />

      <div
        className="
          absolute left-4 top-4 z-10
          rounded-full bg-black/60
          px-3 py-1 text-xs font-medium
          text-primary backdrop-blur-md
        "
      >
        {category}
      </div>

      <div
        className="
          absolute inset-0 z-20
          flex translate-y-6 flex-col justify-end
          p-6 opacity-0
          transition-all duration-500
          group-hover:translate-y-0
          group-hover:opacity-100
        "
      >
        <h3 className="text-xl font-bold text-white">
          {title}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm text-neutral-200">
          {description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="
                rounded-md border border-white/20
                bg-white/10 px-2 py-1
                text-xs text-white backdrop-blur-sm
              "
            >
              {tag}
            </span>
          ))}
        </div>

        {slideshowUrl && (
          <a
            href={slideshowUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${title} project`}
            className="
              mt-5 inline-flex w-fit items-center gap-2
              rounded-xl bg-primary px-4 py-2
              text-sm font-semibold text-black
              transition-all hover:scale-105
            "
          >
            View Project
            <ArrowUpRight size={16} />
          </a>
        )}
      </div>
    </motion.div>
  )
}
