import { ITimeBlock } from "../Types/BlockTypes";

export default class TimeBlock {
    public _config: ITimeBlock;

    constructor(config: ITimeBlock) {
        this._config = config;
    }
}