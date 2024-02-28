// TimerBlock is a time block that the user set to focus or to take a break;
// it has its fixed time setting and the current time and state;

import ITime from "../Interfaces/ITime.js";
import States from "../Enums/States.js";


export default class TimeBlock {
    private _settings;
    private _currentTime: ITime;
    private _state: States;

    constructor(sett: ITime) {
        this._settings = sett;
        this._currentTime = {...this._settings};
        this._state = States.PAUSED;

    }

    burn() {       
        //this._currentTime.miliseconds -= 1;

        //if (this._currentTime.miliseconds === 0) {
        //    this._currentTime.miliseconds = 1000;
        //    this._currentTime.seconds -= 1;
        //}

        //if (this._currentTime.seconds === 0 && this._currentTime.miliseconds === 0) {
        //    this._state = States.FINISHED;
        //}

        this._currentTime.seconds -= 1;
        if (this._currentTime.seconds === 0) {
            this._state = States.FINISHED;
        }
   
    }

    setSettings(sett: ITime): void {
        this._settings = sett;
    }
    getSettings(): ITime {
        return this._settings;
    }
    
    setCurrentTime(time: ITime): void {
        this._currentTime = time;
    }
    getCurrentTime(): ITime {
        return this._currentTime;
    }


    setState(state: States): void {
        this._state = state;
    }
    getState(): States {
        return this._state;
    }
}