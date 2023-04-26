import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import HandleMessage from "../../functions/HandleMessage";

const forgot = async (email: string): Promise<void> => {
  if (!email) {
    HandleMessage("Поле не может быть пустым", "error");
    return;
  }

  const auth = getAuth();

  await sendPasswordResetEmail(auth, email)
    .then(() => {
      HandleMessage("Отправили письмо c инструкциями на почту", "info");
    })
    .catch((error) => {
      HandleMessage(error, "info");
    });
};

export default forgot;
