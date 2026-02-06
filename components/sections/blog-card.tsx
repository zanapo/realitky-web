import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/formatters";
import type { BlogPost } from "@/lib/blog";

export const BlogCard = ({ post }: { post: BlogPost }) => (
  <Card className="h-full transition-shadow hover:shadow-lg">
    <CardContent className="flex h-full flex-col gap-3 p-6">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        {post.category}
      </p>
      <h3 className="text-lg font-semibold">{post.title}</h3>
      <p className="text-sm text-muted-foreground">{post.excerpt}</p>
      <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
        <span>{formatDate(post.createdAt)}</span>
        <Link href={`/poradna/${post.slug}`} className="text-primary">
          Číst více
        </Link>
      </div>
    </CardContent>
  </Card>
);
