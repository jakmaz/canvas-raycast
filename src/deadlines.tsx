import { ActionPanel, Action, List } from "@raycast/api";
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
          actions={
            <ActionPanel>
              <Action.OpenInBrowser title="Open Assignment" url={assignment.htmlUrl} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
