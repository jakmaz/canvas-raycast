export function formatDate(isoString: string): string {
  if (!isoString) return "Unknown Date";

  const date = new Date(isoString);
  return date.toLocaleDateString("en-GB", {
    weekday: "long", // e.g., "Monday"
    day: "2-digit",
    month: "long", // e.g., "January"
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
}
