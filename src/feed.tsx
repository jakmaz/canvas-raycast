import { useState } from "react";
import { Action, ActionPanel, List } from "@raycast/api";

interface Announcement {
  title: string;
  date: string;
  id: string;
  content: string;
}

const announcements: Announcement[] = [
  {
    title: "Welcome to the Course",
    date: "2024-01-01",
    id: "001",
    content: "This is the first announcement to welcome you to the course! We are excited to have you onboard.",
  },
  {
    title: "Assignment Deadline Extended",
    date: "2024-01-10",
    id: "002",
    content:
      "Good news! The deadline for the first assignment has been extended by one week. Please check the details in the assignments section.",
  },
  {
    title: "New Module Released",
    date: "2024-01-15",
    id: "003",
    content: "We have just released a new module covering advanced topics. Make sure to check it out!",
  },
];

export default function AnnouncementsCommand() {
  const [showingDetail, setShowingDetail] = useState(true);

  return (
    <List isShowingDetail={showingDetail}>
      {announcements.map((announcement) => {
        const props: Partial<List.Item.Props> = showingDetail
          ? {
              detail: (
                <List.Item.Detail
                  markdown={`# ${announcement.title}\n\n**Date:** ${announcement.date}\n\n${announcement.content}`}
                />
              ),
            }
          : {
              accessories: [{ text: announcement.date }],
            };
        return (
          <List.Item
            key={announcement.id}
            title={announcement.title}
            subtitle={announcement.date}
            {...props}
            actions={
              <ActionPanel>
                <Action title="Toggle Detail" onAction={() => setShowingDetail(!showingDetail)} />
              </ActionPanel>
            }
          />
        );
      })}
    </List>
  );
}
