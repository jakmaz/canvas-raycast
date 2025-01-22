import { useAPIFetch } from "./useCanvasFetch";

interface Announcement {
  id: number;
  title: string;
  html_url: string;
  user_name: string;
  last_reply_at: string;
}

/**
 * Fetch course announcements using Canvas API.
 */
export function useCourseAnnouncements(courseId: string) {
  const { data, isLoading, error, revalidate } = useAPIFetch<Announcement[]>(
    `announcements?context_codes[]=course_${courseId}&start_date=2000-01-01&end_date=2100-01-01`,
  );

  // Transform API response
  const announcements =
    data?.map((announcement) => ({
      id: announcement.id,
      title: announcement.title,
      html_url: announcement.html_url,
      user_name: announcement.user_name,
      last_reply_at: announcement.last_reply_at,
    })) || [];

  return { announcements, isLoading, error, revalidate };
}
