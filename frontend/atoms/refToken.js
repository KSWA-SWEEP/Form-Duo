import {atom} from "recoil";
import { v1 } from 'uuid';

export const refToken = atom({
    key: `refToken/${v1()}`,
    default: "",
});