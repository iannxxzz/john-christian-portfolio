import type { ExperienceType } from "@/types";

export const ExpCard = ({item}: {item: ExperienceType}) => {
    return (
        <div className="relative group">
            <div className="absolute -left-7.5 top-2 size-3 bg-muted-foreground group-hover:bg-primary rounded-4xl transition duration-300"></div>

            <span className="text-neutral-400 lining-nums group-hover:text-primary transition duration-400">
                {item.year}
            </span>
            <h3 className="text-lg font-semibold mt-1">
                {item.title}
            </h3>
            <p className="text-sm text-neutral-400 mb-1">
                Name:  {''}
                <span className="font-medium text-foreground">
                    {item.institute}
                </span>
            </p>

            <p className="text-sm text-neutral-400">
                Address:  {''}
                <span className="font-sm text-foreground">
                    {item.desc}
                </span>
                </p>
                
        </div>    
    )
    
}