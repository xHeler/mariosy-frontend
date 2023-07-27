import { MariosReaction } from "../enums/marios-reaction.enum";

export interface Marios {
  id?: string,
  senderId: string,
  receiversId: string[],
  title: string,
  message: string,
  reaction: MariosReaction,
}