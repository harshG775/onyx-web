import Link from "next/link";
import SearchBar from "@/components/partials/searchBar/SearchBar";
import { Button } from "@/components/ui/button";
import Icon from "@/lib/icons/lucide";
const rootPageNavLinks = [
    {
        href: "home",
        name: "Home",
    },
];
export default function RootPage() {
    return (
        <>
            <main className=" root-backdrop">
                <div className="max-w-3xl mx-auto p-[0.5rem]">
                    <nav className="py-2 flex justify-center">
                        <ul>
                            {rootPageNavLinks.map((link, i) => (
                                <li key={link.href + i}>
                                    <Button
                                        asChild
                                        variant={"link"}
                                        className="rounded-none h-8"
                                    >
                                        <Link href={link.href}>
                                            {link.name}
                                        </Link>
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <section className="space-y-4">
                        <SearchBar />
                        <div className="min-h-[400px] rounded-full bg-primary/20 grid place-content-center">
                            <img
                                src="PNG IMAGE"
                                alt="PNG IMAGE"
                                width={100}
                                height={100}
                            />
                        </div>
                        <Button asChild>
                            <Link href={"/home"} className="flex gap-2">
                                Got to homepage
                                <Icon
                                    name="ArrowRight"
                                    className="rounded-full bg-background p-1"
                                />
                            </Link>
                        </Button>
                    </section>
                </div>
            </main>
            <footer className="max-w-3xl mx-auto p-[0.5rem]">footer</footer>
        </>
    );
}
