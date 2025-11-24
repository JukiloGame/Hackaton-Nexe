import type { ActivityInstanceType } from "./ActivityInstance";

export interface ActivityDetailsType {
  Id: number;
  Title: string;
  Description: string;
  Date: string;
  Address: string;

  ActivityInstances: ActivityInstanceType
}