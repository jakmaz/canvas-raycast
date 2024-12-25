import { Detail } from "@raycast/api";

export default function CourseModules({ course }: { course: { name: string; _id: string } }) {
  return <Detail markdown={`# Modules for ${course.name}\n\nComing Soon...`} />;
}
