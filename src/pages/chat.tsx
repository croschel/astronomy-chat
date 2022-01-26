import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React, { KeyboardEvent, useState } from "react";
import { MdSend } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import appConfig from "../config.json";
import { BACKGROUND_IMAGE } from "../constants/general";
import { messages } from "../mocks/message";

export default function ChatPage() {
  const [inputMessage, setInputMessage] = useState<string>("");
  const [messagesList, setMessagesList] = useState<Message[]>(messages);
  const handleInputMessage = (text: string) => {
    setInputMessage(text);
  };

  const handleKeyPressMessage = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const newMessage: Message = {
        id: uuidv4(),
        sender: "Caique Roschel",
        text: inputMessage,
      };
      setMessagesList([newMessage, ...messagesList]);
      setInputMessage("");
    }
  };

  const handleSendMessage = () => {
    const newMessage: Message = {
      id: uuidv4(),
      sender: "Caique Roschel",
      text: inputMessage,
    };
    setMessagesList([newMessage, ...messagesList]);
    setInputMessage("");
  };
  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appConfig.theme.colors.primary[500],
        // @ts-ignore
        backgroundImage: BACKGROUND_IMAGE,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: "80%",
          maxWidth: "80%",
          // @ts-ignore
          maxHeight: "95vh",
          padding: "32px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          <MessageList messages={messagesList} />

          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              placeholder="Insira sua mensagem aqui..."
              value={inputMessage}
              onChange={(event) => handleInputMessage(event.target.value)}
              onKeyPress={(event: KeyboardEvent) =>
                handleKeyPressMessage(event)
              }
              type="textarea"
              name={""}
              styleSheet={{
                display: "flex",
                width: "100%",
                border: "0",

                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
            <Button
              iconName="arrowRight"
              label=""
              colorVariant="primary"
              onClick={() => handleSendMessage()}
              styleSheet={{
                display: "flex",
                marginBottom: "8px",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Button
          variant="primary"
          colorVariant="accent"
          label="Logout"
          href="/"
        />
      </Box>
    </>
  );
}

type MessageProps = {
  messages: Message[];
};

function MessageList(props: MessageProps) {
  const { messages } = props;

  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      {messages.map((message) => (
        <Text
          key={message.id}
          tag="li"
          styleSheet={{
            borderRadius: "5px",
            padding: "6px",
            marginBottom: "12px",
            hover: {
              backgroundColor: appConfig.theme.colors.neutrals[700],
            },
          }}
        >
          <Box
            styleSheet={{
              marginBottom: "8px",
            }}
          >
            <Image
              styleSheet={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                display: "inline-block",
                marginRight: "8px",
              }}
              src={`https://github.com/croschel.png`}
            />
            <Text tag="strong">{message.sender}</Text>
            <Text
              styleSheet={{
                fontSize: "10px",
                marginLeft: "8px",
                color: appConfig.theme.colors.neutrals[300],
              }}
              tag="span"
            >
              {new Date().toLocaleDateString()}
            </Text>
          </Box>
          {message.text}
        </Text>
      ))}
    </Box>
  );
}
