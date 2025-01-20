import { useGraphQLFetch } from "./useCanvasFetch";

export interface CourseAssignmentsResponse {
  course: {
    name: string;
    assignmentsConnection: {
      nodes: Assignment[];
    };
  };
}

export interface Assignment {
  name: string;
  dueAt: string | null; // `null` means no due date
  submissionsConnection: {
    nodes: Submission[];
  };
}

export interface Submission {
  state: string;
  submissionStatus: string;
}

export function useCourseAssignments(courseId: string) {
  const query = `
    query MyQuery {
      course(id: "${courseId}") {
        name
        assignmentsConnection {
          nodes {
            name
            dueAt
            submissionsConnection {
              nodes {
                state
                submissionStatus
              }
            }
          }
        }
      }
    }
  `;

  const { data, isLoading, error, revalidate } = useGraphQLFetch<CourseAssignmentsResponse>(query);

  // Sort assignments by due date
  const sortedAssignments =
    data?.course.assignmentsConnection.nodes.sort((a, b) => {
      if (a.dueAt === null) return 1; // `null` due dates go to the end
      if (b.dueAt === null) return -1;
      return new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime();
    }) || [];

  return {
    data: {
      ...data,
      course: {
        ...data?.course,
        assignmentsConnection: {
          nodes: sortedAssignments,
        },
      },
    },
    isLoading,
    error,
    revalidate,
  };
}
