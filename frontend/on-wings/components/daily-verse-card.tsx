"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import client from "@/api/client";

interface DailyVerse {
  content: string;
  reference: string;
  version: string;
  content_es: string;
  reference_es: string;
  version_es: string;
}

export const DailyVerseCard = () => {
  const [verse, setVerse] = useState<DailyVerse | null>(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<'en' | 'es'>('es');

  useEffect(() => {
    const fetchVerse = async () => {
      try {
        const response = await client.get('verses/daily/');
        setVerse(response.data);
      } catch (error) {
        console.error("Failed to fetch daily verse:", error);
        // Fallback
        setVerse({
          content: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
          reference: "Isaiah 40:31",
          version: "NIV",
          content_es: "Pero los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas; correrán, y no se cansarán; caminarán, y no se fatigarán.",
          reference_es: "Isaías 40:31",
          version_es: "RVR1960"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchVerse();
  }, []);

  if (loading) {
    return (
      <div className="w-full p-6 rounded-3xl shadow-lg mb-6 relative overflow-hidden h-[200px] animate-pulse bg-gray-200">
      </div>
    );
  }

  if (!verse) return null;

  const content = language === 'en' ? verse.content : verse.content_es;
  const reference = language === 'en' ? verse.reference : verse.reference_es;
  const version = language === 'en' ? verse.version : verse.version_es;

  return (
    <div 
      className="w-full p-6 rounded-3xl shadow-lg mb-6 relative overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, #0284C7 0%, #BAE6FD 100%)`,
      }}
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 opacity-20 transform translate-x-4 -translate-y-4">
        {/* <Feather size={120} color={COLORS.navy} /> */}
        <Image src="/on-wings-logo-bg-transparent.png" alt="On Wings Logo" className="w-[320px] h-[320px] object-contain mb-0" width={320} height={320} />
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-3">
          <span className="inline-block text-primary-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/30 backdrop-blur-sm">
            {language === 'en' ? 'Verse of the Day' : 'Versículo del Día'}
          </span>
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-1 flex">
            <button 
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${language === 'en' ? 'bg-white text-[#0284C7]' : 'text-primary-foreground hover:bg-white/10'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage('es')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${language === 'es' ? 'bg-white text-[#0284C7]' : 'text-primary-foreground hover:bg-white/10'}`}
            >
              ES
            </button>
          </div>
        </div>
        
        <p className="text-xl text-primary-foreground md:text-2xl font-serif leading-relaxed mb-4 min-h-[80px]">
          "{content}"
        </p>
        <div className="flex justify-between items-end">
          <div>
            <p className="font-bold text-lg text-primary-foreground">{reference}</p>
            <p className="text-md opacity-75 text-primary-foreground">{version}</p>
          </div>
          <button 
            className="p-2 rounded-full bg-white/40 hover:bg-white/60 transition-colors"
            onClick={() => {
               const textArea = document.createElement("textarea");
               textArea.value = `${content} - ${reference}`;
               document.body.appendChild(textArea);
               textArea.select();
               document.execCommand("copy");
               document.body.removeChild(textArea);
               // Basic alert fallback
               const el = document.createElement('div');
               el.innerText = language === 'en' ? 'Copied to clipboard!' : '¡Copiado al portapapeles!';
               el.style.position = 'fixed';
               el.style.bottom = '20px';
               el.style.left = '50%';
               el.style.transform = 'translateX(-50%)';
               el.style.backgroundColor = '#0F172A';
               el.style.color = 'white';
               el.style.padding = '10px 20px';
               el.style.borderRadius = '20px';
               el.style.zIndex = '1000';
               document.body.appendChild(el);
               setTimeout(() => document.body.removeChild(el), 2000);
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
};