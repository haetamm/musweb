import z from 'zod';

const emailLogin = z.string().email();
const passwordLogin = z.string().trim().min(1, 'Password is required');

export const loginFormSchema = z.object({
  email: emailLogin,
  password: passwordLogin,
});
