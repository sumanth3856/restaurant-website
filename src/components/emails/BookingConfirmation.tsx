import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
    Hr,
} from '@react-email/components';
import * as React from 'react';

interface BookingConfirmationProps {
    name: string;
    date: string;
    time: string;
    guests: number;
}

export const BookingConfirmationTemplate = ({
    name,
    date,
    time,
    guests,
}: BookingConfirmationProps) => (
    <Html>
        <Head />
        <Preview>Your table at Maison Delish is confirmed!</Preview>
        <Body style={main}>
            <Container style={container}>
                <Heading style={h1}>Booking Confirmed</Heading>
                <Text style={text}>
                    Dear {name},
                </Text>
                <Text style={text}>
                    We are delighted to confirm your reservation at <strong>Maison Delish</strong>. We look forward to hosting you for an unforgettable culinary experience.
                </Text>

                <Section style={detailsContainer}>
                    <Text style={detailRow}><strong>Date:</strong> {date}</Text>
                    <Text style={detailRow}><strong>Time:</strong> {time}</Text>
                    <Text style={detailRow}><strong>Guests:</strong> {guests} people</Text>
                </Section>

                <Hr style={hr} />

                <Text style={text}>
                    If you need to modify or cancel your reservation, please contact us directly at <Link href="tel:+15551234567" style={link}>(555) 123-4567</Link> or reply to this email.
                </Text>

                <Text style={footer}>
                    Maison Delish<br />
                    123 Culinary Avenue, Food District<br />
                    <Link href="https://maisondelish.vercel.app" style={link}>maisondelish.vercel.app</Link>
                </Text>
            </Container>
        </Body>
    </Html>
);

const main = {
    backgroundColor: '#ffffff',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: '0 auto',
    padding: '20px 0 48px',
    maxWidth: '560px',
};

const h1 = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#09090b', // Primary/Black
    marginBottom: '24px',
};

const text = {
    fontSize: '16px',
    lineHeight: '26px',
    color: '#333',
    marginBottom: '16px',
};

const detailsContainer = {
    padding: '24px',
    backgroundColor: '#f4f4f5', // Secondary/Zinc-100
    borderRadius: '8px',
    marginBottom: '24px',
};

const detailRow = {
    fontSize: '16px',
    margin: '8px 0',
    color: '#09090b',
};

const hr = {
    borderColor: '#e4e4e7',
    margin: '20px 0',
};

const footer = {
    fontSize: '12px',
    color: '#71717a', // Muted
    marginTop: '24px',
    lineHeight: '20px',
};

const link = {
    color: '#d97706', // Accent/Amber
    textDecoration: 'none',
};

export default BookingConfirmationTemplate;
