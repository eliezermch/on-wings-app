'use client'

import { Book, Brain, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation'

export default function BottomNavBar() {
    const pathname = usePathname()

    return (
        <nav className={"sticky lg:hidden px-8 bottom-0 left-0 right-0 bg-background border-t border-primary z-50 safe-area-bottom" + (pathname.includes('/OLD/') || pathname.includes('/NEW/') ? ' hidden' : '')}>
        <div className="max-w-md mx-auto flex justify-around items-center">
          <Link 
            href="/" 
            className={`flex flex-col items-center gap-1 py-4 w-full transition-colors ${pathname === '/' ? 'text-primary' : 'text-foreground/50'}`}
          >
            <Home size={24} color={pathname === '/' ? '#D4AF37' : 'currentColor'} strokeWidth={pathname === '/' ? 2.5 : 2} />
            <span className={`text-[12px] font-bold ${pathname === '/' ? 'text-primary' : 'text-foreground/50'}`}>Home</span>
          </Link>
          
          <Link 
            href="/quiz" 
            className={`flex flex-col items-center gap-1 py-4 w-full transition-colors ${pathname.includes('/quiz') ? 'text-primary' : 'text-foreground/50'}`}
          >
            <Brain size={24} color={pathname.includes('/quiz') ? '#D4AF37' : 'currentColor'} strokeWidth={pathname.includes('/quiz') ? 2.5 : 2} />
            <span className="text-[12px] font-bold" style={{ color: pathname.includes('/quiz') ? '#D4AF37' : 'currentColor' }}>Quiz</span>
          </Link>

          <Link
            href="/stories/liked" 
            className={`flex flex-col items-center gap-1 py-4 w-full transition-colors ${pathname.includes('/stories/') ? 'text-primary' : 'text-foreground/50'}`}
          >
            <Book size={24} color={pathname.includes('/stories/') ? '#D4AF37' : 'currentColor'} strokeWidth={pathname.includes('/stories/') ? 2.5 : 2} />
            <span className="text-[12px] font-bold" style={{ color: pathname.includes('/stories/') ? '#D4AF37' : 'currentColor' }}>Stories</span>
          </Link>
        </div>
      </nav>
    )
}