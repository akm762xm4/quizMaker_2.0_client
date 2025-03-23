import { api } from "../../app/serverApi";
import { SuccessResponse } from "../../types";

const quizApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllQuizzes: builder.query<Quiz[], void>({
      query: () => "/quiz/all",
      providesTags: ["quiz"],
    }),

    getQuizzes: builder.query<Quiz[], void>({
      query: () => `/quiz`,
      providesTags: ["quiz"],
    }),

    getQuizById: builder.query<Quiz, string | undefined>({
      query: (quizId) => `/quiz/${quizId}`,
      providesTags: ["quiz"],
    }),

    deleteQuiz: builder.mutation<void, string | undefined>({
      query: (quizId: string) => ({
        url: `/quiz/${quizId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["quiz"],
    }),
    createQuiz: builder.mutation<SuccessResponse, AddQuizFormI>({
      query: (body) => ({
        url: "/quiz",
        body,
        method: "POST",
      }),
      invalidatesTags: ["quiz"],
    }),
    updateQuiz: builder.mutation({
      query: ({ quizId, patch }) => ({
        url: `quiz/${quizId}`,
        body: patch,
        method: "PUT",
      }),
      invalidatesTags: ["quiz"],
    }),
    toggleQuiz: builder.mutation({
      query: (quizId) => ({
        url: `/quiz/${quizId}/toggle`,
        method: "PATCH",
      }),
      invalidatesTags: ["quiz"],
    }),
    addQuestions: builder.mutation({
      query: ({ quizId, questionIds }) => ({
        url: `/quiz/${quizId}/addQuestions`,
        method: "PATCH",
        body: questionIds,
      }),
      invalidatesTags: ["question", "quiz"],
    }),
    removeQuestions: builder.mutation({
      query: ({ quizId, questionIds }) => ({
        url: `/quiz/${quizId}/removeQuestions`,
        method: "PATCH",
        body: questionIds,
      }),
      invalidatesTags: ["question", "quiz"],
    }),
  }),
});

export interface Quiz {
  _id: string;
  title: string;
  questions: {
    _id: string;
    text: string;
    options: string[];
    correctOption: number;
    category: string;
  }[];
  maxTime: number;
  enabled: boolean;
  createdBy: {
    _id: string;
    username: string;
  };
}

export interface AddQuizFormI {
  title: string;
  maxTime: number;
}

export const {
  useGetAllQuizzesQuery,
  useGetQuizzesQuery,
  useGetQuizByIdQuery,
  useDeleteQuizMutation,
  useCreateQuizMutation,
  useUpdateQuizMutation,
  useToggleQuizMutation,
  useAddQuestionsMutation,
  useRemoveQuestionsMutation,
} = quizApi;
