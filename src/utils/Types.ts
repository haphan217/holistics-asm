export type Photographer = {
  username: string;
  name: string;
};
export type Photo = {
  id: string;
  width: number;
  height: number;
  color: string;
  description: string;
  urls: {
    regular: string;
  };
};
