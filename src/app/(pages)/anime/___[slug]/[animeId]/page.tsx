import Link from "next/link";
import { notFound } from "next/navigation";

type InfoPageProps = {
    params: {
        slug: string;
        animeId: string;
    };
};
export default function WatchPage({
    params: { slug, animeId },
}: InfoPageProps) {
    if (slug === "info" || slug === "watch") {
        return (
            <main>
                <Link href={`/anime/watch/${animeId}`}>watch</Link>
                <Link href={`/anime/info/${animeId}`}>info</Link>
                <section>ani list</section>
                {slug === "watch" && (
                    <section>
                        episodes play
                        {animeId}
                    </section>
                )}
            </main>
        );
    }
    notFound();
}
