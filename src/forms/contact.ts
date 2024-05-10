import {z} from 'zod';

export const contactSchema = z.object({
  first_name: z.string().min(1, 'Required field'),
  last_name: z.string().min(1, 'Required field'),
  email_address: z.string().email('Invalid email address'),
  message: z.string().min(1, 'Required field'),
});

export type ContactSchema = z.infer<typeof contactSchema>;
