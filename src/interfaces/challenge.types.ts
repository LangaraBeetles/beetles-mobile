//converted other fields to string to avoid errors on hook form. TextInput only accepts strings
export type ChallengeInputType = {
  name: string;
  description: string;
  start_at: string;
  end_at: string;
  goal: string;
  duration: string;
  color: string;
  icon: string;
  status: ChallengeStatusType;
};

export type ChallengeType = {
  id: string;
  creator_id: string;
  name: string;
  description: string;
  start_at: Date;
  end_at: Date;
  goal: number;
  duration: number;
  color: string;
  icon: string;
  status: ChallengeStatusType;
  members: MemberType[];
};

export enum ChallengeStatusEnum {
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  FAILED = "failed",
  QUITTED = "quitted",
}

export type ChallengeStatusType = `${ChallengeStatusEnum}`;

export type MemberType = {
  user_id: string;
  joined_at: Date;
  left_at: Date | null;
};
