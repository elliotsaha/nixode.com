import {NextRequest} from 'next/server';
import {ServerResponse} from '@/helpers';
import {contactSchema, ContactSchema} from '@/forms';
import {sendMail, logger} from '@/lib';
import {ContactEmail} from '@/emails';

export const POST = async (request: NextRequest) => {
  const body: ContactSchema = await request.json();

  const {first_name, last_name, email_address, message} = body;

  const validation = contactSchema.safeParse({
    first_name,
    last_name,
    email_address,
    message,
  });

  if (validation.success) {
    try {
      const subject = `Contact message from ${first_name} ${last_name}`;
      await sendMail({
        to: `${process.env.NEXT_CONTACT_EMAIL}`,
        subject: subject,
        emailComponent: ContactEmail({
          first_name,
          last_name,
          email_address,
          message,
        }),
      });

      return ServerResponse.success('Successfully sent message.');
    } catch (e) {
      logger.error(e);
      return ServerResponse.serverError();
    }
  } else {
    return ServerResponse.userError('Invalid Schema');
  }
};
