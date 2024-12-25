import { useGraphQLFetch } from "./useGraphQLFetch";

export interface CoursesResponse {
  allCourses: Course[];
}

export interface Course {
  _id: string;
  courseCode: string;
  name: string;
  dashboardCard: {
    isFavorited: boolean;
    published: boolean;
  };
}

export function useCourses() {
  const query = `
    query MyQuery {
      allCourses {
        _id
        courseCode
        name
        dashboardCard {
          isFavorited
          published
        }
      }
    }
  `;

  const { data, isLoading, error, revalidate } = useGraphQLFetch<CoursesResponse>(query);

  const sortedCourses = data?.allCourses?.sort((a, b) => {
    const aFavorited = a.dashboardCard.isFavorited ? 1 : 0;
    const bFavorited = b.dashboardCard.isFavorited ? 1 : 0;

    const aPublished = a.dashboardCard.published ? 1 : 0;
    const bPublished = b.dashboardCard.published ? 1 : 0;

    if (aFavorited !== bFavorited) {
      return bFavorited - aFavorited;
    }
    if (aPublished !== bPublished) {
      return bPublished - aPublished;
    }
    return 0;
  });

  return { data: { allCourses: sortedCourses }, isLoading, error, revalidate };
}
