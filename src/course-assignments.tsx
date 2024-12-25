import { Detail } from "@raycast/api";

export default function CourseAssignments({ course }: { course: { name: string; courseCode: string } }) {
  return <Detail markdown={`# Assignments for ${course.name}\n\nComing Soon...`} />;
}
