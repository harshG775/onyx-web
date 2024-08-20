import axios from "axios";
import Player from "../../_components/watch/Player";
import PlayerControls from "../../_components/watch/PlayerControls";
import { notFound } from "next/navigation";
import { AnimeInfoResponseType } from "@/services/gogoanime/GogoAnimeTypes";

type InfoPageProps = {
    params: {
        slug: string;
    };
};
export default async function WatchPage({ params }: InfoPageProps) {
    const { slug } = params;
    try {
        const { data } = await axios.get<AnimeInfoResponseType>(
            `https://consumet-rho-liard.vercel.app/anime/gogoanime/info/${slug}`
        );
        return (
            <main className="space-y-10 py-2">
                <div className="container py-2 grid gap-y-10 gap-x-2 lg:grid-cols-[1fr_300px] lg:aspect-[21/9] shadow-md">
                    <Player episodes={data.episodes} />
                    <PlayerControls
                        episodes={data.episodes}
                        title={data.title}
                    />

                    {/* <Player
                        backdrop_path={data.backdrop_path}
                        status={data.status}
                        id={data.id}
                        title={data.name}
                    /> */}
                    {/* <FilesPlaying
                        title={data.name}
                        seasons={data.seasons}
                        episodes={data.number_of_episodes}
                    /> */}
                </div>
                <div className="container grid gap-y-10 gap-x-2 lg:grid-cols-[1fr_300px]">
                    {/* <Overview data={data} />
                    <Comments className="lg:col-span-2" />
                    <Similar />
                    <Recommended /> */}
                </div>
            </main>
        );
    } catch (error: any) {
        console.error("WatchPage error");
        console.log(error);
        if (error?.response?.status === 404) {
            return notFound();
        }
        return (
            <main className="space-y-10 py-2">
                <h1>something went wrong</h1>
            </main>
        );
    }
}
