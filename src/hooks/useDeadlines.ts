import { useAPIFetch } from "./useCanvasFetch";

export interface Assignment {
  id: string;
  title: string;
  dueAt: string | null;
  formattedDueAt: string; // Now in camelCase
  htmlUrl: string;
  contextName: string;
}

/**
 * Fetch and process upcoming assignments.
 */
export function useDeadlines() {
  const { data, isLoading, error, revalidate } = useAPIFetch<Assignment[]>("users/self/upcoming_events");

  // Process assignments to format dates and follow camelCase naming
  const assignments =
    data?.map((item: any) => ({
      id: item.id,
      title: item.title,
      dueAt: item.assignment?.due_at || null, // Raw date
      formattedDueAt: item.assignment?.due_at
        ? new Date(item.assignment.due_at).toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hourCycle: "h23",
          })
        : "No Due Date", // Pre-formatted date
      htmlUrl: item.html_url,
      contextName: item.context_name,
    })) || [];

  return { assignments, isLoading, error, revalidate };
}
