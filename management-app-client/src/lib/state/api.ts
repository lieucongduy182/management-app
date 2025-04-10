import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ApiResponse,
  Project,
  SearchResults,
  Task,
  Team,
  User,
} from "@/lib/types";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["Projects", "Tasks", "Users", "Teams"],
  endpoints: (builder) => ({
    getProjects: builder.query<ApiResponse<Project[]>, void>({
      query: () => "projects",
      providesTags: ["Projects"],
    }),
    createProject: builder.mutation<ApiResponse<Project>, Partial<Project>>({
      query: (newProject) => ({
        url: "projects",
        method: "POST",
        body: newProject,
      }),
      invalidatesTags: ["Projects"],
    }),
    getTasks: builder.query<ApiResponse<Task[]>, { projectId: number }>({
      query: ({ projectId }) => `tasks/${projectId}`,
      providesTags: (result) =>
        result
          ? result.data.map(({ id }) => ({ type: "Tasks" as const, id }))
          : [{ type: "Tasks" as const }],
    }),
    getTasksByUserId: builder.query<ApiResponse<Task[]>, { userId: number }>({
      query: ({ userId }) => `tasks/user/${userId}`,
      providesTags: (result) =>
        result
          ? result.data.map(({ id }) => ({ type: "Tasks" as const, id }))
          : [{ type: "Tasks" as const }],
    }),
    createTask: builder.mutation<ApiResponse<Task>, Partial<Task>>({
      query: (newTask) => ({
        url: "tasks",
        method: "POST",
        body: newTask,
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTaskStatus: builder.mutation<
      ApiResponse<Task>,
      { taskId: number; status: string }
    >({
      query: ({ taskId, status }) => ({
        url: "tasks/status",
        method: "PATCH",
        body: { taskId, status },
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: "Tasks", id: taskId },
      ],
    }),
    search: builder.query<ApiResponse<SearchResults>, string>({
      query: (query) => `search/?query=${query}`,
    }),
    getUsers: builder.query<ApiResponse<User[]>, void>({
      query: () => "users",
      providesTags: ["Users"],
    }),
    getTeams: builder.query<ApiResponse<Team[]>, void>({
      query: () => "teams",
      providesTags: ["Teams"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskStatusMutation,
  useSearchQuery,
  useGetUsersQuery,
  useGetTeamsQuery,
  useGetTasksByUserIdQuery,
} = api;
