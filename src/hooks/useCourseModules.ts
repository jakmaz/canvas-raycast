import { useAPIFetch } from "./useCanvasFetch";

interface ModuleItem {
  id: number;
  title: string;
  html_url: string;
  type: "Assignment" | "Discussion" | "File" | "Quiz" | "Page" | "SubHeader";
}

interface Module {
  id: number;
  name: string;
  items: ModuleItem[];
}

export function useCourseModules(courseId: string) {
  const { data, isLoading, error, revalidate } = useAPIFetch<Module[]>(`courses/${courseId}/modules?include[]=items`);

  // Transform API response and filter out "SubHeader" items
  const modules =
    data?.map((module) => ({
      id: module.id,
      name: module.name,
      items: module.items
        .filter((item) => item.type !== "SubHeader") // Ignore "SubHeader" items
        .map((item) => ({
          id: item.id,
          title: item.title,
          html_url: item.html_url,
          type: item.type as ModuleItem["type"], // Ensure correct type
        })),
    })) || [];

  return { modules, isLoading, error, revalidate };
}
