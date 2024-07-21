import Link from "next/link";
import SearchBar from "./_components/searchBar/SearchBar";
import { Button } from "@/components/ui/button";
const rootPageNavLinks = [
    {
        href: "home",
        name: "Home",
    },
];
export default function RootPage() {
    return (
        <main className="py-10 gap-2 h-screen text-center flex flex-col">
            <nav className="py-2">
                <ul>
                    {rootPageNavLinks.map((link, i) => (
                        <li key={link.href + i}>
                            <Button asChild variant={"link"} className="rounded-none h-8">
                                <Link href={link.href}>{link.name}</Link>
                            </Button>
                        </li>
                    ))}
                </ul>
            </nav>
            <section>
                <SearchBar />
            </section>
        </main>
    );
}
