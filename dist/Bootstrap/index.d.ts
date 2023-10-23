import { Command } from "../Types/Command";
import { ICTagContext } from "./CTagContext";
export interface FuncCnTagManager {
    (...arg: Command): void;
    ctx: ICTagContext;
}
