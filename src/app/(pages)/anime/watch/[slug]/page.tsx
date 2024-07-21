import axios from "axios";
import Player from "../../_components/watch/Player";
import PlayerControls from "../../_components/watch/PlayerControls";

type InfoPageProps = {
    params: {
        slug: string;
    };
};
export default async function WatchPage({ params }: InfoPageProps) {
    const { slug } = params;  
    const {data} = await axios.get("https://consumet-rho-liard.vercel.app/anime/gogoanime/info/shikanoko-nokonoko-koshitantan") 
    return (
        <main className="space-y-10 py-2">
            <div className="container py-2 grid gap-y-10 gap-x-2 lg:grid-cols-[1fr_300px] lg:aspect-[21/9] shadow-md">
                <Player />
                <PlayerControls animeId={slug} />

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
}
