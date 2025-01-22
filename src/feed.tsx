import { ActionPanel, Action, List, showToast, Toast } from "@raycast/api";
import { ActivityItem, useActivityStream } from "./hooks/useAnnouncments";

export default function FeedCommand() {
  const { activities, isLoading, error } = useActivityStream();

  if (error) {
    showToast(Toast.Style.Failure, "Failed to fetch feed", error.message);
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
              <Action.OpenInBrowser title="Open in Browser" url={activity.htmlUrl} />
              <Action.CopyToClipboard title="Copy Activity Link" content="#1" />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
