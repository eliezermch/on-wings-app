import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { LogOut } from "./log-out";
import { AvatarProfile } from "./avatar-profile";

export const NavBar = async () => {

  return (
      <header className="sticky fixed top-0 z-50 bg-background/60 backdrop-blur-md border-b border-primary">
        <nav className="relative max-w-4xl mx-auto px-0 py-4 flex justify-between items-center">
          <div>
            <Link href="/" className="flex items-center w-[60px] h-[40px]">
              <Image src="/on-wings-logo-bg-transparent.png" alt="On Wings Logo" className="w-[100px] h-[80px] object-cover mb-0" width={80} height={80} />
            </Link>
          </div>
          
          <div className="flex items-center gap-4"  >
            <Link href="/stories/liked" className="text-md font-medium hover:text-primary transition-colors">
              Liked Stories
            </Link>
            <Link href="/stories/liked" className="text-md font-medium hover:text-primary transition-colors">
              Quiz
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <AvatarProfile />
            <LogOut />
            <ModeToggle />
          </div>
        </nav>
      </header>
  );
};