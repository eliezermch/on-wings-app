'use client'

import { Book, Brain, Home } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function BottomNavBar() {
    const [activeTab, setActiveTab] = useState('home');

    return (
        <nav className="sticky lg:hidden px-8 bottom-0 left-0 right-0 bg-background border-t border-primary z-50 safe-area-bottom">
        <div className="max-w-md mx-auto flex justify-around items-center">
          <Link 
            href="/" 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 py-4 w-full transition-colors ${activeTab === 'home' ? 'text-primary' : 'text-foreground/50'}`}
          >
            <Home size={24} color={activeTab === 'home' ? '#D4AF37' : 'currentColor'} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
            <span className={`text-[12px] font-bold ${activeTab === 'home' ? 'text-primary' : 'text-foreground/50'}`}>Home</span>
          </Link>
          
          <Link 
            href="/quiz" 
            onClick={() => setActiveTab('quiz')}
            className={`flex flex-col items-center gap-1 py-4 w-full transition-colors ${activeTab === 'quiz' ? 'text-primary' : 'text-foreground/50'}`}
          >
            <Brain size={24} color={activeTab === 'quiz' ? '#D4AF37' : 'currentColor'} strokeWidth={activeTab === 'quiz' ? 2.5 : 2} />
            <span className="text-[12px] font-bold" style={{ color: activeTab === 'quiz' ? '#D4AF37' : 'currentColor' }}>Quiz</span>
          </Link>

          <Link
            href="/stories/liked" 
            onClick={() => setActiveTab('stories')}
            className={`flex flex-col items-center gap-1 py-4 w-full transition-colors ${activeTab === 'stories' ? 'text-primary' : 'text-foreground/50'}`}
          >
            <Book size={24} color={activeTab === 'stories' ? '#D4AF37' : 'currentColor'} strokeWidth={activeTab === 'stories' ? 2.5 : 2} />
            <span className="text-[12px] font-bold" style={{ color: activeTab === 'stories' ? '#D4AF37' : 'currentColor' }}>Stories</span>
          </Link>
        </div>
      </nav>
    )
}