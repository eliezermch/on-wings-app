import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Story } from "@/types/story";
import Image from "next/image";

export const StoryCard = ({ story }: { story: Story }) => {
    const snippet = story.content.substring(0, 100) + "...";
    const readTime = Math.ceil(story.content.split(' ').length / 200) + " min";
    const category = "Bible Story"; // Default category since it's not in the model yet

    return (
        <Link href={`/stories/${story.id}`}>
            <div key={story.id} className="bg-card p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 cursor-pointer hover:shadow-md transition-shadow">
          

          <div className="flex flex-col items-center gap-4">
            <div 
            className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 relative bg-secondary text-secondary-foreground rounded-xl flex-shrink-0 flex items-center justify-center text-xl font-bold overflow-hidden"
          >
            <Image
            src={story.image_url}
            alt={story.title}
            width={64}
            height={64}
            className="block md:hidden w-full h-full object-cover"
            />
            <Image
            src={story.image_url}
            alt={story.title}
            width={2048}
            height={2048}
            className="hidden lg:block w-full h-full object-cover"
            />
            
          </div>
            <span className="block md:hidden text-xs md:text-sm leading-[1.2] px-2 py-1 rounded bg-gray-100 text-gray-500">{readTime}</span>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="text-md md:text-lg leading-[1.2] font-bold text-foreground">{story.title}</h3>
              <span className="hidden md:block text-xs md:text-sm leading-[1.2] px-2 py-1 rounded bg-gray-100 text-gray-500">{readTime}</span>
            </div>
            <p className="text-md text-foreground/80 mt-1 line-clamp-2">{snippet}</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs md:text-sm font-semibold leading-[1.2] px-2 py-0.5 rounded text-secondary bg-secondary-foreground">
                {category}
              </span>
            </div>
          </div>
          <div className="flex items-center text-foreground/80">
            <ChevronRight size={20} />
          </div>
        </div>
        </Link>
    );
};