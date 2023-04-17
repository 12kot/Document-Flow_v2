import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HandleMessage = (text, type) => {
  text = text.message ? text.message.trim() : text.trim();

  if (text.startsWith("Firebase")) text = text.slice(17, text.length - 2);

  switch (text) {
    case "auth/email-already-in-use":
    case "auth/email-already-exists":
      text = "Почта занята другим пользователем";
      break;

    case "auth/invalid-email":
      text = "Почта введена неверно. Проверьте правильность введённых данных";
      break;
    case "auth/user-not-found":
      text = "Пользователь не найден";
      break;
    case "auth/wrong-password":
      text = "Введены неверные данные. Проверьте правильность введённых данных";
      break;

    default:
      break;
  }

  let notify;

  if (type === "success") notify = () => toast.success(text);
  else if (type === "info") notify = () => toast.info(text);
  else notify = () => toast.error(text);

  notify();
};

export default HandleMessage;
