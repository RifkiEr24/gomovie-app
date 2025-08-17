"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
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
import { Button } from "@/common/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/common/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/common/components/ui/accordion";
import { Film, Menu, Search, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const movieCategories = useMemo(
    () => [
      { id: "top_rated", name: "Top Rated", desc: "Highest rated movies" },
      { id: "upcoming", name: "Upcoming", desc: "Movies coming soon" },
      { id: "now_playing", name: "Now Playing", desc: "Currently in theaters" },
      { id: "popular", name: "Popular", desc: "Most popular movies" },
    ],
    []
  );

  const isActive = useCallback((path: string) => pathname === path, [pathname]);
  const isMovieCategoryActive = useCallback(
    () => pathname.startsWith("/movies/"),
    [pathname]
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      router.push(`/search?query=${encodeURIComponent(q)}`);
      setOpenMobileMenu(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    searchInputRef.current?.focus();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left: Logo */}
        <Link href="/" className="flex lg:hidden items-center gap-2">
          <Film className="h-6 w-6" />
          <span className="font-bold text-xl">GoMovie</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6 justify-between w-full">
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
                    "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
                    isActive("/") ? "text-primary font-medium" : "hover:text-primary"
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
                  <ul className="grid w-[480px] gap-2 p-3 md:w-[560px] md:grid-cols-2">
                    {movieCategories.map((c) => (
                      <li key={c.id}>
                        <NavigationMenuLink
                          href={`/movies/${c.id}`}
                          className={cn(
                            "block rounded-md px-4 py-3 hover:bg-secondary/60 transition-colors",
                            pathname === `/movies/${c.id}` && "bg-secondary font-medium"
                          )}
                        >
                          <div className="font-medium">{c.name}</div>
                          <p className="text-sm text-muted-foreground mt-1">{c.desc}</p>
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
                    "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
                    isActive("/watchlist")
                      ? "text-primary font-medium"
                      : "hover:text-primary"
                  )}
                >
                  Watchlist
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop Search */}
          <form onSubmit={handleSearchSubmit} className="relative w-[420px]">
            <Input
              ref={searchInputRef}
              type="text"
              placeholder="Search for movies..."
              className="w-full py-2 pl-10 pr-10 h-10 bg-secondary/50 border-secondary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </form>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open search"
            onClick={() => {
              setOpenMobileMenu(true);
              setTimeout(() => searchInputRef.current?.focus(), 120);
            }}
          >
            <Search className="h-5 w-5" />
          </Button>

          <Sheet open={openMobileMenu} onOpenChange={setOpenMobileMenu}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88vw] sm:w-[380px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Film className="h-5 w-5" />
                  GoMovie
                </SheetTitle>
              </SheetHeader>

              {/* Mobile Search */}
              <div className="mt-6 px-4">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <Input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search for movies..."
                    className="w-full py-2 pl-10 pr-10 h-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      aria-label="Clear search"
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                    </button>
                  )}
                </form>
              </div>

              {/* Mobile Links */}
              <nav className="mt-6 space-y-2">
                <Link
                  href="/"
                  onClick={() => setOpenMobileMenu(false)}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive("/") ? "bg-secondary text-primary" : "hover:bg-secondary/60"
                  )}
                >
                  Home
                </Link>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="movies">
                    <AccordionTrigger
                      className={cn(
                        "px-3 text-sm font-medium",
                        isMovieCategoryActive() && "text-primary"
                      )}
                    >
                      Movies
                    </AccordionTrigger>
                    <AccordionContent className="pt-1">
                      <ul className="space-y-1">
                        {movieCategories.map((c) => (
                          <li key={c.id}>
                            <Link
                              href={`/movies/${c.id}`}
                              onClick={() => setOpenMobileMenu(false)}
                              className={cn(
                                "block rounded-md px-3 py-2 text-sm transition-colors",
                                pathname === `/movies/${c.id}`
                                  ? "bg-secondary text-primary font-medium"
                                  : "hover:bg-secondary/60"
                              )}
                            >
                              <div>{c.name}</div>
                              <p className="text-xs text-muted-foreground">{c.desc}</p>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Link
                  href="/watchlist"
                  onClick={() => setOpenMobileMenu(false)}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive("/watchlist")
                      ? "bg-secondary text-primary"
                      : "hover:bg-secondary/60"
                  )}
                >
                  Watchlist
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
