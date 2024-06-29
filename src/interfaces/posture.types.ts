export type PostureStatus = "good" | "mid" | "bad" | "not_reading";

export type PostureRecordInput = {
  good_posture: boolean;
  recorded_at: string;
};

export type PostureSessionRecord = {
  good_posture: boolean;
  recorded_at: string;
};

export type PostureSessionInput = {
  started_at: string;
  ended_at: string;
  records: Array<PostureSessionRecord>;
};
