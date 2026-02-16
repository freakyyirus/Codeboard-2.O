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

interface ContestReminderEmailProps {
    username: string;
    contestName: string;
    platform: string;
    startTime: string;
    href: string;
}

export const ContestReminderEmail = ({
    username,
    contestName,
    platform,
    startTime,
    href,
}: ContestReminderEmailProps) => (
    <Html>
        <Head />
        <Preview>Upcoming Contest: {contestName} on {platform}</Preview>
        <Body style={main}>
            <Container style={container}>
                <Heading style={h1}>Ready for the challenge, {username}?</Heading>
                <Text style={text}>
                    A new contest is starting soon!
                </Text>
                <Section style={card}>
                    <Text style={cardTitle}>{contestName}</Text>
                    <Text style={cardDetail}>
                        <strong>Platform:</strong> {platform}<br />
                        <strong>Starts at:</strong> {startTime}
                    </Text>
                    <Button style={button} href={href}>
                        Register / View Details
                    </Button>
                </Section>
                <Text style={footer}>
                    CodeBoard 2.0 • Never miss a contest again.
                </Text>
            </Container>
        </Body>
    </Html>
);

export default ContestReminderEmail;

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

const card = {
    backgroundColor: '#111',
    border: '1px solid #333',
    borderRadius: '12px',
    padding: '24px',
    marginTop: '20px',
};

const cardTitle = {
    fontSize: '18px',
    fontWeight: '600',
    margin: '0 0 10px',
};

const cardDetail = {
    fontSize: '14px',
    color: '#aaa',
    lineHeight: '20px',
    marginBottom: '20px',
};

const button = {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    color: '#000',
    fontSize: '16px',
    fontWeight: '600',
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
