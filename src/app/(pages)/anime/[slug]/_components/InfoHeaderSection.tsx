import { Button } from "@/components/ui/button";
import Icon from "@/lib/icons/lucide";
import { toUrlString } from "@/lib/utils";
import Link from "next/link";

type InfoHeaderSectionProps = {
    Media: any;
};
export default function InfoHeaderSection({ Media }: InfoHeaderSectionProps) {
    const urlTitle = toUrlString(Media.title.romaji);
    return (
        <header className="container p-4 min-h-96 grid md:grid-cols-[230px_auto] gap-4">
            <div className="grid justify-center gap-2">
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
            <div>
                <h1 className="font-medium text-xl">{Media.title.userPreferred}</h1>
                {/* TODO:  <p>{Media.description}</p>*/}
                <div dangerouslySetInnerHTML={{ __html: Media.description }} />
            </div>
        </header>
    );
}
