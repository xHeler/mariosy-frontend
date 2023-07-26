export interface Marios {
  id?: string;
  senderId: string;
  receiversId: string[];
  message: string;
  reaction: MariosReaction;
}

export enum MariosReaction {
  THANK_YOU,
  GOOD_JOB,
  IMPRESSIVE,
  EXCEPTIONAL,
  AWESOME,
  OUTSTANDING,
}
