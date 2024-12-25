import { ActionPanel, Action, Icon, List, showToast, ToastStyle } from "@raycast/api";
import { useFavoritedCourses } from "./canvasAPI";

export default function Command() {
  const { isLoading, data, error, revalidate } = useFavoritedCourses();

  if (error) {
    showToast(ToastStyle.Failure, "Failed to fetch courses", error.message);
  }

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Search courses...">
      {data?.allCourses
        ?.filter((course) => course.dashboardCard?.isFavorited)
        .map((course) => (
          <List.Item
            key={course.courseCode}
            icon={Icon.Book}
            title={course.name || "Untitled Course"}
            subtitle={course.courseCode || "No course code"}
            actions={
              <ActionPanel>
                <Action.OpenInBrowser title="Open Course in Browser" url={`https://${course.courseCode}`} />
                <Action.CopyToClipboard content={course.name || "Untitled Course"} />
                <Action title="Reload" onAction={() => revalidate()} />
              </ActionPanel>
            }
          />
        ))}
    </List>
  );
}
