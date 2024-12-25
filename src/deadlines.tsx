import { Detail } from "@raycast/api";

export default function DeadlinesCommand({ course }: { course: { name: string; _id: string } }) {
  return <Detail markdown={`# Announcements for ${course.name}\n\nComing Soon...`} />;
}
