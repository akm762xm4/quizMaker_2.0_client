import { api } from "../../app/serverApi";

const quizApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllQuizzes: builder.query<Quiz[], void>({
      query: () => "/quiz/all",
      providesTags: ["quiz"],
    }),

    deleteQuiz: builder.mutation<void, string | undefined>({
      query: (quizId: string) => ({
        url: `/quiz/${quizId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["quiz"],
    }),
  }),
});

export interface Quiz {
  _id: string;
  title: string;
  questions: string[];
  maxTime: number;
  enabled: boolean;
  createdBy: {
    _id: string;
    username: string;
  };
}

export const { useGetAllQuizzesQuery, useDeleteQuizMutation } = quizApi;
