import { atom } from 'recoil';
import { v1 } from 'uuid';

export const respState = atom({
    key: `respState/${v1()}`,
    default: []
  });