"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/common/components/ui/navigation-menu";
import { Input } from "@/common/components/ui/input";
import { Film, Search, X } from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const isActive = (path: string) => {
        return pathname === path;
    };

    const isMovieCategoryActive = () => {
        return pathname.includes('/movies/');
    };
    
    const isSearchActive = () => {
        return pathname.includes('/search');
    };
    
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const clearSearch = () => {
        setSearchQuery("");
        searchInputRef.current?.focus();
    };
    
    const movieCategories = [
        { id: "top_rated", name: "Top Rated" },
        { id: "upcoming", name: "Upcoming" },
        { id: "now_playing", name: "Now Playing" },
        { id: "popular", name: "Popular" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
            <div className="container flex h-16 items-center mx-auto justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <Film className="h-6 w-6" />
                    <span className="font-bold text-xl">GoMovie</span>
                </Link>
                    <NavigationMenu>
                        <NavigationMenuList>
                            {/* Home */}
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    href="/"
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2",
                                        isActive('/') ? "text-primary font-medium" : ""
                                    )}
                                >
                                    Home
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            
                            {/* Movies Dropdown */}
                            <NavigationMenuItem>
                                <NavigationMenuTrigger 
                                    className={cn(
                                        isMovieCategoryActive() ? "text-primary font-medium" : ""
                                    )}
                                >
                                    Movies
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                        {movieCategories.map((category) => (
                                            <li key={category.id}>
                                                <NavigationMenuLink
                                                    href={`/movies/${category.id}`}
                                                    className={cn(
                                                        "block px-4 py-3 hover:bg-gray-800 rounded-md",
                                                        pathname === `/movies/${category.id}` 
                                                            ? "bg-gray-800 font-medium" 
                                                            : ""
                                                    )}
                                                >
                                                    <div className="font-medium">{category.name}</div>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        {category.id === "top_rated" && "Highest rated movies"}
                                                        {category.id === "upcoming" && "Movies coming soon"}
                                                        {category.id === "now_playing" && "Currently in theaters"}
                                                        {category.id === "popular" && "Most popular movies"}
                                                    </p>
                                                </NavigationMenuLink>
                                            </li>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            
                            {/* Watchlist */}
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    href="/watchlist"
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2",
                                        isActive('/watchlist') ? "text-primary font-medium" : ""
                                    )}
                                >
                                    Watchlist
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                <div className="mx-4 flex-1 max-w-2xl hidden sm:block ">
                    <form onSubmit={handleSearch} className="relative">
                        <Input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search for movies..."
                            className="w-full py-2 pl-10 pr-10 h-10 bg-secondary/50 border-secondary"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                                <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                            </button>
                        )}
                    </form>
                </div>
                
                <div className="flex items-center gap-4 lg:hidden">
                    <button
                        className={cn(
                            "sm:hidden flex items-center justify-center h-9 w-9 rounded-md hover:bg-secondary",
                            isSearchActive() ? "bg-secondary text-primary" : ""
                        )}
                        onClick={() => {
                            setIsSearchFocused(true);
                            setTimeout(() => searchInputRef.current?.focus(), 100);
                        }}
                    >
                        <Search className="h-5 w-5" />
                    </button>
                    
                
                </div>
            </div>
        </header>
    );
}
