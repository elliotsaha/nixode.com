import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text,
} from '@react-email/components';

import * as React from 'react';

interface ContactEmailProps {
  first_name: string;
  last_name: string;
  email_address: string;
  message: string;
}

export const ContactEmail = ({
  first_name,
  last_name,
  email_address,
  message,
}: ContactEmailProps) => {
  const email_link = 'mailto:' + email_address;
  return (
    <Html>
      <Head />
      <Preview>{message}</Preview>
      <Body>
        <Container>
          <Heading>
            Message from {first_name} {last_name}
          </Heading>
          <Hr />
          <Text>{message}</Text>
          <Hr />
          <Text>
            Reply to:{' '}
            <a href={email_link}>
              <span>{email_address}</span>
            </a>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default ContactEmail;
