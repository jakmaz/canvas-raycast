import { ActionPanel, Action, List } from "@raycast/api";
import { ActivityItem, useActivityStream } from "./hooks/useAnnouncments";

export default function FeedCommand() {
  const { activities, isLoading, error } = useActivityStream();

  if (error) {
    return <List isLoading={false} searchBarPlaceholder="Error fetching activity stream..." />;
  }

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Search activities...">
      {activities.map((activity: ActivityItem) => (
        <List.Item
          key={activity.id}
          title={activity.title}
          subtitle={activity.type}
          accessories={[{ text: activity.formattedCreatedAt }]}
          actions={
            <ActionPanel>
              <Action.OpenInBrowser title="Open Activity" url={activity.htmlUrl} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
