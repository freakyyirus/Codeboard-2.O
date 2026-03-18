import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Button,
} from "@react-email/components";
import * as React from "react";

interface WelcomeEmailProps {
  name: string;
}

export const WelcomeEmail = ({ name }: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to CodeBoard 2.0!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to CodeBoard, {name}! 🚀</Heading>
          <Text style={text}>
            We're thrilled to have you join our platform. CodeBoard 2.0 is designed to be your ultimate competitive programming and DSA practice environment.
          </Text>
          <Text style={text}>
            Connect your LeetCode, Codeforces, and GitHub accounts to start tracking your progress, and jump into the Code Studio to write, run, and get AI reviews on your solutions!
          </Text>
          <Button href="https://codeboard.dev/dashboard" style={button}>
            Go to Dashboard
          </Button>
          <Text style={footer}>
            Happy coding! <br />
            - The CodeBoard Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "600px",
};

const h1 = {
  color: "#1d1c1d",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "30px 0",
  padding: "0",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  marginBottom: "20px",
};

const button = {
  backgroundColor: "#2563eb",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
  margin: "20px 0",
};

const footer = {
  color: "#898989",
  fontSize: "14px",
  marginTop: "40px",
};

export default WelcomeEmail;
