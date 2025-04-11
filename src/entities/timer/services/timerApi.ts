import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Task, Timer } from './types';

export interface TasksResponse {
  tasks: Task[];
  total: number;
}

export const timerApi = createApi({
  reducerPath: 'timerApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  tagTypes: ['Tasks', 'Timers', 'User'],
  endpoints: (builder) => ({
    getUser: builder.query<string, void>({
      query: () => 'user',
      providesTags: ['User'],
    }),
    getTasks: builder.query<TasksResponse, string>({
      query: (userId) => `tasks?userId=${userId}`,
      providesTags: ['Tasks'],
    }),
    addTask: builder.mutation<Task, { title: string; userId: string }>({
      query: (data) => ({
        url: 'tasks',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Tasks'],
    }),
    updateTask: builder.mutation<Task, { id: string; updates: Partial<Task> }>({
      query: ({ id, updates }) => ({
        url: 'tasks',
        method: 'PATCH',
        body: { id, ...updates },
      }),
      invalidatesTags: ['Tasks'],
    }),
    removeTask: builder.mutation<void, string>({
      query: (id) => ({
        url: 'tasks',
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: ['Tasks'],
    }),
    editTaskTitle: builder.mutation<void, { id: string; title: string }>({
      query: ({ id, title }) => ({
        url: 'tasks',
        method: 'PATCH',
        body: { id, title },
      }),
      invalidatesTags: ['Tasks'],
    }),
    startTimer: builder.mutation<
      Timer,
      { taskId: string | null; duration: number; type: 'work' | 'pause'; userId: string }
    >({
      query: (data) => ({
        url: 'timer',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Tasks', 'Timers'],
    }),
    pauseTimer: builder.mutation<void, string>({
      query: (timerId) => ({
        url: 'timer',
        method: 'PATCH',
        body: { id: timerId, action: 'pause' },
      }),
      invalidatesTags: ['Timers'],
    }),
    resumeTimer: builder.mutation<void, string>({
      query: (timerId) => ({
        url: 'timer',
        method: 'PATCH',
        body: { id: timerId, action: 'resume' },
      }),
      invalidatesTags: ['Timers'],
    }),
    skipTimer: builder.mutation<void, string>({
      query: (timerId) => ({
        url: 'timer',
        method: 'PATCH',
        body: { id: timerId, action: 'skip' },
      }),
      invalidatesTags: ['Timers'],
    }),
    completeTimer: builder.mutation<void, string>({
      query: (timerId) => ({
        url: 'timer',
        method: 'PATCH',
        body: { id: timerId, action: 'complete' },
      }),
      invalidatesTags: ['Timers'],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useRemoveTaskMutation,
  useEditTaskTitleMutation,
  useStartTimerMutation,
  usePauseTimerMutation,
  useResumeTimerMutation,
  useSkipTimerMutation,
  useCompleteTimerMutation,
} = timerApi;
