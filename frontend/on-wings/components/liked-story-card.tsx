import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Story } from "@/types/story";

export const LikedStoryCard = ({ story }: { story: Story }) => {
  return (
    <Link key={story.id} href={`/stories/${story.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <CardTitle className="text-primary text-lg line-clamp-2">{story.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">{story.reference}</p>
          <p className="line-clamp-3 text-sm">{story.content}</p>
        </CardContent>
      </Card>
    </Link>
  );
};