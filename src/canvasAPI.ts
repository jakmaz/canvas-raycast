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

// Specific fetch hook for favorited courses
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

  // Use the FavoritedCoursesResponse type as the generic type
  return useGraphQLFetch<FavoritedCoursesResponse>(query);
}
