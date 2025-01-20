import { ActionPanel, Action, List, Icon, Color } from "@raycast/api";
import { Assignment, useDeadlines } from "./hooks/useDeadlines";

export default function DeadlinesCommand() {
  const { assignments, isLoading, error } = useDeadlines();

  if (error) {
    return <List isLoading={false} searchBarPlaceholder="Error fetching assignments..." />;
  }

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Search assignments...">
      {assignments.map((assignment: Assignment) => (
        <List.Item
          key={assignment.id}
          title={assignment.title}
          subtitle={assignment.contextName}
          accessories={[{ text: assignment.formattedDueAt }]}
          icon={getIcon(assignment)}
          actions={
            <ActionPanel>
              <Action.OpenInBrowser title="Open in Browser" url={assignment.htmlUrl} />
              <Action.CopyToClipboard title="Copy Assignment Link" content={assignment.htmlUrl} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}

/**
 * Determine the icon based on due date.
 */
function getIcon(assignment: Assignment) {
  const dueDate = assignment.dueAt ? new Date(assignment.dueAt) : null;
  const isDueSoon = dueDate && dueDate.getTime() - Date.now() <= 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

  if (isDueSoon) {
    return { source: Icon.Clock, tintColor: Color.Orange }; // Due soon: Yellow clock
  }
  return { source: Icon.Document, tintColor: Color.Blue }; // Default: Blue document
}
