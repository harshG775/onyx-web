"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useDebounce from "@/hooks/useDebounce";
import Icon from "@/lib/icons/lucide";
import { useSearch } from "@/services/anilist/queries.tanstack";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
    const router = useRouter();
    const [queryInput, setQueryInput] = useState("");
    const debounceSearch = useDebounce(queryInput, 1000);
    const { data, status, error } = useSearch(debounceSearch, queryInput, 1, 5);

    const [inputFocus, setInputFocus] = useState(false);

    const handleSearch = (e: any) => {
        e.preventDefault();
        router.push(`/search?query=${queryInput}`);
    };
    console.log(data?.data?.Page?.media);
    return (
        <div className="relative">
            <form className=" max-w-96 mx-auto" onSubmit={handleSearch}>
                <Label htmlFor="search" className="sr-only">
                    search
                </Label>
                <Input
                    type="text"
                    id="search"
                    placeholder="Search..."
                    value={queryInput}
                    onChange={({ target }: any) => {
                        setQueryInput(target.value);
                    }}
                    className="pr-11"
                    onFocus={() => {
                        setInputFocus(true);
                    }}
                    onBlur={() => {
                        setInputFocus(false);
                    }}
                />
                <button className="absolute right-0 top-0 bottom-0 p-1 hover:text-input">
                    <Icon name="Search" className="w-8 h-8 p-1" />
                </button>
            </form>
            {inputFocus && status === "success" && queryInput.length != 0 && (
                <div className="absolute left-0 right-0 top-12 bg-secondary p-2">
                    <ul>
                        {data?.data?.Page?.media?.map((anime: any) => (
                            <li key={anime.id}>
                                <Link
                                    href={`anime/${anime.id}`}
                                    className=" flex gap-2 bg-background/40 hover:bg-primary/20 p-1"
                                >
                                    <img
                                        src={anime.coverImage.medium}
                                        alt={anime.title.userPreferred}
                                        width={50}
                                        height={50}
                                    />
                                    <p className="line-clamp-2">
                                        <span className="text-xs">
                                            {anime.title.userPreferred}
                                        </span>
                                    </p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="bg-secondary/50 py-1">
                        <Link
                            href={"#"}
                            // href={`/search?query=${queryInput}`}
                            className="text-ring hover:text-primary"
                        >
                            ViewMore
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
