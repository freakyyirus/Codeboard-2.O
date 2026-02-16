import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Link,
    Preview,
    Text,
    Section,
    Button,
} from '@react-email/components';
import * as React from 'react';

interface StreakReminderEmailProps {
    username: string;
    streakCount: number;
}

export const StreakReminderEmail = ({
    username,
    streakCount,
}: StreakReminderEmailProps) => (
    <Html>
        <Head />
        <Preview>Don't lose your {streakCount} day streak!</Preview>
        <Body style={main}>
            <Container style={container}>
                <Heading style={h1}>Keep the flame alive, {username}!</Heading>
                <Text style={text}>
                    You have a <strong>{streakCount}-day streak</strong> going on CodeBoard.
                    Don't let it break today! Solved a problem to stay on top of your goals.
                </Text>
                <Section style={buttonContainer}>
                    <Button style={button} href="https://codeboard.dev/dashboard">
                        Solve a Problem
                    </Button>
                </Section>
                <Text style={footer}>
                    CodeBoard 2.0 • The Ultimate Developer Dashboard
                </Text>
            </Container>
        </Body>
    </Html>
);

export default StreakReminderEmail;

const main = {
    backgroundColor: '#000000',
    color: '#ffffff',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: '0 auto',
    padding: '20px 0 48px',
    width: '580px',
};

const h1 = {
    fontSize: '24px',
    lineHeight: '1.3',
    fontWeight: '700',
    color: '#ffffff',
    padding: '17px 0 0',
};

const text = {
    fontSize: '16px',
    lineHeight: '26px',
    color: '#888',
};

const buttonContainer = {
    padding: '27px 0 27px',
};

const button = {
    backgroundColor: '#0070f3',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '16px',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    width: '100%',
    padding: '12px',
};

const footer = {
    color: '#555',
    fontSize: '12px',
    marginTop: '48px',
};
