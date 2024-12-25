import { useFetch } from "@raycast/utils";
import { getPreferenceValues } from "@raycast/api";

interface Preferences {
  canvasUrl: string;
  accessToken: string;
}

// Define the shape of the returned data for favorited courses
export interface FavoritedCoursesResponse {
  allCourses: Array<{
    courseCode: string;
    name: string;
    dashboardCard: {
      isFavorited: boolean;
      published: boolean;
    };
  }>;
}

// Generic GraphQL fetch hook
export function useGraphQLFetch<T>(query: string) {
  const preferences = getPreferenceValues<Preferences>();

  return useFetch<T>(`https://${preferences.canvasUrl}/api/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${preferences.accessToken}`,
    },
    body: JSON.stringify({ query }),
    parseResponse: async (response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const { data } = await response.json();
      return data;
    },
  });
}

// Specific fetch hook for favorited courses with sorting logic
export function useFavoritedCourses() {
  const query = `
    query MyQuery {
      allCourses {
        courseCode
        name
        dashboardCard {
          isFavorited
          published
        }
      }
    }
  `;

  // Fetch courses using the generic GraphQL fetch hook
  const { data, isLoading, error, revalidate } = useGraphQLFetch<FavoritedCoursesResponse>(query);

  // Sort courses: Favorited first, then published, then unpublished
  const sortedCourses = data?.allCourses?.sort((a, b) => {
    const aFavorited = a.dashboardCard.isFavorited ? 1 : 0;
    const bFavorited = b.dashboardCard.isFavorited ? 1 : 0;

    const aPublished = a.dashboardCard.published ? 1 : 0;
    const bPublished = b.dashboardCard.published ? 1 : 0;

    if (aFavorited !== bFavorited) {
      return bFavorited - aFavorited; // Favorited courses first
    }
    if (aPublished !== bPublished) {
      return bPublished - aPublished; // Published courses next
    }
    return 0; // Keep original order for the rest
  });

  return { data: { allCourses: sortedCourses }, isLoading, error, revalidate };
}
