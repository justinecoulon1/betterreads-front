export type ReviewAddFormFields = {
  commentary?: string;
  score?: string;
};

export type ReviewAddStateForm = ReviewAddFormFields & {
  bookId?: number;
  errors?: ReviewAddFormFields & { serverError?: string };
};
