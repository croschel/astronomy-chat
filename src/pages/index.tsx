import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import appConfig from "../config.json";
import { apiGithub } from "../services/api";

interface GithubUser {
  name: string;
  username: string;
  location: string;
  company: string;
  avatar_url: string;
}

type TitleProps = {
  children: ReactNode;
  tag: string;
};
function Title({ children }: TitleProps) {
  return (
    <>
      <h1>{children}</h1>
      <style jsx>{`
        h1 {
          color: ${appConfig.theme.colors.neutrals["000"]};
          font-size: 24px;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}

export default function PaginaInicial() {
  const emptyUser = {
    name: "",
    username: "",
    location: "",
    company: "",
    avatar_url: "",
  };

  const [githubName, setGithubName] = useState<string>("");
  const [user, setUser] = useState<GithubUser>(emptyUser);
  const router = useRouter();

  const handleChange = async (value: string) => {
    setGithubName(value);
    try {
      const response = await apiGithub.get(`users/${value}`);
      setUser({
        name: response.data.name,
        username: response.data.login,
        location: response.data.location,
        company: response.data.company,
        avatar_url: response.data.avatar_url,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    router.push("/chat");
  };

  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.primary[500],
          // @ts-ignore
          backgroundImage:
            "url(https://img.wallpapersafari.com/desktop/1920/1080/48/42/ADS1OV.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            width: "100%",

            borderRadius: "5px",
            maxWidth: githubName ? "700px" : "400px",
            padding: "32px",
            margin: "16px",
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            // @ts-ignore
            onSubmit={(event: Event) => handleSubmit(event)}
            styleSheet={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", sm: "50%" },
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <Title tag="h2">Boas vindas de volta!</Title>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: "32px",
                color: appConfig.theme.colors.neutrals[300],
              }}
            >
              {appConfig.name}
            </Text>

            <TextField
              fullWidth
              value={githubName}
              onChange={(event) => handleChange(event.target.value)}
              // @ts-ignore
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type="submit"
              label="Entrar"
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["999"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[200],
                mainColorStrong: appConfig.theme.colors.primary[700],
              }}
            />
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          {githubName.length > 2 && (
            <Box
              styleSheet={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "16px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                border: "1px solid",
                borderColor: appConfig.theme.colors.neutrals[999],
                borderRadius: "10px",
                flex: 1,
                // @ts-ignore
                minHeight: "240px",
                marginLeft: "16px",
              }}
            >
              <Image
                styleSheet={{
                  borderRadius: "50%",
                  marginBottom: "16px",
                }}
                src={user.avatar_url}
              />
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: "3px 10px",
                  borderRadius: "1000px",
                }}
              >
                {githubName}
              </Text>
            </Box>
          )}
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
