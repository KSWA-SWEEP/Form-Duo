import {atom} from "recoil";
import { v1 } from 'uuid';

export const modifySvyID = atom({
    key: `modifySvyID/${v1()}`,
    default: ""
});