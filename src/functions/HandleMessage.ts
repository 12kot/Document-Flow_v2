import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HandleMessage = (error: Error | string, type: string): void => {
  let errorMessage: string = error instanceof Error ? error.message : error;

  errorMessage = errorMessage.trim();
  if (errorMessage.startsWith("Firebase")) errorMessage = errorMessage.slice(17, errorMessage.length - 2);

  switch (errorMessage) {
    case "auth/email-already-in-use":
    case "auth/email-already-exists":
      errorMessage = "Почта занята другим пользователем";
      break;

    case "auth/invalid-email":
      errorMessage = "Почта введена неверно. Проверьте правильность введённых данных";
      break;
    case "auth/user-not-found":
      errorMessage = "Пользователь не найден";
      break;
    case "auth/wrong-password":
      errorMessage = "Введены неверные данные. Проверьте правильность введённых данных";
      break;

    default:
      break;
  }

  let notify;

  if (type === "success") notify = () => toast.success(errorMessage);
  else if (type === "info") notify = () => toast.info(errorMessage);
  else notify = () => toast.error(errorMessage);

  notify();
};

export default HandleMessage;
