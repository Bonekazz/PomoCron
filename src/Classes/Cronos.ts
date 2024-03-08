// features:
// -- Iniciar, pausar, reiniciar *bloco* atual
// -- Avançar e retomar blocos
// -- selecionar um bloco para ser o atual

import { CronState } from "../Types/BlockTypes";
import CronRenderer from "./CronRenderer";
import Demeter from "./Demeter";
import TimeBlock from "./TimeBlock";

// propriedades:
// -- Pomodoro atual, contendo a lista de blocos
// -- bloco atual
// -- estado do bloco atual

export default class Cronos
{
    private _currentDemeter: Demeter | null = null;
    private _currentBlock: TimeBlock | null = null;                         // A copy of the Demeter current block
    private _currentState: CronState | null = null;       // Running, Paused, Finished;

    private _blockInterval: number | null = null;

    private _renderer: CronRenderer;

    constructor(renderer: CronRenderer) {
        this._renderer = renderer;
    }

    runCurrentBlock() {
        if (this._currentDemeter === null) throw new Error("There is no Demeter available");
        if (this._currentState === CronState.RUNNING) {
            console.log("Block is already running.");
            return;
        }
        console.log("Cronos setted to run!");
        
        this._currentState = CronState.RUNNING;
        
        this._blockInterval = setInterval(() =>
        {
            if (this._currentBlock === null) {
                if (this._blockInterval === null) return;
                clearInterval(this._blockInterval);
                throw new Error("There is no block available");
            }
            
            if (this._currentDemeter === null) {
                if (this._blockInterval === null) return;
                clearInterval(this._blockInterval);
                throw new Error("demeter was removed while running");
            }
            if (this._currentState === CronState.PAUSED)
            {   
                if (this._blockInterval === null) return;
                clearInterval(this._blockInterval);
                return;
            }

        //    if (this._currentState === CronState.FINISHED) {
        //        if (this._blockInterval === null) return;
        //        clearInterval(this._blockInterval);
        //        this.advanceBlock();
        //        this.runCurrentBlock();
        //        return;
        //    }
            
            this.burnCurrentBlock();
            this._renderer.renderBlockTime(this._currentBlock._config.time);

        }, 1000);
    };

    burnCurrentBlock() {
        if (this._currentBlock === null) throw new Error("there is no block setted");
        
        this._currentBlock._config.time.seconds -= 1;
        if (this._currentBlock._config.time.seconds <= 0) {
            this._currentBlock._config.time.seconds = 59;
            this._currentBlock._config.time.minutes -= 1;
        }

        if (this._currentBlock._config.time.minutes === 0 && this._currentBlock._config.time.seconds === 0) {
            this._currentBlock._config.time.hours -= 1;
            this._currentBlock._config.time.minutes = 59;
            this._currentBlock._config.time.seconds = 59;
        }

        if (this._currentBlock._config.time.hours === 0 && this._currentBlock._config.time.minutes === 0 && this._currentBlock._config.time.seconds === 0) {
            this._currentState = CronState.FINISHED;
        }
        
        console.log(this._currentBlock._config.time.hours, this._currentBlock._config.time.minutes, this._currentBlock._config.time.seconds);
    }
    
    resetCurrentBlock() {
        if (this._currentDemeter === null) throw new Error("Nao há nenhum Demeter selecionado");
        if (this._currentBlock === null) throw new Error("Demeter atual está vazio");
    
        this._currentBlock._config.time = this._currentDemeter.getCurrentBlock()._config.time;
    }
    
    setCurrentBlock(block: TimeBlock) {
        this._currentState = CronState.PAUSED;
        this._currentBlock = {...block};
        //this._renderer.renderBlockConfig(this._currentBlock); --> will render the title and the time;
    };

    backBlock(){
        if (this._currentDemeter === null) throw new Error("Nao há nenhum Demeter selecionado");
        this.setCurrentBlock(this._currentDemeter.getPreviousBlock());
    };
    advanceBlock() {
        if (this._currentDemeter === null) throw new Error("Nao há nenhum Demeter selecionado");
        this.setCurrentBlock(this._currentDemeter.getNextBlock());
    };

    setDemeter(demeter: Demeter) {
        this._currentDemeter = demeter;
        this.setCurrentBlock(this._currentDemeter.getCurrentBlock());
        this._renderer.renderDemeter(this._currentDemeter);
    }

    getDemeter() {
        if (this._currentDemeter === null) return null;
        return this._currentDemeter;
    }

    removeCurrentDemeter() {
        if (this._currentDemeter === null) throw new Error("There is no Demeter to remove.");
        //this._currentState = CronState.PAUSED;
        this._currentDemeter = null;
        this._renderer.renderDemeter(null);
    }
}