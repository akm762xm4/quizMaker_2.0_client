import { api } from "../../app/serverApi";

const resultApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAvailableQuizzes: builder.query<Quiz[], void>({
      query: () => `/student/quizzes`,
      providesTags: ["quiz"],
    }),
    getAllResults: builder.query<Result[], void>({
      query: () => "/student/resultAdm",
      providesTags: ["result"],
    }),
  }),
});

export interface Result {
  _id: string;
  studentId: {
    _id: string;
    username: string;
  };
  quizId: {
    _id: string;
    title: string;
  };
  score: number;
  totalMarks: number;
  attemptedOn: Date;
}

interface Quiz {
  _id: string;
  title: string;
  questions: {
    text: string;
    options: string[];
    correctOption: number;
  }[];
  maxTime: number;
  enabled: boolean;
  createdBy: {
    _id: string;
    username: string;
  };
}

export const { useGetAvailableQuizzesQuery, useGetAllResultsQuery } = resultApi;
