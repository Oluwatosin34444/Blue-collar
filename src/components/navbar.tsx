import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu, Search } from "lucide-react";
import { locations, services } from "@/lib/constant";
import Container from "@/components/container";
import { useAuth } from "@/contexts/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function MyAppNav() {
  const [search, setSearch] = useState("");
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const { user, logout } = useAuth();

  const suggestions = [
    ...services.map((s) => ({ type: "service", value: s })),
    ...locations.map((l) => ({ type: "location", value: l })),
  ].filter(
    (item) =>
      item.value.toLowerCase().includes(search.trim().toLowerCase()) &&
      search.trim() !== ""
  );

  useEffect(() => {
    if (isInputFocused && search.trim() !== "" && suggestions.length > 0) {
      setPopoverOpen(true);
    } else if (!isInputFocused) {
      // Use a small delay to allow for selection clicks to register
      const timer = setTimeout(() => {
        setPopoverOpen(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isInputFocused, search, suggestions.length]);

  const handleSelect = (item: { type: string; value: string }) => {
    setSearch(item.value);
    setPopoverOpen(false);

    if (item.type === "service") {
      navigate(`/artisans?service=${encodeURIComponent(item.value)}`);
    } else if (item.type === "location") {
      navigate(`/artisans?location=${encodeURIComponent(item.value)}`);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const service = services.find(
      (s) => s.toLowerCase() === search.trim().toLowerCase()
    );
    const location = locations.find(
      (l) => l.toLowerCase() === search.trim().toLowerCase()
    );
    if (service) {
      navigate(`/artisans?service=${encodeURIComponent(service)}`);
    } else if (location) {
      navigate(`/artisans?location=${encodeURIComponent(location)}`);
    } else {
      navigate(`/artisans?search=${encodeURIComponent(search)}`);
    }
    setPopoverOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!popoverOpen || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      setHighlighted((h) => (h + 1) % suggestions.length);
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setHighlighted((h) => (h - 1 + suggestions.length) % suggestions.length);
      e.preventDefault();
    } else if (e.key === "Enter" && highlighted >= 0) {
      handleSelect(suggestions[highlighted]);
      e.preventDefault();
    } else if (e.key === "Escape") {
      setPopoverOpen(false);
      inputRef.current?.blur();
      e.preventDefault();
    }
  };

  const navLinks = (
    <>
      {/* <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `px-3 py-2 rounded-md text-sm font-medium ${
            isActive
              ? "text-blue-600 bg-blue-50"
              : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
          }`
        }
      >
        Home
      </NavLink> */}
      <NavLink
        to="/artisans"
        className={({ isActive }) =>
          `px-3 py-2 rounded-md text-sm font-medium ${
            isActive
              ? "text-blue-600 bg-blue-50"
              : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
          }`
        }
      >
        Find Artisans
      </NavLink>
      <NavLink
        to="/services"
        className={({ isActive }) =>
          `px-3 py-2 rounded-md text-sm font-medium ${
            isActive
              ? "text-blue-600 bg-blue-50"
              : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
          }`
        }
      >
        Services
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          `px-3 py-2 rounded-md text-sm font-medium ${
            isActive
              ? "text-blue-600 bg-blue-50"
              : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
          }`
        }
      >
        About
      </NavLink>
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          `px-3 py-2 rounded-md text-sm font-medium ${
            isActive
              ? "text-blue-600 bg-blue-50"
              : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
          }`
        }
      >
        Contact
      </NavLink>
    </>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <Container>
        <div className="w-full mx-auto py-1">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-gray-800">BlueCollar</Link>
            </div>

            <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
              {navLinks}
              <div className="relative ml-6 w-[340px] max-w-full">
                <form
                  onSubmit={handleSearch}
                  className="flex items-center bg-white rounded-full border border-blue-200 shadow-sm px-4 py-1.5"
                  autoComplete="off"
                >
                  <Search className="text-gray-400 mr-2" size={20} />
                  <span className="text-gray-900 font-medium mr-2">
                    I need a –
                  </span>
                  <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Enter a service, or location"
                    className="border-0 focus:ring-0 focus-visible:ring-0 px-0 bg-transparent text-gray-500 placeholder:text-gray-400 flex-1"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      if (e.target.value.trim() !== "") {
                        setPopoverOpen(true);
                      }
                      setHighlighted(-1);
                    }}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    onKeyDown={handleKeyDown}
                    style={{ boxShadow: "none" }}
                  />
                  <Button type="submit" className="rounded-full px-8 ml-2 bg-blue-600 text-white hover:bg-blue-700">
                    Search
                  </Button>
                </form>

                {popoverOpen && suggestions.length > 0 && (
                  <div
                    ref={popoverRef}
                    className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                  >
                    <ul className="divide-y divide-gray-100 max-h-[300px] overflow-y-auto">
                      {suggestions.map((item, idx) => (
                        <li
                          key={item.type + item.value}
                          className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${
                            highlighted === idx ? "bg-blue-100" : ""
                          }`}
                          onMouseDown={(e) => {
                            e.preventDefault(); // Prevent blur before click
                            handleSelect(item);
                          }}
                          onMouseEnter={() => setHighlighted(idx)}
                          aria-selected={highlighted === idx}
                        >
                          <span className="font-medium text-gray-800">
                            {item.value}
                          </span>
                          <span className="ml-2 text-xs text-gray-500">
                            {item.type === "service" ? "Service" : "Location"}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2 ml-6">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar>
                        <AvatarImage src={user.imageLink} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate('/dashboard/bookings')}>
                      Bookings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/dashboard/profile')}>
                      Profile Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout} className="text-red-600">
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <NavLink
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Login
                </NavLink>
              )}
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden flex items-center">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-4/5">
                  <div className="flex flex-col h-full">
                    <div className="px-6 py-4 border-b">
                      <Link to="/" className="text-2xl font-bold text-gray-800">
                        BlueCollar
                      </Link>
                    </div>
                    <div className="flex flex-col gap-2 px-6 py-4">
                      {navLinks}
                    </div>
                    <div className="relative mt-4 px-6">
                      <form
                        onSubmit={handleSearch}
                        className="flex items-center"
                        autoComplete="off"
                      >
                        <Search className="text-gray-400 mr-2" size={20} />
                        <Input
                          type="text"
                          placeholder="Search services or location"
                          className="border-0 focus:ring-0 focus-visible:ring-0 px-0 bg-transparent text-gray-500 placeholder:text-gray-400 flex-1"
                          value={search}
                          onChange={(e) => {
                            setSearch(e.target.value);
                            if (e.target.value.trim() !== "") {
                              setPopoverOpen(true);
                            }
                            setHighlighted(-1);
                          }}
                          onFocus={() => setIsInputFocused(true)}
                          onBlur={() => setIsInputFocused(false)}
                          onKeyDown={handleKeyDown}
                          style={{ boxShadow: "none" }}
                        />
                        <Button type="submit" className="ml-2 bg-blue-600 text-white hover:bg-blue-700">
                          Go
                        </Button>
                      </form>

                      {popoverOpen && suggestions.length > 0 && (
                        <div className="absolute left-6 right-6 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                          <ul className="divide-y divide-gray-100 max-h-[200px] overflow-y-auto">
                            {suggestions.map((item, idx) => (
                              <li
                                key={item.type + item.value}
                                className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${
                                  highlighted === idx ? "bg-blue-100" : ""
                                }`}
                                onMouseDown={(e) => {
                                  e.preventDefault(); // Prevent blur before click
                                  handleSelect(item);
                                }}
                                onMouseEnter={() => setHighlighted(idx)}
                                aria-selected={highlighted === idx}
                              >
                                <span className="font-medium text-gray-800">
                                  {item.value}
                                </span>
                                <span className="ml-2 text-xs text-gray-500">
                                  {item.type === "service"
                                    ? "Service"
                                    : "Location"}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 px-6 mt-6">
                      {user ? (
                        <>
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => navigate('/dashboard/bookings')}
                          >
                            Bookings
                          </Button>
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => navigate('/dashboard/profile')}
                          >
                            Profile Settings
                          </Button>
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-red-600"
                            onClick={logout}
                          >
                            Sign out
                          </Button>
                        </>
                      ) : (
                        <NavLink
                          to="/login"
                          className="px-3 py-2 rounded-md text-sm text-center font-medium text-white bg-blue-600 hover:bg-blue-700"
                        >
                          Login
                        </NavLink>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
}
