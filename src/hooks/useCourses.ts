import { useAPIFetch } from "./useCanvasFetch"; // Assuming this handles API requests

export interface Course {
  id: string;
  courseCode: string;
  name: string;
  isFavorite: boolean;
  published: boolean; // Published state
}

export function useCourses() {
  const endpoint = "courses?state[]=unpublished&state[]=available&include[]=favorites&per_page=100";

  const { data, isLoading, error, revalidate } = useAPIFetch<Course[]>(endpoint);

  // Process and map the courses
  const processedCourses =
    data?.map((course: any) => ({
      id: course.id.toString(),
      courseCode: course.course_code,
      name: course.name,
      isFavorite: course.is_favorite,
      published: course.workflow_state === "available", // Published only if "available"
    })) || [];

  // Sort Courses:
  const sortedCourses = [...processedCourses].sort((a, b) => {
    if (a.isFavorite !== b.isFavorite) {
      return b.isFavorite ? 1 : -1; // Favorite should be first
    }
    if (a.published !== b.published) {
      return b.published ? 1 : -1; // Published should be next
    }
    return 0;
  });

  console.log("Sorted Courses:", sortedCourses); // Debugging

  return { data: sortedCourses, isLoading, error, revalidate };
}
