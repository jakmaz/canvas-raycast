import { List, ActionPanel, Action, Icon, showToast, Toast } from "@raycast/api";
import { useCourseAnnouncements } from "./hooks/useCourseAnnouncements";

export default function CourseAnnouncements({ course }: { course: { name: string; id: string } }) {
  const { announcements, isLoading, error } = useCourseAnnouncements(course.id);

  if (error) {
    showToast(Toast.Style.Failure, "Failed to fetch announcements", error.message);
  }

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Search announcements...">
      <List.Section title={`Announcements for ${course.name}`}>
        {announcements.map((announcement) => (
          <List.Item
            key={announcement.id}
            title={announcement.title}
            subtitle={`By ${announcement.userName}`}
            icon={Icon.Megaphone} // 📢 Always a Megaphone
            accessories={[{ text: announcement.formatedCreatedAt }]}
            actions={
              <ActionPanel>
                <Action.OpenInBrowser title="Open in Browser" url={announcement.htmlUrl} />
                <Action.CopyToClipboard title="Copy Link" content={announcement.htmlUrl} />
              </ActionPanel>
            }
          />
        ))}
      </List.Section>
    </List>
  );
}
