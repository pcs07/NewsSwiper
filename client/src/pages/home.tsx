import { useState } from "react";
import { SwipeContainer } from "@/components/swipe-container";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Calendar } from "@/components/ui/calendar";
import { Menu } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

export default function Home() {
  const [date, setDate] = useState<Date>(new Date());

  const { data: articles, isLoading } = useQuery({
    queryKey: ["/api/articles", format(date, "yyyy-MM-dd")],
    queryFn: async ({ queryKey }) => {
      const response = await fetch(`/api/articles?date=${queryKey[1]}`);
      if (!response.ok) throw new Error('Failed to fetch articles');
      return response.json();
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen p-4 md:p-8 bg-gray-50">
        <div className="max-w-2xl mx-auto h-[600px]">
          <Skeleton className="w-full h-full rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto relative">
        <div className="absolute top-0 right-0 z-10">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="py-4">
                <h3 className="text-lg font-medium mb-4">Select Date</h3>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  className="rounded-md border"
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="h-[600px] mt-12">
          {articles?.length > 0 ? (
            <SwipeContainer articles={articles} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">No news articles for this date.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}