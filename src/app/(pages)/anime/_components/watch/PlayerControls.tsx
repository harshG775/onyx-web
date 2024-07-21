"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type PlayerControlsProps = {
    animeId: string;
};
export default function PlayerControls({ animeId }: PlayerControlsProps) {
    const [currentEp, setCurrentEp] = useState<number>();
    const searchParams = useSearchParams();
    const router = useRouter();
    useEffect(() => {
        const ep = searchParams.get("ep");
        if (ep) return setCurrentEp(Number(ep));
        //
        setCurrentEp(1);
        router.push("?ep=1");
    }, []);
    return (
        <section className="h-96 lg:h-full overflow-y-auto scrollbar-thin scrollbar-color">
            <div className="sticky top-0 bg-background border-b-2">
                episode:{currentEp}
            </div>
        </section>
    );
}
