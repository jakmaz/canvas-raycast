import { useGraphQLFetch } from "./useGraphQLFetch";

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
  dueAt: string | null;
  submissionsConnection: {
    nodes: Submission[];
  };
}

export interface Submission {
  state: string;
  submittedAt: string;
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
                submittedAt
              }
            }
          }
        }
      }
    }
  `;

  return useGraphQLFetch<CourseAssignmentsResponse>(query);
}
