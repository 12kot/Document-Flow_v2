import { useSelector } from "react-redux";

const useAuth = () => {
  const { email, token, id, files } = useSelector((state) => state.user);

  return {
    isAuth: !!email,
    token,
    id,
    files,
  };
};

export default useAuth;
