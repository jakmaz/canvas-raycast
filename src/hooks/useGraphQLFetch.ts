import { useFetch } from "@raycast/utils";
import { getPreferenceValues } from "@raycast/api";

interface Preferences {
  canvasUrl: string;
  accessToken: string;
}

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
