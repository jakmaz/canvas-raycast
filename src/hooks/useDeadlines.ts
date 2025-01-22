import { formatDate } from "../utils/formatDate";
import { useAPIFetch } from "./useCanvasFetch";

interface Assignment {
  id: number;
  title: string;
  html_url: string;
  context_name: string;
  assignment?: {
    due_at?: string;
  };
}

/**
 * Fetch and process upcoming assignments.
 */
export function useDeadlines() {
  const { data, isLoading, error, revalidate } = useAPIFetch<Assignment[]>("users/self/upcoming_events");

  const assignments =
    data?.map((item) => ({
      id: item.id.toString(),
      title: item.title,
      dueAt: item.assignment?.due_at || null,
      formattedDueAt: item.assignment?.due_at ? formatDate(item.assignment.due_at) : "No Due Date",
      htmlUrl: item.html_url,
      contextName: item.context_name,
    })) || [];

  return { assignments, isLoading, error, revalidate };
}
