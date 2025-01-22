import { formatDate } from "../utils/formatDate";
import { useAPIFetch } from "./useCanvasFetch";

interface ActivityItem {
  id: number;
  title: string;
  message: string;
  type: string;
  created_at: string;
  html_url: string;
  read_state: boolean;
}

/**
 * Fetch and process activity stream.
 */
export function useFeed() {
  const { data, isLoading, error, revalidate } = useAPIFetch<ActivityItem[]>("users/self/activity_stream");

  const activities =
    data?.map((item) => ({
      id: item.id,
      title: item.title,
      message: item.message || "No message",
      type: item.type,
      htmlUrl: item.html_url,
      readState: item.read_state,
      createdAt: item.created_at,
      formattedCreatedAt: formatDate(item.created_at),
    })) || [];

  return { activities, isLoading, error, revalidate };
}
