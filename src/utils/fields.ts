export const loginFields = [
  {
    name: 'email',
    type: 'email',
    placeholder: 'Email',
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Password',
  },
] as const;

export const songFields = [
  {
    name: 'title',
    type: 'text',
    placeholder: 'Title',
  },
  {
    name: 'year',
    type: 'text',
    placeholder: 'Year',
  },
  {
    name: 'performer',
    type: 'text',
    placeholder: 'Performer',
  },
  {
    name: 'genre',
    type: 'text',
    placeholder: 'Genre',
  },
  {
    name: 'duration',
    type: 'text',
    placeholder: 'Duration (seconds)',
  },
  {
    name: 'albumId',
    type: 'text',
    placeholder: 'Album',
  },
] as const;

export const albumFields = [
  {
    name: 'title',
    type: 'text',
    placeholder: 'Title',
  },
  {
    name: 'artist',
    type: 'text',
    placeholder: 'Artist',
  },
  {
    name: 'year',
    type: 'text',
    placeholder: 'Year',
  },
] as const;
