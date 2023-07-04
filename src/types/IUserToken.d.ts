export interface IUserToken {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: 'female' | 'male' | 'other';
  image: string;
  exp: number | Date;
  iat: number;
}
