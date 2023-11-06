interface User {
  _id: string;
  phone: string;
  password: string;
  name: string;
  active: boolean;
  avatar: base64string;
}
interface currentUserProps {
  user: User | null | undefined;
  accessToken: string;
}
interface PropLogin {
  currentUser: currentUserProps | null;
  isFetching: boolean;
  error: boolean;
}
interface PropLogOut {
  isFetching: boolean;
  error: boolean;
}
interface Option {
  value: string;
  label: string;
}
