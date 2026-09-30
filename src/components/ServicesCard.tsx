import type { ServiceType } from "@/types"

export const ServicesCard = ({
    service,
}: {
    service: ServiceType
}) => {
    return (
        <div className="relative rounded-2xl border border-neutral-700 p-8 transition-all duration-400 hover:border-primary hover:bg-zinc-900">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h3 className="mb-1 text-lg font-medium text-white">
                        {service.title}
                    </h3>

                    <p className="text-neutral-300">
                        {service.desc}
                    </p>
                </div>

                <div className="shrink-0">
                    {service.icon}
                </div>
            </div>

            {/* Skills */}
            <div className="mt-6">
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-neutral-500">
                    What I do
                </p>

                <div className="flex flex-wrap gap-2">
                    {service.skills.map((skill) => (
                        <span
                            key={skill}
                            className="rounded-md border border-neutral-700 bg-zinc-900 px-2.5 py-1.5 text-xs text-neutral-300 transition-colors duration-300 hover:border-neutral-800 hover:bg-zinc-950 hover:text-white"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            
        </div>
    )
}