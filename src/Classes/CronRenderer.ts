import { ITime } from "../Types/BlockTypes";
import Cronos from "./Cronos";
import Demeter from "./Demeter";
import TimeBlock from "./TimeBlock";

export default class CronRenderer {
    private _timeElement: HTMLElement | null;
    private _timeButton: HTMLElement | null;
    private _demListElement: HTMLElement | null;

    private _cronos: Cronos | null = null;

    constructor() {
        this._timeElement = document.getElementById("time-element") as HTMLElement;
        this._timeButton = document.getElementById("time-btn") as HTMLElement;
        this._demListElement = document.getElementById("dem-list") as HTMLElement;
    }

    init() {
        if (this._timeButton === null) throw new Error("Element with 'time-btn' id cannot be found");

        const RMDemeter = document.getElementById("remove-demeter");
        RMDemeter?.addEventListener("click", () => {
            this._cronos?.removeCurrentDemeter();
        });
        const addDemeter = document.getElementById("add-demeter");
        addDemeter?.addEventListener("click", () => {
            this._cronos?.setDemeter(new Demeter());
        });

        // Initialize Time Button with Cronos Listeners
        this._timeButton.addEventListener("click", () => {
            this._cronos?.runCurrentBlock();
        });
    }
    
    renderBlockTime(blocktime: ITime) {
        if (this._timeElement === null) throw new Error("Element with 'time-element' id cannot be found");
        const { hours, minutes, seconds } = blocktime;
        const altHours = hours === 0 ? "" : `${hours < 10 ? `0${hours}` : hours} : `;
        this._timeElement.innerHTML = `${altHours}${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`;
        console.log("rendering time in html");
    }

    renderDemeter(demeter: Demeter | null) {
        if (this._timeElement === null) throw new Error("Element with 'time-element' id cannot be found");
        if (this._timeButton === null) throw new Error("Element with 'time-btn' id cannot be found");
        if (this._demListElement === null) throw new Error("Element with 'dem-list' id cannot be found");

        if (demeter === null) {
            this._timeElement.innerHTML = "00 : 00 : 00";
            this._timeButton.classList.add("opacity-50");
            this._timeElement.classList.add("opacity-50");
            this._demListElement.innerHTML = "";
            return;
        }

        this._timeButton.classList.remove("opacity-50");
        this._timeElement.classList.remove("opacity-50");

        // ------------- render initial block

        console.log("renderizando bloco inicial do demeter");
        const { hours, minutes, seconds } = demeter.getCurrentBlock()._config.time;
        const altHours = hours === 0 ? "" : `${hours < 10 ? `0${hours}` : hours} : `;
        this._timeElement.innerHTML = `${altHours}${minutes < 10? `0${minutes}` : minutes} : ${seconds < 10? `0${seconds}` : seconds}`;

        // ------------ render list of blocks
        
        this._demListElement.innerHTML = "";
        
        this._cronos?.getDemeter()?.getBlockList().forEach(block => {
            if (this._demListElement === null) throw new Error("Element with 'dem-list' id cannot be found");

            const { hours, minutes, seconds } = block._config.time;
            const type = block._config.type;
            const DemListaltHours = hours === 0 ? "" : `${hours < 10 ? `0${hours}` : hours} : `;
            this._demListElement.innerHTML += `
                <li>${DemListaltHours}${minutes < 10? `0${minutes}` : minutes} : ${seconds < 10? `0${seconds}` : seconds} - ${type}</li>
            `;
        });
    }

    setCronos(cronos: Cronos) {
        this._cronos = cronos;
        this.init();
    }
    
}