export interface IThought {
  text: string;
  userId: {
    name: string;
    photo: {
      data: number[];
    };
    _id: string;
  };
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
