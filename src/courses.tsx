import { ActionPanel, Action, Icon, List, Color, useNavigation, showToast, ToastStyle } from "@raycast/api";
import { useFavoritedCourses } from "./canvasAPI";
import CoursePages from "./course-pages";

export default function Command() {
  const { isLoading, data, error } = useFavoritedCourses();
  const { push } = useNavigation();

  if (error) {
    showToast(ToastStyle.Failure, "Failed to fetch courses", error.message);
  }

  // Function to determine the icon and color based on course properties
  function getIconAndColor(course: { dashboardCard: { isFavorited: boolean; published: boolean } }) {
    if (course.dashboardCard.isFavorited) {
      return { source: Icon.Star, tintColor: Color.Yellow }; // Yellow star for favorited
    } else if (!course.dashboardCard.published) {
      return { source: Icon.Clock, tintColor: Color.SecondaryText }; // Default color for unpublished
    } else {
      return { source: Icon.Book, tintColor: Color.Green }; // Green book for published
    }
  }

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Search courses...">
      {data?.allCourses?.map((course) => {
        const icon = getIconAndColor(course);
        return (
          <List.Item
            key={course.courseCode}
            icon={icon}
            title={course.name || "Untitled Course"}
            subtitle={course.courseCode || "No course code"}
            actions={
              <ActionPanel>
                <Action
                  title="View Course Pages"
                  onAction={() => push(<CoursePages course={course} />)} // Navigate to CoursePages
                />
              </ActionPanel>
            }
          />
        );
      })}
    </List>
  );
}
