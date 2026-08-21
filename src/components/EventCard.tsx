import type { Event } from "../types/index";
 
interface EventCardProps {
  event: Event;
  variant?: "default" | "compact"; 
}
 
function EventCard({ event, variant = "default" }: EventCardProps) {
  const isCompact = variant === "compact";
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5
shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{event.title}</h3>
      {!isCompact && ( 
      <p className="text-gray-600 dark:text-gray-300">{event.venue}</p> )}
      <p className="text-sm text-gray-500 dark:text-gray-400">{event.date.toString()}</p>
    </div>
  );
}
 
export default EventCard; 
