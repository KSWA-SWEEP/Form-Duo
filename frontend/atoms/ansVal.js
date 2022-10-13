import { atom } from 'recoil';
import { v1 } from 'uuid';

export const ansValState = atom({
    key: `ansValState/${v1()}`,
    default: []
  });