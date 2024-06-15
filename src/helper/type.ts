/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserCredential } from "firebase/auth";

// profile Type
export type ProfileType = {
  email: string;
  profileImage: string;
  fullName: string;
  createdAt: string;
  role: string;
  isVerified: string;
  _id: string;
};
// News Types
export type CommentType = {
  _id: string;
  commentImage: string;
  commentText: string;
  profileId: ProfileType;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export type NewsIdType = {
  other_info: {
    is_today_pick: boolean;
    is_tranding: boolean;
  };
  author: AuthorType;
  _id: string;
  like: number;
  title: string;
  thumbnail_url: string;
  details: string;
  comments: CommentType[];
  category: string;
  createdAt: string;
  updatedAt: string;
  profileId: ProfileType;
  __v: number;
};

type AuthorType = {
  name: string;
  image: string;
  publishDate: string;
};

export type NewsType = {
  other_info: {
    is_today_pick: boolean;
    is_tranding: boolean;
  };
  author: AuthorType;
  _id: string;
  like: number;
  title: string;
  thumbnail_url: string;
  details: string;
  comments: CommentType[];
  profileId: ProfileType;
  status: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  newsId: NewsIdType;
};

export type NewsPayloadType = {
  success: boolean;
  message: string;
  payload: NewsType[];
};

// Date Types

export type DateTimeFormatOptions = {
  month?: "long" | "numeric" | "2-digit" | "short" | "narrow";
  day?: "numeric" | "2-digit";
  hour?: "numeric" | "2-digit";
  minute?: "numeric" | "2-digit";
  hour12?: boolean;
};

// Comment Types

export type commentFormValuType = {
  commentText: string;
};

// Registation form types

export type RegistationTypes = {
  fullname: string;
  email: string;
  password: string;
};

export type LoginTypes = {
  email: string;
  password: string;
};
// AuthcontextType
export type AuthContextType = {
  user: AuthUser | any;
  googleUserLogin: () => Promise<UserCredential>;
  registerUser: (email: string, password: string) => Promise<UserCredential>;
  loginUser: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  loading: boolean;
};

// USer Type

// AuthUser
export type AuthUser = {
  uid: string;
  email: string | null | undefined;
  emailVerified: boolean;
  displayName: string | null | undefined;
  photoURL: string | null | undefined;
};

// AuthcontextType
export type AuthInformation = {
  loading: boolean;
  user: AuthUser | null;
  googleUserLogin: () => Promise<UserCredential>;
  logOut: () => Promise<void>;
  registerUser: (
    email: string,
    password: string
  ) => Promise<UserCredential> | null;
  loginUser: (email: string, password: string) => Promise<UserCredential>;
};

// cateogry Types

export type categoriesType = {
  _id: string;
  name: string;
  slug: string;
};

// reactType

export type ReactType = {
  profileId: ProfileType;
  newsId: string;
  react: string;
};
