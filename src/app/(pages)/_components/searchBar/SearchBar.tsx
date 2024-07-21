"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useDebounce from "@/hooks/useDebounce";
import Icon from "@/lib/icons/lucide";
import { useSearch } from "@/services/gogoanime/queries.tanstack";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
    const router = useRouter();
    const [queryInput, setQueryInput] = useState("");
    const debounceSearch = useDebounce(queryInput, 1000);
    const { data, status } = useSearch(debounceSearch, queryInput, 1);
    const handleSearch = (e: any) => {
        e.preventDefault();
        router.push(`/search?query=${queryInput}`);
    };
    return (
        <>
            <form className="relative max-w-96 mx-auto" onSubmit={handleSearch}>
                <Label htmlFor="search" className="sr-only">
                    search
                </Label>
                <Input
                    id="search"
                    placeholder="Search..."
                    value={queryInput}
                    onChange={({ target }: any) => {
                        setQueryInput(target.value);
                    }}
                    className="pr-11"
                />
                <button className="absolute right-0 top-0 bottom-0 p-1 hover:text-input">
                    <Icon name="Search" className="w-8 h-8 p-1" />
                </button>
            </form>
            <div className="max-w-96 mx-auto ">
                {status === "error" && "error"}
                {status === "success" && (
                    <div className="grid gap-y-2 mt-2 odd:bg-secondary/20">
                        {data?.results?.slice(0, 5)?.map((anime) => (
                            <Link
                                href={`/anime/${anime.id}`}
                                key={anime.id}
                                className="flex gap-2 odd:bg-secondary/40 hover:bg-primary/20 p-1"
                            >
                                <img
                                    src={anime.image}
                                    alt={anime.title}
                                    width={40}
                                    height={40}
                                />
                                <p>{anime.title}</p>
                            </Link>
                        ))}
                        {data?.results && data?.results?.length >= 5 && (
                            <div className="bg-secondary/50 py-1">
                                <Link
                                    href={`/search?query=${queryInput}`}
                                    className="text-ring hover:text-primary"
                                >
                                    ViewMore
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
