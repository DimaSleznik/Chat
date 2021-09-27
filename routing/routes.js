import { path } from "../constans";
import { LoginForm, ChatSpace } from "../Components";

export const publicRoutes = [
  {
    path: path.LOGIN_ROUTE,
    Component: LoginForm,
  },
];
export const privateRoutes = [
  {
    path: path.CHAT_ROUTE,
    Component: ChatSpace,
  },
];
