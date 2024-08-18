import SearchBar from "../searchBar/SearchBar";

const navLinksData = [
    {
        title: "Home",
        href: "/home",
    },
];
export default function TopNavbar() {
    return (
        <nav className="bg-background sticky top-0 z-50">
            <ul className="flex justify-between p-2">
                <li>Onyxstream</li>
                <li>
                    <SearchBar />
                </li>
                {navLinksData.map((el) => (
                    <li key={el.href}>{el.title}</li>
                ))}
            </ul>
        </nav>
    );
}
