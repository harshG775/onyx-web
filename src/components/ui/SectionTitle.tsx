import { cn } from "@/lib/utils";

type SectionTitleType = {
    title: string;
    titleRight?: React.ReactNode;
    className?: string;
};
export default function SectionTitle({
    className,
    title,
    titleRight,
}: SectionTitleType) {
    return (
        <div
            className={cn(
                "flex justify-between flex-wrap items-center gap-2",
                className
            )}
        >
            <h2 className="text-2xl font-semibold">{title}</h2>
            {titleRight}
        </div>
    );
}
