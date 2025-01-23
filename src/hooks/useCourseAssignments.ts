import { formatDate } from "../utils/formatDate";
import { useAPIFetch } from "./useCanvasFetch";

interface Assignment {
  id: number;
  name: string;
  html_url: string;
  due_at: string;
}

/**
 * Fetch and process upcoming assignments.
 */
export function useCourseAssignments(courseId: string) {
  const { data, isLoading, error, revalidate } = useAPIFetch<Assignment[]>(`courses/${courseId}/assignments`);

  const assignments =
    data
      ?.map((item) => ({
        id: item.id.toString(),
        name: item.name,
        dueAt: item.due_at,
        formattedDueAt: formatDate(item.due_at),
        htmlUrl: item.html_url,
      }))
      .sort((a, b) => {
        if (!a.dueAt) return 1;
        if (!b.dueAt) return -1;
        return new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime();
      }) || [];

  return { assignments, isLoading, error, revalidate };
}
