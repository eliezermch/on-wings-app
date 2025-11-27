import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface Story {
    id: string | number;
    title: string;
    snippet: string;
    readTime: string;
    category: string;
}

export const StoryCard = ({ story }: { story: Story }) => {
    return (
        <Link href={`/stories/${story.id}`}>
            <div key={story.id} className="bg-card p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 cursor-pointer hover:shadow-md transition-shadow">
          <div 
            className="w-16 h-16 bg-secondary text-secondary-foreground rounded-xl flex-shrink-0 flex items-center justify-center text-xl font-bold"
          >
            {story.title.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-bold text-foreground">{story.title}</h3>
              <span className="text-sm px-2 py-1 rounded bg-gray-100 text-gray-500">{story.readTime}</span>
            </div>
            <p className="text-md text-foreground/80 mt-1 line-clamp-2">{story.snippet}</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-sm font-semibold px-2 py-0.5 rounded text-secondary bg-secondary-foreground">
                {story.category}
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