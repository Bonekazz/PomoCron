import { ITime } from "../../Types/BlockTypes";
import Cronos from "../Cronos";
import Demeter from "../Demeter";
import BlockModalRenderer from "./BlockModalRenderer";

export default class CronRenderer {
    private _timeElement: HTMLElement | null;

    private _startButton: HTMLElement | null;
    private _pauseButton: HTMLElement | null;
    private _resetButton: HTMLElement | null;

    private _demListElement: HTMLElement | null;
    private _progressElement: HTMLElement | null;

    private _cronos: Cronos | null = null;

    private _blockModalRenderer: BlockModalRenderer| null = null;

    private isMenuopen: boolean = false;

    constructor(modalRenderer: BlockModalRenderer) {
        this._timeElement = document.getElementById("time-element") as HTMLElement;

        this._startButton = document.getElementById("start-btn") as HTMLElement;
        this._pauseButton = document.getElementById("pause-btn") as HTMLElement;
        this._resetButton = document.getElementById("reset-btn") as HTMLElement;

        this._demListElement = document.getElementById("dem-list") as HTMLElement;
        this._progressElement = document.getElementById("time-progress") as HTMLElement;

        this._blockModalRenderer = modalRenderer;
        this._blockModalRenderer.setCronRenderer(this);

        this.initMenuSideBar();
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
        //console.log(`currentTime = ${currentTime} ---- defaultTime = ${defaultTime}`);
        //console.log(`PROGRESS-BAR -> ${timeProgress}%`);
        
    }


    renderDemeter(demeter: Demeter | null) {
        if (this._timeElement === null) throw new Error("Element with 'time-element' id cannot be found");
        if (this._startButton === null) throw new Error("Element with 'time-btn' id cannot be found");
        if (this._pauseButton === null) throw new Error("Element with 'pause-btn' id cannot be found");
        if (this._resetButton === null) throw new Error("Element with 'reset-btn' id cannot be found");
        if (this._progressElement === null) throw new Error("Progress bar element cannot be found");
        if (this._demListElement === null) throw new Error("Element with 'dem-list' id cannot be found");

        if (this._cronos === null) throw new Error("there is no Cronos setted");

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
            const index = block._config.index;
            const DemListaltHours = hours === 0 ? "" : `${hours < 10 ? `0${hours}` : hours} : `;
            this._demListElement.innerHTML += `
                <button id="demeter-block-element" data-index="${index}" class="block-component px-[21.81px] flex justify-between items-center rounded-[22px] text-[20px] w-[512px] h-[53px] ${type === "Focus" ? "focus-type" : "break-type"}">
                    <span class="w-[25px]"></span>
                    <span>${DemListaltHours}${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds} - ${type}</span>
                    <i data-lucide="ellipsis" class="justify-self-end"></i>
                </button>
            `;
        });

        (document.getElementById("add-block-element") as HTMLElement).addEventListener("click", () => {
            this._blockModalRenderer?.openAddBlock();
        });

        // ----------- add block modal listeners
        this._blockModalRenderer?.setDemeter(this._cronos.getDemeter());
        document.querySelectorAll("#demeter-block-element").forEach(block => {
            block.addEventListener("click", (event) => {
                const blockIndex = Number((event.currentTarget as HTMLElement).dataset.index);
                if (blockIndex === undefined) throw new Error("value returned was undefined");
                console.log((event.currentTarget as HTMLElement).dataset.index);
                // open the block modal
                this._blockModalRenderer?.openMenu(blockIndex);
            });
        });

    }

    setCronos(cronos: Cronos) {
        this._cronos = cronos;
        this.init();
    }

    initMenuSideBar() {
        // CRIAR UMA CLASSE PARA O MENU SIDE BAR???

        const menuSideBarElement = document.getElementById("menu-side-bar");

        menuSideBarElement?.addEventListener("click", () => {
            if (this.isMenuopen) {
                this.isMenuopen = false;
                console.log("fechando menu..");
                return;
            }

            this.isMenuopen = true;
            console.log("abrindo menu..");
        });
    }

    
}