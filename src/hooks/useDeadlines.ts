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

export function useMockDeadlines() {
  const mockAssignments = [
    {
      id: "2",
      title: "Midterm Essay",
      dueAt: new Date(Date.now() + 0 * 24 * 60 * 60 * 1000).toISOString(),
      formattedDueAt: "In 2 days",
      htmlUrl: "https://canvas.example.com/assignments/2",
      contextName: "World History",
    },
    {
      id: "5",
      title: "Pop Quiz",
      dueAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes from now
      formattedDueAt: "In 30 minutes",
      htmlUrl: "https://canvas.example.com/assignments/5",
      contextName: "Mathematics",
    },
    {
      id: "4",
      title: "Quick Lab Report",
      dueAt: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(), // 3 hours from now
      formattedDueAt: "In 3 hours",
      htmlUrl: "https://canvas.example.com/assignments/4",
      contextName: "Chemistry Lab",
    },
    {
      id: "3",
      title: "Group Presentation",
      dueAt: null,
      formattedDueAt: "No Due Date",
      htmlUrl: "https://canvas.example.com/assignments/3",
      contextName: "Business Communication",
    },
  ];

  return {
    assignments: mockAssignments,
    isLoading: false,
    error: null,
    revalidate: () => Promise.resolve(),
  };
}
