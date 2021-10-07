export type Photographer = {
  username: string;
  name: string;
};
export type Photo = {
  id: string;
  color: string;
  description: string;
  urls: {
    small: string;
    thumb: string;
  };
};
