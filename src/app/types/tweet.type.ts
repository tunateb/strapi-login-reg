import { User } from './user.type';
import { Comment } from './comment.type';
import { Like } from './like.type';
import { Retweet } from './retweet.type';

export type Tweet = {
  id?: number;
  text: string;
  user: User;
  created_at?: string;
  updated_at?: string;
  comments?: Comment[];
  image?: any;
  likes?: Like[];
  retweets?: Retweet[];
};
