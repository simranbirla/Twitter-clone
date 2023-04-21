import { IThoughtUser } from "./User";

export interface IThought {
  text: string;
  userId: IThoughtUser;
  likes: number;
  retweets: number;
  parentId?: string;
  childIds?: IChildThought[];
  edited: boolean;
  _id: string;
}

export type IChildThought = Partial<IThought>;

export interface ISavedThoughts {
  tweetId: IThought;
  userId: string;
}
