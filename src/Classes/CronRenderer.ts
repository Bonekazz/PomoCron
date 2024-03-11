import { ITime } from "../Types/BlockTypes";
import Cronos from "./Cronos";
import Demeter from "./Demeter";

export default class CronRenderer {
    private _timeElement: HTMLElement | null;

    private _startButton: HTMLElement | null;
    private _pauseButton: HTMLElement | null;
    private _resetButton: HTMLElement | null;

    private _demListElement: HTMLElement | null;
    private _progressElement: HTMLElement | null;

    private _cronos: Cronos | null = null;

    constructor() {
        this._timeElement = document.getElementById("time-element") as HTMLElement;

        this._startButton = document.getElementById("start-btn") as HTMLElement;
        this._pauseButton = document.getElementById("pause-btn") as HTMLElement;
        this._resetButton = document.getElementById("reset-btn") as HTMLElement;

        this._demListElement = document.getElementById("dem-list") as HTMLElement;
        this._progressElement = document.getElementById("time-progress") as HTMLElement;
    }

    init() {
        if (this._startButton === null) throw new Error("Element with 'time-btn' id cannot be found");
        if (this._pauseButton === null) throw new Error("Element with 'pause-btn' id cannot be found");
        if (this._resetButton === null) throw new Error("Element with 'reset-btn' id cannot be found");

        // --- TEMPORARY
        const RMDemeter = document.getElementById("remove-demeter");
        RMDemeter?.addEventListener("click", () => {
            this._cronos?.removeCurrentDemeter();
        });
        const addDemeter = document.getElementById("add-demeter");
        addDemeter?.addEventListener("click", () => {
            this._cronos?.setDemeter(new Demeter());
        });
        // -----------------------------

        // Initialize Time Button with Cronos Listeners
        this._startButton.addEventListener("click", () => {
            this._cronos?.runCurrentBlock();
        });
        this._pauseButton.addEventListener("click", () => {
            this._cronos?.pauseCurrentBlock();
        });
        this._resetButton.addEventListener("click", () => {
            this._cronos?.resetCurrentBlock();
        });
    }
    
    renderBlockTime(blocktime: ITime, defaulttime: ITime) {
        if (this._timeElement === null) throw new Error("Element with 'time-element' id cannot be found");
        const { hours, minutes, seconds } = blocktime;
        const altHours = hours === 0 ? "" : `${hours < 10 ? `0${hours}` : hours} : `;
        this._timeElement.innerHTML = `${altHours}${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`;
        console.log("rendering time in html");

        // ---- PROGRESS TIME BAR ----

        if (this._progressElement === null) throw new Error("Element with 'time-progress' id cannot be found");

        const currentTime = (hours * 60 * 60) + (minutes * 60) + seconds;
        const defaultTime = (defaulttime.hours * 60 * 60) + (defaulttime.minutes * 60) + defaulttime.seconds;
        const timeProgress = 100 - (((defaultTime - currentTime) / defaultTime) * 100);

        this._progressElement.style.width = `${timeProgress}%`;
        console.log(`currentTime = ${currentTime} ---- defaultTime = ${defaultTime}`);
        console.log(`PROGRESS-BAR -> ${timeProgress}%`);
        
    }

    renderBlockConfig() {

    }

    renderDemeter(demeter: Demeter | null) {
        if (this._timeElement === null) throw new Error("Element with 'time-element' id cannot be found");
        if (this._startButton === null) throw new Error("Element with 'time-btn' id cannot be found");
        if (this._pauseButton === null) throw new Error("Element with 'pause-btn' id cannot be found");
        if (this._resetButton === null) throw new Error("Element with 'reset-btn' id cannot be found");
        if (this._progressElement === null) throw new Error("Progress bar element cannot be found");
        if (this._demListElement === null) throw new Error("Element with 'dem-list' id cannot be found");

        if (demeter === null) {
            this._timeElement.innerHTML = "00 : 00 : 00";
            this._startButton.classList.add("opacity-50");
            this._pauseButton.classList.add("opacity-50");
            this._resetButton.classList.add("opacity-50");
            this._timeElement.classList.add("opacity-50");
            this._progressElement.classList.add("hidden");
            this._demListElement.innerHTML = "";
            return;
        }

        this._startButton.classList.remove("opacity-50");
        this._pauseButton.classList.remove("opacity-50");
        this._resetButton.classList.remove("opacity-50");
        this._timeElement.classList.remove("opacity-50");
        this._progressElement.classList.remove("hidden");

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
                <li class="border border-black p-1 w-full rounded-lg text-center ${type === "Focus" ? "bg-black text-white" : "bg-white"}">
                ${DemListaltHours}${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds} - ${type}</li>
            `;
        });
    }

    setCronos(cronos: Cronos) {
        this._cronos = cronos;
        this.init();
    }
    
}