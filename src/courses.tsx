import { ActionPanel, Action, Icon, List, showToast, ToastStyle } from "@raycast/api";
import { useFavoritedCourses } from "./canvasAPI";

export default function Command() {
  const { isLoading, data, error, revalidate } = useFavoritedCourses();

  if (error) {
    showToast(ToastStyle.Failure, "Failed to fetch courses", error.message);
  }

  // Function to determine the icon based on course properties
  function getIcon(course: { dashboardCard: { isFavorited: boolean; published: boolean } }) {
    if (course.dashboardCard.isFavorited) {
      return Icon.Star; // Icon for favorited and published
    } else if (!course.dashboardCard.published) {
      return Icon.Clock; // Icon for favorited only
    } else {
      return Icon.Book; // Default icon for normal course
    }
  }

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Search courses...">
      {data?.allCourses?.map((course) => (
        <List.Item
          key={course.courseCode}
          icon={getIcon(course)}
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
