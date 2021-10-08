/* eslint-disable camelcase */
export type Photographer = {
  username: string;
  name: string;
};
export type Photo = {
  id: string;
  color: string;
  description: string;
  alt_description: string;
  urls: {
    regular: string;
    small: string;
    thumb: string;
  };
  user: Photographer;
};
