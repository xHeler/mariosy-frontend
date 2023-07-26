import { MariosReaction } from "../enums/marios-reaction.enum";

export interface Marios {
  id?: string,
  senderId: string,
  receiversId: string[],
  message: string,
  reaction: MariosReaction,
}