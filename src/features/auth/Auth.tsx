import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Profile from "./Profile";
import Sign from "./Sign";

export default function Auth() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return <div>{isAuthenticated ? <Profile /> : <Sign />}</div>;
}
