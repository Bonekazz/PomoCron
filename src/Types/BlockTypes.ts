export enum CronState {
    RUNNING,
    PAUSED,
    FINISHED
}


export enum BlockType {
    FOCUS = "Focus",
    BREAK = "Break",
}

export interface ITimeBlock {
    type: BlockType,
    time: ITime,
}

export interface ITime {
    hours: number,
    minutes: number,
    seconds: number,
}