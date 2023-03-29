import React from "react";

const Form = ({
  email, setEmail, pass, setPass, repeatPass, setRepeatPass,
  title, handleClick, }) => {
  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <input
        type="password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        placeholder="password"
      />
      {setRepeatPass ? (
        <input
          type="password"
          value={repeatPass}
          onChange={(e) => setRepeatPass(e.target.value)}
          placeholder="repeat password"
        />
      ) : (
        <span />
      )}
      <button onClick={() => handleClick()}>{title}</button>
    </div>
  );
};

export default Form;
