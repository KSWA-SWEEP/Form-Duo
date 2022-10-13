import { atom } from 'recoil';
import { v1 } from 'uuid';

export const qContentIdState = atom({
    key: `qContentIdState/${v1()}`,
    default: []
  });