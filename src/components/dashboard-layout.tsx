import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/use-auth";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Calendar, User, LogOut, Menu, LayoutDashboard } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

export function DashboardLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sheetOpen, setSheetOpen] = useState(false);

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Bookings",
      href: "/dashboard/bookings",
      icon: Calendar,
    },
    {
      name: "Profile Settings",
      href: "/dashboard/profile",
      icon: User,
    },
  ];

  const SidebarContent = () => (
    <>
      <div className="h-16 flex items-center px-6 border-b">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          BlueCollar
        </Link>
      </div>

      <div className="p-4 flex-1">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setSheetOpen(false)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-6">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={logout}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sign out
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-3 mb-6 p-4">
        <Avatar>
          <AvatarImage src={user?.role === "Artisan" ? user?.artisanImage : user?.userImage} />
          <AvatarFallback>{user?.firstName?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{user?.firstName} {user?.lastName}</p>
          <p className="text-sm text-gray-500">{user?.role}</p>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        <div className="hidden lg:flex w-64 bg-white border-r flex-col justify-between">
          <SidebarContent />
        </div>

        <div className="lg:hidden fixed top-4 right-4 z-50">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0 w-64">
              <SheetHeader />
              <SidebarContent />
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex-1 overflow-auto">
          <main className="p-4 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
