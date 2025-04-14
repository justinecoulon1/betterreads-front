export type RegisterStateForm = {
  error?: {
    name?: string[];
    email?: string[];
    passwordForm?: string[];
  };
  name?: string;
  email?: string;
};

export type LoginStateForm = {
  error?: {
    email?: string;
    password?: string;
    err?: string;
  };
  email?: string;
};
