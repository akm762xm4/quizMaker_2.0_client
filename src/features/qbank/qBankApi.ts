import { api } from "../../app/serverApi";
import { SuccessResponse } from "../../types";

const qBankApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllQBanks: builder.query<IQBank[], void>({
      query: () => "/qbank",
      providesTags: ["qBank"],
    }),
    getQBankById: builder.query<IQBank, string | undefined>({
      query: (qBankId) => `/qbank/${qBankId}`,
      providesTags: ["qBank", "question"],
    }),
    deleteQBank: builder.mutation<void, string | undefined>({
      query: (qBankId) => ({
        url: `/qBank/${qBankId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["qBank", "question"],
    }),
    createQBank: builder.mutation<SuccessResponse, AddQBankFormI>({
      query: (body) => ({
        url: `/qbank`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["qBank"],
    }),
    renameQBank: builder.mutation({
      query: ({ qBankId, body }) => ({
        url: `/qbank/${qBankId}`,
        body,
        method: "PUT",
      }),
      invalidatesTags: ["qBank"],
    }),
    // getQuestions: builder.query<QuestionI, string | undefined>({
    //   query: (qBankId) => `qbank/getQuestions/${qBankId}`,
    //   providesTags: ["quiz", "question"],
    // }),
    addQuestion: builder.mutation<SuccessResponse, any>({
      query: ({ qBankId, body }) => ({
        url: `/qbank/addQuestion/${qBankId}`,
        body,
        method: "POST",
      }),
      invalidatesTags: ["qBank", "quiz", "question"],
    }),
    removeQuestion: builder.mutation({
      query: ({ qBankId, questionId }) => ({
        url: `/qbank/removeQuestion/${qBankId}/${questionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["quiz", "question"],
    }),
    updateQuestion: builder.mutation({
      query: ({ questionId, patch }) => ({
        url: `/qbank/updateQuestion/${questionId}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["quiz", "question"],
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

export interface AddQBankFormI {
  title: string;
}

export interface QuestionI {
  _id: string;
  text: string;
  options: string[];
  correctOption: number;
  category: string;
}

export interface AddQuestionI {
  text: string;
  category: string;
  correctOption: number | string;
  op1: string;
  op2: string;
  op3: string;
  op4: string;
  options?: string[];
}

export const {
  useGetAllQBanksQuery,
  useGetQBankByIdQuery,
  useDeleteQBankMutation,
  useCreateQBankMutation,
  useRenameQBankMutation,
  // useGetQuestionsQuery,
  useAddQuestionMutation,
  useRemoveQuestionMutation,
  useUpdateQuestionMutation,
} = qBankApi;
