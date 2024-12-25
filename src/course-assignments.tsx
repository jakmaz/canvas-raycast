import { useState } from "react";
import { Color, Icon, List, showToast, Toast } from "@raycast/api";
import { useCourseAssignments } from "./hooks/useCourseAssignments";

export default function CourseAssignments({ course }: { course: { name: string; _id: string } }) {
  const { isLoading, data, error } = useCourseAssignments(course._id);

  const [filter, setFilter] = useState<string>("upcoming"); // Filter state

  if (error) {
    showToast(Toast.Style.Failure, "Failed to fetch assignments", error.message);
  }

  // Function to determine the icon based on assignment properties
  function getIcon(assignment: { dueAt: string | null; submissionsConnection: { nodes: any[] } }) {
    const dueDate = assignment.dueAt ? new Date(assignment.dueAt) : null;
    const isDueSoon = dueDate && dueDate.getTime() - Date.now() <= 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

    // Determine if there is a valid submission
    const hasSubmission = assignment.submissionsConnection.nodes.some(
      (submission) => submission.submissionStatus === "submitted",
    );

    if (hasSubmission) {
      return { source: Icon.Checkmark, tintColor: Color.Green }; // Checkmark for submitted assignments
    }
    if (isDueSoon) {
      return { source: Icon.Clock, tintColor: Color.Orange }; // Clock for assignments due soon
    }
    return { source: Icon.Document, tintColor: Color.Blue }; // Default icon
  }

  // Filter assignments
  const now = new Date();
  const assignments = data?.course.assignmentsConnection.nodes
    .map((assignment) => {
      const dueDate = assignment.dueAt ? new Date(assignment.dueAt) : null;
      const dueAt = dueDate ? dueDate.toLocaleDateString() : "No due date";

      return {
        name: assignment.name,
        dueAt,
        dueDate,
        icon: getIcon(assignment),
      };
    })
    .filter((assignment) => {
      if (filter === "upcoming") {
        return assignment.dueDate && assignment.dueDate > now; // Due dates in the future
      }
      if (filter === "past") {
        return assignment.dueDate && assignment.dueDate <= now; // Due dates in the past
      }
      return true; // Show all if no filter
    });

  return (
    <List
      isLoading={isLoading}
      searchBarPlaceholder="Search assignments..."
      searchBarAccessory={
        <List.Dropdown tooltip="Filter Assignments" storeValue onChange={(newValue) => setFilter(newValue)}>
          <List.Dropdown.Item title="Upcoming Assignments" value="upcoming" />
          <List.Dropdown.Item title="Past Assignments" value="past" />
          <List.Dropdown.Item title="All Assignments" value="all" />
        </List.Dropdown>
      }
    >
      {assignments?.map((assignment, index) => (
        <List.Item key={index} icon={assignment.icon} title={assignment.name} subtitle={assignment.dueAt} />
      ))}
    </List>
  );
}
