import Form from "./Form";
import { useDispatch, useSelector } from "react-redux";
import { changeEmail, changePass } from "../../../store/slices/authSlice";

const FormContainer = (props) => {
  const dispatch = useDispatch();
  const { email, password } = useSelector((state) => state.auth);

  const setEmail = (text) => {
    dispatch(changeEmail({ text }));
  };

  const setPass = (text) => {
    dispatch(changePass({ text }));
  };

  return (
    <Form
      title={props.title}
      handleClick={props.handleClick}
      isLoading={props.isLoading}
          
      email={email}
      setEmail={setEmail}
      pass={password}
      setPass={setPass}
          
      repeatPass={props.repeatPass}
      setRepeatPass={props.setRepeatPass}
    />
  );
};

export default FormContainer;
