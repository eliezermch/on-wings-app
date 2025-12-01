import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Story } from "@/types/story";

export const LikedStoryCard = ({ story }: { story: Story }) => {
  return (
    <Link key={story.id} className="px-8" href={`/stories/${story.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow gap-1 md:gap-6 cursor-pointer">
        <CardHeader>
          <CardTitle className="text-primary text-lg line-clamp-2">{story.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground md:mb-4 mb-2">{story.reference}</p>
          <p className="line-clamp-3 text-sm">{story.content}</p>
        </CardContent>
      </Card>
    </Link>
  );
};