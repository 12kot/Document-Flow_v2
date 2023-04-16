const HandleMessage = (text, type) => {
  let mes = type ? "Успех!\n" : "Неудача :(\n";
  text = text.message ? text.message.trim() : text.trim();

  if (text.startsWith("Firebase")) text = text.slice(17, text.length - 2);
  
  switch (text) {
    case "auth/email-already-in-use":
    case "auth/email-already-exists":
      mes += "Почта занята другим пользователем";
      break;
    
    case "auth/invalid-email":
      mes += "Почта введена неверно. Проверьте правильность введённых данных";
      break;
    case "auth/user-not-found":
      mes += "Пользователь не найден";
      break;
    case "auth/wrong-password":
      mes += "Введены неверные данные. Проверьте правильность введённых данных";
      break;

    default:
      mes += text;
      break;
  }

  alert(mes);
};

export default HandleMessage;
