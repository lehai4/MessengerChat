export interface User {
  _id: string;
  phone: string;
  password: string;
  name: string;
  active: boolean;
  avatar: string;
}
export interface currentUserProps {
  user: User | null | undefined;
  accessToken: string;
}
export interface PropLogin {
  currentUser: currentUserProps | null;
  isFetching: boolean;
  error: boolean;
}
export interface PropLogOut {
  isFetching: boolean;
  error: boolean;
}
export interface Option {
  value: string;
  label: string;
}
