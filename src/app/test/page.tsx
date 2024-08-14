"use client";
import { getInfoByTitle } from "@/services/gogoanime/api";
import { useGetInfoByTitle } from "@/services/gogoanime/queries.tanstack";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const title = {
    romaji: "Kami no Tou: Tower of God - Ouji no Kikan",
    english: "Tower of God Season 2",
    native: "神之塔 -Tower of God- 王子の帰還",
    userPreferred: "Tower of God Season 2",
};
export default function TestPage() {
    const { data, status } = useGetInfoByTitle(title,"")
    if (status === "pending") {
        console.log("pending");
        return (
            <main>
                <h1>Loading...</h1>
            </main>
        );
    }
    if (status === "error") {
        console.log("error");
        return (
            <main>
                <h1>Error</h1>
            </main>
        );
    }
    if (status === "success") {
        console.log(data);
        return (
            <main>
                <h1>Test Page</h1>
            </main>
        );
    }
}
