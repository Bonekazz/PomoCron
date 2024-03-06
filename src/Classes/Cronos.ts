// Cronos is the engine, the proxie between the user and the time blocks

import States from "../Enums/States";
import Demeter from "./Demeter";
import TimeBlock from "./TimeBlock";

// funcionalities:
// --- play the currentTimeBlock
// --- stop the currentTimeBlock
// --- reset the currentTimeBlock

// --- play the next timeBlock

// properties:
// --- the current Demeter
// --- the current TimeBlock


export default class Cronos
{
    public _curDemeter: Demeter | undefined;
    public _curBlock: TimeBlock | undefined;
    public _interval: number | undefined;

    constructor()
    {
        this.InitRenderer();
    }

    playCurrent()
    {
        if (this._curBlock?.getState() === States.RUNNING)
        {
            console.log("already running");
            return;
        };
        console.log("start");
        this._curBlock?.setState(States.RUNNING);
        this.renderCurrentBlock();
        this._interval = setInterval(() =>
        {
            if (this._curBlock?.getState() === States.PAUSED || this._curBlock?.getState() === States.FINISHED)
            {
                clearInterval(this._interval);
                return;
            }
            
            this._curBlock?.burn();
            this.renderCurrentBlock();
        }, 1000);
        
    }
    stopCurrent()
    {
        if (this._curBlock?.getState() === States.PAUSED)
        {
            console.log("already paused");
            return;
        };
        this._curBlock?.setState(States.PAUSED);
        clearInterval(this._interval);
        console.log("Paused")
        this.renderCurrentBlock();
    }
    resetCurrent()
    {
        if (this._curBlock?.getState() === States.RUNNING)
        {
            console.log("pause before reset");
            return;
        };
        this._curBlock?.setCurrentTime(this._curBlock.getSettings());
        console.log("Reset");
        this.renderCurrentBlock();
    }

    setCurrentBlock(timeblock: TimeBlock)
    {
        this._curBlock = timeblock;
        this.renderCurrentBlock();
    }
    getCurrentBlock()
    {
        return this._curBlock;
    }

    setCurrentDem(deme: Demeter)
    {
        this._curDemeter = deme;
    }

    InitRenderer()
    {
        if (this._curDemeter === undefined) return;

        const startBtn = document.querySelector("#start");
        const pauseBtn = document.querySelector("#pause");
        const resetBtn = document.querySelector("#reset");

        const demTitle = document.querySelector('dem-title') as HTMLElement;
        demTitle.innerHTML = this._curDemeter.getTitle() as string;    

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

    renderCurrentBlock()
    {
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