import { atom } from 'recoil';
import { v1 } from 'uuid';

export const qIdState = atom({
    key: `qIdState/${v1()}`,
    default: []
  });