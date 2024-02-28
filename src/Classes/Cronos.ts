// Cronos is the engine, the proxie between the user and the time blocks

import States from "../Enums/States";
import TimeBlock from "./TimeBlock";

// funcionalities:
// --- play the currentTimerBlock
// --- stop the currentTimerBlock
// --- reset the currentTimerBlock

// properties:
// --- the current TimeBlock


export default class Cronos
{
    private _curBlock: TimeBlock | undefined;
    private _interval: number | undefined;

    constructor()
    {
        this.InitRenderer();
    }

    playCurrent() {
        if (this._curBlock?.getState() === States.RUNNING)
        {
            console.log("already running");
            return;
        };
        console.log("start");
        this._curBlock?.setState(States.RUNNING);
        this.renderCurrent();
        this._interval = setInterval(() =>
        {
            if (this._curBlock?.getState() === States.PAUSED || this._curBlock?.getState() === States.FINISHED)
            {
                clearInterval(this._interval);
                return;
            }
            
            this._curBlock?.burn();
            this.renderCurrent();
        }, 1000);
        
    }
    stopCurrent() {
        if (this._curBlock?.getState() === States.PAUSED)
        {
            console.log("already paused");
            return;
        };
        this._curBlock?.setState(States.PAUSED);
        clearInterval(this._interval);
        console.log("Paused")
        this.renderCurrent();
    }
    resetCurrent() {
        if (this._curBlock?.getState() === States.RUNNING)
        {
            console.log("pause before reset");
            return;
        };
        this._curBlock?.setCurrentTime(this._curBlock.getSettings());
        console.log("Reset");
        this.renderCurrent();
    }

    setCurrent(timeblock: TimeBlock) {
        this._curBlock = timeblock;
        this.renderCurrent();
    }
    getCurrent() {
        return this._curBlock;
    }

    InitRenderer() {
        const startBtn = document.querySelector("#start");
        const pauseBtn = document.querySelector("#pause");
        const resetBtn = document.querySelector("#reset");

        startBtn?.addEventListener('click', () =>
        {
            this.playCurrent();
        });
        pauseBtn?.addEventListener('click', () =>
        {
            this.stopCurrent();
        });
        resetBtn?.addEventListener('click', () =>
        {
            this.resetCurrent();
        });
    }

    renderCurrent() {
        if (this._curBlock === undefined) return;
        const wrapper = document.querySelector(".timer-wrapper") as HTMLElement;
        const Hel = document.querySelector("#hours") as HTMLElement;
        const Mel = document.querySelector("#minutes") as HTMLElement;
        const Sel = document.querySelector("#seconds") as HTMLElement;
        const { hours, minutes, seconds } = this._curBlock.getCurrentTime();
        
        if (this._curBlock.getState() === States.PAUSED || this._curBlock.getState() === States.FINISHED)
        {
            wrapper.classList.add("opacity-50");
        } else {
           wrapper.classList.remove("opacity-50"); 
        }

    
        Hel.innerHTML = hours > 10 ? String(hours) : "0" + String(hours);
        Mel.innerHTML = minutes > 10 ? String(minutes) : "0" + String(minutes);
        Sel.innerHTML = seconds > 10 ? String(seconds) : "0" + String(seconds);

    }
}