import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import type { Article } from "@shared/schema";

interface NewsCardProps {
  article: Article;
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full"
    >
      <Card className="h-full overflow-hidden">
        <div className="relative h-64">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <Badge className="flex items-center gap-2 bg-white/90 text-black">
              <img
                src={article.categoryIcon}
                alt={article.category}
                className="w-4 h-4"
              />
              {article.category}
            </Badge>
          </div>
        </div>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">{article.title}</h2>
          <p className="text-gray-600">{article.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
