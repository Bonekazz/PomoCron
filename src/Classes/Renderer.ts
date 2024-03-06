import States from "../Enums/States";
import ITime from "../Interfaces/ITime";
import Cronos from "./Cronos";

export default class Renderer 
{
    private _cron: Cronos | undefined;

    constructor() {

    }

    initRenderer(cronos: Cronos)
    {
        this._cron = cronos;
    }

    renderBlock(time: ITime)
    {
        if (this._cron === undefined) return;
        if (this._cron._curBlock === undefined) return;

        const wrapper = document.querySelector(".timer-wrapper") as HTMLElement;
        const Hel = document.querySelector("#hours") as HTMLElement;
        const Mel = document.querySelector("#minutes") as HTMLElement;
        const Sel = document.querySelector("#seconds") as HTMLElement;
        const { hours, minutes, seconds } = time;
        
        if (this._cron._curBlock.getState() === States.PAUSED || this._cron._curBlock.getState() === States.FINISHED)
        {
            wrapper.classList.add("opacity-50");
        } else {
           wrapper.classList.remove("opacity-50"); 
        }

    
        Hel.innerHTML = hours > 10 ? String(hours) : "0" + String(hours);
        Mel.innerHTML = minutes > 10 ? String(minutes) : "0" + String(minutes);
        Sel.innerHTML = seconds > 10 ? String(seconds) : "0" + String(seconds);
    }

    renderPile()
    {

    }
}