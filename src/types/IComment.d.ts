export interface IComment {
  id: number;
  postId: number;
  body: string;
  user: {
    id: number;
    username: string;
  };
}
