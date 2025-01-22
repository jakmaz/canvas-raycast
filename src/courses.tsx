import { ActionPanel, Action, Icon, List, Color, useNavigation, showToast, Toast } from "@raycast/api";
import CoursePages from "./course-pages";
import { Course, useCourses } from "./hooks/useCourses";

export default function CoursesCommand() {
  const { isLoading, data, error } = useCourses();
  const { push } = useNavigation();

  if (error) {
    showToast(Toast.Style.Failure, "Failed to fetch courses", error.message);
  }

  // Function to determine the icon and color based on course properties
  function getIconAndColor(course: Course) {
    if (!course.published) {
      return { source: Icon.WrenchScrewdriver, tintColor: Color.Orange };
    }
    if (course.isFavorite) {
      return { source: Icon.Star, tintColor: Color.Yellow };
    }
    return { source: Icon.Book, tintColor: Color.Green };
  }

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Search courses...">
      {data?.map((course: Course) => {
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
                  title="View More"
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
