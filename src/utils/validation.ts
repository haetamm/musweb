import z from 'zod';

const emailLogin = z.string().email();
const passwordLogin = z.string().trim().min(1, 'Password is required');

export const loginFormSchema = z.object({
  email: emailLogin,
  password: passwordLogin,
});

const title = z
  .string()
  .min(3, 'Min. 3 characters')
  .max(25, 'Max. 25 characters');
const year = z.string().regex(/^\d{4}$/, 'Year must be a valid 4-digit number');

export const songFormSchema = z.object({
  title,
  year,
  performer: z.string().min(1, 'Performer is required'),
  genre: z.string().min(1, 'Genre is required'),
  duration: z.string().regex(/^\d+$/, 'Duration must be a number'),
  albumId: z.string().optional(),
});

export type SongFormData = z.infer<typeof songFormSchema>;

export const albumFormSchema = z.object({
  title,
  artist: z.string().min(1, 'Performer is required'),
  year,
});

export type AlbumFormData = z.infer<typeof albumFormSchema>;

export const playlistFormSchema = z.object({
  title,
});

export type PlaylistFormData = z.infer<typeof playlistFormSchema>;
