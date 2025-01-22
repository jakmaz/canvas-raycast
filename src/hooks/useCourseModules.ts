import { useAPIFetch } from "./useCanvasFetch";

interface ModuleItem {
  id: number;
  title: string;
  html_url: string;
  type: string;
}

interface Module {
  id: number;
  name: string;
  items: ModuleItem[];
}

/**
 * Fetch and process course modules.
 */
export function useCourseModules(courseId: string) {
  const { data, isLoading, error, revalidate } = useAPIFetch<Module[]>(`courses/${courseId}/modules?include[]=items`);

  const modules =
    data?.map((module) => ({
      id: module.id,
      name: module.name,
      items: module.items
        .filter((item) => item.type !== "SubHeader")
        .map((item) => ({
          id: item.id,
          title: item.title,
          htmlUrl: item.html_url,
          type: item.type as "Assignment" | "Discussion" | "File" | "Quiz" | "Page", // Ensuring correct type
        })),
    })) || [];

  return { modules, isLoading, error, revalidate };
}
