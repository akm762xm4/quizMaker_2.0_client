import { api } from "../../app/serverApi";

const qBankApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllQuestionBanks: builder.query<IQBank[], void>({
      query: () => "/qbank",
      providesTags: ["qBank"],
    }),
    deleteQBank: builder.mutation<void, string | undefined>({
      query: (qBankId) => ({
        url: `/qBank/${qBankId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["qBank"],
    }),
  }),
});

export interface IQuestion {
  _id: string;
  text: string;
  options: string[];
  correctOption: number;
  category: string;
}

export interface IQBank {
  _id: string;
  title: string;
  questions: IQuestion[];
  createdBy: {
    _id: string;
    username: string;
  };
}

export const { useGetAllQuestionBanksQuery, useDeleteQBankMutation } = qBankApi;
