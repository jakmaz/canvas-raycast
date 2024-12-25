import { useFetch } from "@raycast/utils";
import { getPreferenceValues } from "@raycast/api";
import { debugConfig } from "../utils/debugConfig"; // Import the debugConfig

interface Preferences {
  domain: string;
  token: string;
}

export function useGraphQLFetch<T>(query: string) {
  const preferences = getPreferenceValues<Preferences>();

  return useFetch<T>(`https://${preferences.domain}/api/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${preferences.token}`,
    },
    body: JSON.stringify({ query }),
    parseResponse: async (response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const json = await response.json();

      if (debugConfig.printFetches) {
        console.log("Response Data:", json.data);
      }

      return json.data;
    },
  });
}
