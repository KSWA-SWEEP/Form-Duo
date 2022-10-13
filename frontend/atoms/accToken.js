import {atom} from "recoil";
import { v1 } from 'uuid';

export const accToken = atom({
    key: `accToken/${v1()}`,
    default: ""
});