import { api } from "../../app/serverApi";

const resultApi = api.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useGetAllResultsQuery } = resultApi;
