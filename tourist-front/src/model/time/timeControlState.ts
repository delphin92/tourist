export enum TimeSpeeds {
    NORMAL = 1,
    X2 = 2,
    X4 = 4
}

export interface TimeControlState {
    speed: TimeSpeeds;
    paused: boolean;
}