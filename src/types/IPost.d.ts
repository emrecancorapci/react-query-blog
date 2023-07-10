export interface Response {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}

export interface InfiniteResponse {
  posts: Response[];
  limit: number;
  skip: number;
  total: number;
}

export interface Request {
  title: string;
  body: string;
  userId: number;
  tags: string[];
}
