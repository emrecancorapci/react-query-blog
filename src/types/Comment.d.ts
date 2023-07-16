export interface Comment {
  id: number;
  postId: number;
  body: string;
  user: {
    id: number;
    username: string;
  };
}
