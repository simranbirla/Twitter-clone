export interface IUser {
  photo: string;
  name: string;
  username: string;
  email: string;
  id: string;
  status: string;
}

export interface IUserDetails extends IUser {
  loggedIn: boolean;
}

export interface IThoughtUser {
  name: string;
  photo: {
    data: number[];
  };
  _id: string;
  username: string;
}
