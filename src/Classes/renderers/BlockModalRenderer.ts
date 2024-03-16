import { BlockType} from "../../Types/BlockTypes";
import Demeter from "../Demeter";
import TimeBlock from "../TimeBlock";
import CronRenderer from "./CronRenderer";

export default class BlockModalRenderer {
    private _demeter: Demeter | null = null;
    private _cronRenderer: CronRenderer | null = null;
    
    constructor() {
        this.init();
    }

    open(index: number) {
        const block = this._demeter?.getBlock(index);
        
        document.getElementById("div-block-modal")?.classList.remove("hidden");
        document.getElementById("div-block-modal")?.classList.add("flex");

        (document.getElementById("modal-block-index") as HTMLElement).innerHTML = `
            <div>
                <span>${block?._config.time.hours}</span>
                <span> : </span>
                <span>${block?._config.time.minutes}</span>
                <span> : </span>
                <span>${block?._config.time.seconds}</span>
            </div>
        `;
    }

    close() {

        document.getElementById("div-block-modal")?.classList.add("hidden");
        document.getElementById("div-block-modal")?.classList.remove("flex");
    }
    
    init() {
        // initalize elements -- precisa?
        document.getElementById("modal-bg")?.addEventListener("click", () => {
            this.close();
        });
    }

    setDemeter(demeter: Demeter | null) {
        if (demeter === null) throw new Error("demeter is null");
        this._demeter = demeter;
    }

    openMenu(index: number) {
        document.getElementById("div-block-modal")?.classList.remove("hidden");
        document.getElementById("div-block-modal")?.classList.add("flex");

        (document.getElementById("modal-block-index") as HTMLElement).innerHTML = `
            <div class="flex flex-col gap-5">
                <button id="modal-edit-block-btn">editar</button>
                <button id="modal-delete-block-btn">deletar</button>
            </div>
        `;

        (document.getElementById("modal-edit-block-btn") as HTMLElement)?.addEventListener("click", () => {
            this.openEditBlock(index); 
        });

        (document.getElementById("modal-delete-block-btn") as HTMLElement)?.addEventListener("click", () => {
            // a modal for confirmation?;
            // delete block
            // render
        });
    }

    openEditBlock(index: number) {
        const block = this._demeter?.getBlock(index);
        const type = block?._config.type;
        const hours = block?._config.time.hours;
        const minutes = block?._config.time.minutes;
        const seconds = block?._config.time.seconds;
        

        (document.getElementById("modal-block-index") as HTMLElement).innerHTML = `
            <div class="flex flex-col gap-5">
                <select name="type" id="modal-type-select">
                    <option value="focus" >foco</option>
                    <option value="break" ${type === BlockType.BREAK ? "selected" : ""}>pausa</option>
                </select>
                <input id="modal-hours-input" type="number" placeholder="horas" value="${hours}">
                <input id="modal-minutes-input" type="number" placeholder="minutos" value="${minutes}">
                <input id="modal-seconds-input" type="number" placeholder="segundos" value="${seconds}">
                <button id="modal-save-block" class="block-component border p-2">salvar</button>
            </div>
        `;

        (document.getElementById("modal-save-block") as HTMLElement).addEventListener("click", () => {
            this.close();
            const type = (document.getElementById("modal-type-select") as HTMLSelectElement).value === "focus" ? BlockType.FOCUS: BlockType.BREAK;
            const hours = Number((document.getElementById("modal-hours-input") as HTMLInputElement).value);
            const minutes = Number((document.getElementById("modal-minutes-input") as HTMLInputElement).value);
            const seconds = Number((document.getElementById("modal-seconds-input") as HTMLInputElement).value);

            if (hours === 0 && minutes === 0 && seconds === 0) throw new Error("cannot add an empty block");
            if (this._demeter === null) throw new Error("demeter not defined");
            this._demeter.getBlockList()[ index ] = new TimeBlock({type: type, time: { hours: hours, minutes: minutes, seconds: seconds }, index: index});
            //render
            this._cronRenderer?.renderDemeter(this._demeter);

        });


    }
    
    openAddBlock() {
        document.getElementById("div-block-modal")?.classList.remove("hidden");
        document.getElementById("div-block-modal")?.classList.add("flex");

        (document.getElementById("modal-block-index") as HTMLElement).innerHTML = `
            <div class="flex flex-col gap-5">
                <select name="type" id="modal-type-select">
                    <option value="focus">foco</option>
                    <option value="break">pausa</option>
                </select>
                <input id="modal-hours-input" type="number" placeholder="horas" value="0">
                <input id="modal-minutes-input" type="number" placeholder="minutos" value="0">
                <input id="modal-seconds-input" type="number" placeholder="segundos" value="0">
                <button id="modal-save-block" class="block-component border p-2">salvar</button>
            </div>
        `;

        (document.getElementById("modal-save-block") as HTMLElement).addEventListener("click", () => {
            this.close();
            const type = (document.getElementById("modal-type-select") as HTMLSelectElement).value === "focus" ? BlockType.FOCUS: BlockType.BREAK;
            const hours = Number((document.getElementById("modal-hours-input") as HTMLInputElement).value);
            const minutes = Number((document.getElementById("modal-minutes-input") as HTMLInputElement).value);
            const seconds = Number((document.getElementById("modal-seconds-input") as HTMLInputElement).value);

            if (hours === 0 && minutes === 0 && seconds === 0) throw new Error("cannot add an empty block");
            this._demeter?.addBlock(new TimeBlock({ type: type, time: { hours: hours, minutes: minutes, seconds: seconds }, index: null }));
            //render
            this._cronRenderer?.renderDemeter(this._demeter);

        });
    }

    setCronRenderer(renderer: CronRenderer) {
        this._cronRenderer = renderer;
    }
}