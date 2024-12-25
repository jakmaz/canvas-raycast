import { Color, Icon, List, showToast, Toast } from "@raycast/api";
import { useCourseAssignments } from "./hooks/useCourseAssignments";

export default function CourseAssignments({ course }: { course: { name: string; _id: string } }) {
  console.log(course._id);
  const { isLoading, data, error } = useCourseAssignments(course._id);

  if (error) {
    showToast(Toast.Style.Failure, "Failed to fetch courses", error.message);
  }

  // Extract assignments with dueAt information
  const assignments = data?.course.assignmentsConnection.nodes.map((assignment) => {
    const dueAt = assignment.dueAt ? new Date(assignment.dueAt).toLocaleDateString() : "No due date";
    return { name: assignment.name, dueAt };
  });

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Search assignments...">
      {assignments?.map((assignment, index) => (
        <List.Item
          key={index}
          icon={{ source: Icon.Document, tintColor: Color.Blue }}
          title={assignment.name}
          subtitle={assignment.dueAt}
        />
      ))}
    </List>
  );
}
