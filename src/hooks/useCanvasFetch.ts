import { useFetch } from "@raycast/utils";
import { getPreferenceValues } from "@raycast/api";
import { debugConfig } from "../utils/debugConfig";

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
        if (response.statusText === "Unauthorized") {
          throw new Error("Unauthorized, check your token in extension settings.");
        }
        throw new Error(response.statusText);
      }

      const json = await response.json();

      if (debugConfig.printFetches) {
        console.log("Response Data:", json.data);
      }

      return json.data;
    },
  });
}

export function useAPIFetch<T>(endpoint: string) {
  const preferences = getPreferenceValues<Preferences>();

  return useFetch<T>(`https://${preferences.domain}/api/v1/${endpoint}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${preferences.token}`,
    },
    parseResponse: async (response) => {
      if (!response.ok) {
        if (response.statusText === "Unauthorized") {
          throw new Error("Unauthorized, check your token in extension settings.");
        }
        throw new Error(response.statusText);
      }

      const json = await response.json();

      if (debugConfig.printFetches) {
        console.log("API Response:", json);
      }

      return json;
    },
  });
}
