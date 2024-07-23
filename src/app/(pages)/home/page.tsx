import TopAiring from "./_components/TopAiring";
import TrendingReleasing from "./_components/TrendingReleasing";

export default function HomePage() {
    return (
        <main className="p-2 space-y-2">
            <section className="max-w-8xl mx-auto  border border-primary">
                <div className="h-96">current carousel background</div>
                <section>
                    <h2 className="text-2xl font-bold text-center  border-y border-primary">
                        Trending
                    </h2>
                    <ul className="min-h-56">carousel content</ul>
                </section>
            </section>
            <div className="grid gap-2 lg:grid-cols-[3fr_1fr] max-w-8xl mx-auto">
                <TrendingReleasing/>
                <TopAiring />
            </div>
        </main>
    );
}
