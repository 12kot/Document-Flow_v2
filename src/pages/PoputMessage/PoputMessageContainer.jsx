//не работает

import React from "react";
import PoputMessage from "./PoputMessage";
import { useSelector } from "react-redux";

const PoputMessageContainer = () => {
    const messages = useSelector((state) => state.messages.messages);
    
    const getMessages = () => {
        if (!messages) return <></>;
        if (messages.length === 0) return <></>;

        return messages.map((message) => <PoputMessage message={message.text} type={message.type} id={message.id} key={message.id} />);
    }

    return (<div>{getMessages()}</div>);
}

export default PoputMessageContainer;