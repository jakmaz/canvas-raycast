import { useAPIFetch } from "./useCanvasFetch";

export interface ActivityItem {
  id: number;
  title: string;
  message: string;
  type: string;
  formattedCreatedAt: string;
  htmlUrl: string;
  readState: boolean;
}

/**
 * Fetch and process activity stream.
 */
export function useActivityStream() {
  const { data, isLoading, error, revalidate } = useAPIFetch<ActivityItem[]>("users/self/activity_stream");

  // Process activity items to format dates and use camelCase
  const activities =
    data?.map((item: any) => ({
      id: item.id,
      title: item.title,
      message: item.message || "No message",
      type: item.type,
      formattedCreatedAt: new Date(item.created_at).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      htmlUrl: item.html_url,
      readState: item.read_state,
    })) || [];

  return { activities, isLoading, error, revalidate };
}
