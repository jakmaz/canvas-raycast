import { formatDate } from "../utils/formatDate";
import { useAPIFetch } from "./useCanvasFetch";

interface Announcement {
  id: number;
  title: string;
  html_url: string;
  user_name: string;
  created_at: string;
}

/**
 * Fetch course announcements using Canvas API.
 */
export function useCourseAnnouncements(courseId: string) {
  const { data, isLoading, error, revalidate } = useAPIFetch<Announcement[]>(
    `announcements?context_codes[]=course_${courseId}&start_date=2000-01-01&end_date=2100-01-01`, // Ensures all announcements
  );

  // Transform API response
  const announcements =
    data?.map((announcement) => ({
      id: announcement.id,
      title: announcement.title,
      htmlUrl: announcement.html_url,
      userName: announcement.user_name,
      createdAt: announcement.created_at,
      formatedCreatedAt: formatDate(announcement.created_at),
    })) || [];

  return { announcements, isLoading, error, revalidate };
}
