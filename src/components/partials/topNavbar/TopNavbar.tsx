"use client";
import Icon from "@/lib/icons/lucide";
import SearchBar from "../searchBar/SearchBar";
import { useState } from "react";
import Link from "next/link";

const navLinksData = [
    {
        title: "Home",
        href: "/home",
    },
];
export default function TopNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <nav className="bg-background sticky top-0 z-50">
            <ul className="flex justify-between items-center gap-2  py-2 px-4 container">
                <li>
                    <Link
                        href={"/home"}
                        className="block font-bold text-base sm:text-xl"
                    >
                        <span>Ony</span>
                        <span className="text-primary/80">xstream</span>
                    </Link>
                </li>
                {/* {navLinksData.map((el) => (
                    <li key={el.href}>{el.title}</li>
                ))} */}
                <li>
                    <SearchBar />
                </li>
            </ul>
        </nav>
    );
}
