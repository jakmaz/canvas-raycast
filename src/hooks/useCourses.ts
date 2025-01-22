import { useAPIFetch } from "./useCanvasFetch";

interface CourseResponse {
  id: number;
  course_code: string;
  name: string;
  is_favorite: boolean;
  workflow_state: string;
}

/**
 * Fetch and process courses.
 */
export function useCourses() {
  const endpoint = "courses?state[]=unpublished&state[]=available&include[]=favorites&per_page=100";

  const { data, isLoading, error, revalidate } = useAPIFetch<CourseResponse[]>(endpoint);

  const courses =
    data?.map((course) => ({
      id: course.id.toString(),
      courseCode: course.course_code,
      name: course.name,
      isFavorite: course.is_favorite,
      published: course.workflow_state === "available",
    })) || [];

  const sortedCourses = courses.sort((a, b) => {
    if (a.isFavorite !== b.isFavorite) return b.isFavorite ? 1 : -1;
    if (a.published !== b.published) return b.published ? 1 : -1;
    return 0;
  });

  return { data: sortedCourses, isLoading, error, revalidate };
}
