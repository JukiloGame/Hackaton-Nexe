import type { ActivityDetailsType } from './ActivityDetailsType';
import type { childDetails } from './childDetails';
export interface ActivityInstanceType {
  Id: number;
  ChildId: number;
  ActivityId: number;
  AssignedAt: string;
  IsAuthorized: number;
  AuthorizedAt?: string | null;

  Activity: ActivityDetailsType;
  Child: childDetails;
  Comments: Comment[];
}