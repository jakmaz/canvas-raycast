import { Detail } from "@raycast/api";

export default function CourseAnnouncements({ course }: { course: { name: string; courseCode: string } }) {
  return <Detail markdown={`# Announcements for ${course.name}\n\nComing Soon...`} />;
}
