import { ActionPanel, Action, Icon, List, Color } from "@raycast/api";

export default function CoursePages({ course }: { course: { name: string; courseCode: string } }) {
  // Mock data for course pages
  const pages = [
    { title: "Modules", icon: Icon.List, url: `https://${course.courseCode}/modules` },
    { title: "Assignments", icon: Icon.TextDocument, url: `https://${course.courseCode}/assignments` },
  ];

  return (
    <List navigationTitle={`Pages for ${course.name}`} searchBarPlaceholder="Search course pages...">
      {pages.map((page) => (
        <List.Item
          key={page.title}
          title={page.title}
          icon={{ source: page.icon, tintColor: Color.Green }} // Same color for all icons
          actions={
            <ActionPanel>
              <Action.OpenInBrowser title={`Open ${page.title}`} url={page.url} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
