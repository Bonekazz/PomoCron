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

        console.log("Cronos setted to run!");
        
        //this._blockInterval = setInterval(() =>
        //{
        //    if (this._currentState === CronState.PAUSED)
        //    {   
        //        if (this._blockInterval === null) return;
        //        clearInterval(this._blockInterval);
        //        return;
        //    }

        //    if (this._currentState === CronState.FINISHED) {
        //        if (this._blockInterval === null) return;
        //        clearInterval(this._blockInterval);
        //        this.advanceBlock();
        //        this.runCurrentBlock();
        //        return;
        //    }
            
            //this.burnCurrentBlock();
            //this._renderer.renderBlockTime(this._currentBlock.Time); --> will render the time continuously

        //}, 1000);
    };
    
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
        this._currentDemeter = null;
        this._renderer.renderDemeter(null);
    }
}