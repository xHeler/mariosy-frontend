import { MariosElement } from './marios-element.model';

export interface MariosList {
    mariosElementList: MariosElement[],
    mariosSize: number,
}

export const EmptyMariosList: MariosList = {
    mariosElementList: [],
    mariosSize: 0,
  };