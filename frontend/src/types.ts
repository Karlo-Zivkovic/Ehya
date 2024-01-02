export type SignupType = {
  name: string;

  passwordConfirm: string;
} & LoginType;

export type LoginType = {
  email: string;
  password: string;
};
export type UserType = {
  _id: string;
  name: string;
  photo: string;
  email:string
};
export type ArticleType = {
  _id: string;
  id: string;
  title: string;
  photo: string;
  caption: string;
  createdAt: string;
  updatedAt: Date;
  user: UserType;
  slug: string;
};

export type CreateCommentType = {
  slug: string | undefined;
  token: string;
  desc: string;
  parent: string | null;
};

export type CommentType = {
  article: string;
  createdAt: string;
  desc: string;
  id: string;
  parent: string | null;
  updatedAt: string;
  user: { name: string; photo: string; _id: string };
  _id: string;
};

export type ReplyCommentType = CommentType & {
  parent: CommentType;
};

export type UserSettingsType = {
  name: string;
  email: string;
};

