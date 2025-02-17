import { api } from "../../app/serverApi";
import { getToken } from "../../utils/localStorage";

const token = getToken();

const quizApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllQuizzes: builder.query<Quiz[], void>({
      query: () => ({
        url: `/quiz/all`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export interface Quiz {
  _id: string;
  title: string;
  questions: string[];
  maxTime: number;
  enabled: boolean;
  class: string;
  subject: string;
  createdBy: string;
}

export const { useGetAllQuizzesQuery } = quizApi;
