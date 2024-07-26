import { Button } from "@/components/ui/button";
import Icon from "@/lib/icons/lucide";
import { toUrlString } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

type InfoHeaderSectionProps = {
    Media: any;
};
export default function InfoHeaderSection({ Media }: InfoHeaderSectionProps) {
    const [descriptionClamp, setDescriptionClamp] = useState(false);
    const urlTitle = toUrlString(Media.title.romaji);
    console.log(Media);
    return (
        <header className="container p-4 min-h-96 grid md:grid-cols-[230px_auto] gap-4">
            <div className="grid justify-center content-start gap-2">
                <img
                    src={Media.coverImage.large}
                    alt={Media.title.userPreferred}
                    className="rounded-lg"
                />
                <div className="flex gap-2">
                    <Button asChild>
                        <Link
                            href={`/anime/watch/${urlTitle}?ep=1`}
                            className="flex-1 text-2xl grid gap-1 grid-cols-[2fr_1fr]"
                        >
                            <span className="text-center">Watch</span>
                            <Icon name="CirclePlay" className="mx-auto" />
                        </Link>
                    </Button>
                    <Button asChild variant={"secondary"} size={"icon"}>
                        <Link href="" className="text-2xl">
                            {/* <span className="text-center">Option</span> */}
                            <Icon name="CircleAlert" className="mx-auto" />
                        </Link>
                    </Button>
                </div>
            </div>

            <ul
                className="p-6 mt-4 md:mt-0 space-y-1 bg-background/90 backdrop-blur-md transition-colors duration-300 ease-in-out rounded-lg
                    [&>li]:grid [&>li]:grid-cols-[80px_auto] [&>li]:items-center [&>li]:gap-2
                    [&>li>div]:text-sm 
                    "
            >
                <li>
                    <span>Type: </span>
                    <div>{Media?.type}</div>
                </li>
                <li>
                    <span>Country: </span>
                    <div>{Media?.countryOfOrigin}</div>
                </li>
                <li>
                    <span>Premiered: </span>
                    <div className="flex gap-2">
                        <span className="text-sm tracking-tight">
                            {formatDate(Media?.startDate)}
                        </span>{" "}
                        to{" "}
                        <span className="text-sm tracking-tight">
                            {formatDate(Media?.endDate)}
                        </span>
                    </div>
                </li>
                <li>
                    <span>Genre: </span>
                    <div className="flex gap-2">
                        {Media?.genres?.map((genre: any) => (
                            <Link
                                href={""}
                                key={genre}
                                className="text-sm underline underline-offset-2 text-primary hover:text-primary/90 "
                            >
                                {genre}
                            </Link>
                        ))}
                    </div>
                </li>
                <li>
                    <span>aired: </span>
                    <span>
                        {Media?.season} {Media?.startDate?.year}
                    </span>
                </li>
                <li>
                    <span>Status: </span>
                    <div>{Media?.status}</div>
                </li>
                <li>
                    <span>MAL: </span>
                    <div className="flex gap-2">
                        <Link
                            href={`https://myanimelist.net/anime/${Media?.idMal}`}
                            className="text-sm underline underline-offset-2 text-primary hover:text-primary/90 "
                            target="_blank"
                        >
                            MyAnimeList
                        </Link>
                    </div>
                </li>
                <li>
                    <span>Duration: </span>
                    <div>{Media?.duration}min</div>
                </li>
                <li>
                    <span>Episodes: </span>
                    <div>{Media?.episodes}</div>
                </li>
                <li>
                    <span>Studios: </span>
                    <div className="flex gap-2">
                        {Media?.studios?.edges?.map((studio: any) => (
                            <Link
                                href={""}
                                key={studio.node.name}
                                className="text-sm underline underline-offset-2 text-primary hover:text-primary/90 "
                            >
                                {studio.node.name}
                            </Link>
                        ))}
                    </div>
                </li>
                <li>
                    <span>Producers: </span>
                    <div></div>
                </li>
            </ul>
            <div className="md:col-span-2">
                <h1 className="font-medium text-xl">
                    {Media.title.userPreferred}
                </h1>
                {/* TODO:  <p>{Media.description}</p>*/}
                <div className="text-xs">
                    <p
                        dangerouslySetInnerHTML={{
                            __html: Media.description,
                        }}
                        className={`${descriptionClamp ? "" : "line-clamp-6"}`}
                    />
                    <button
                        onClick={() => setDescriptionClamp((pre) => !pre)}
                        className="font-semibold text-foreground/90 underline hover:text-primary/90"
                    >
                        {descriptionClamp ? "Less" : "More"}
                    </button>
                </div>
            </div>
        </header>
    );
}

function formatDate(date: any) {
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    let day = date.day;
    let month = months[date.month - 1];
    let year = date.year;

    return `${day} ${month} ${year}`;
}
