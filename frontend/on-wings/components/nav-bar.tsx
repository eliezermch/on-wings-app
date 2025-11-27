import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUser } from "@/actions/auth";
import { ModeToggle } from "./mode-toggle";

export const NavBar = async () => {
    const user = await getUser();

  return (
      <header className="sticky fixed top-0 z-50 bg-background/60 backdrop-blur-md border-b border-primary">
        <nav className="relative">
          <div className="max-w-md mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center w-[60px] h-[40px]">
            <Image src="/on-wings-logo-bg-transparent.png" alt="On Wings Logo" className="w-[100px] h-[80px] object-cover mb-0" width={80} height={80} />
          </div>
          <div className="w-8 h-8 rounded-full overflow-hidden">
             {/* Profile placeholder */}
             <Avatar>
                <AvatarImage className="w-full h-full object-cover" src={user?.avatar} />
                <AvatarFallback>{user?.first_name.charAt(0).toUpperCase() + user?.last_name.charAt(0).toUpperCase()}</AvatarFallback>
             </Avatar>
          </div>
          <ModeToggle />
        </div>
        </nav>
      </header>
  );
};