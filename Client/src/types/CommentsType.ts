import type { childDetails } from './childDetails';
import type { ActivityInstanceType } from "./ActivityInstance";

export interface CommentsType {
  Id: number;
  ChildId: number;
  ActivityInstanceId?: number;
  Text: string;
  CreatedAt: string;

  ActivityInstance?: ActivityInstanceType;
  childDetails: childDetails;
}