// A TimeBlock Buffer

import { BlockType, ITime, ITimeBlock } from "../Types/BlockTypes";
import TimeBlock from "./TimeBlock";

// features:
// -- retornar o proximo bloco
// -- trocar a ordem dos blocos
// -- adicionar/remover blocos
// -- editar blocos;


// Pre-conditions:
// -- demeter não pode estar vazio
// -- demeter não aceita blocos totalmente vazios ou com valores negativos

export default class Demeter {

    private _blockList: TimeBlock[]; // array of blocks

    private _index: number = 0;
    
    constructor() {
        // inicializar com 3 blocos por padrão
        const time1 = new TimeBlock({ type: BlockType.FOCUS, time: { hours: 0, minutes: 0, seconds: 1 }, index: 0});
        const time2 = new TimeBlock({ type: BlockType.BREAK, time: { hours: 0, minutes: 0, seconds: 2 }, index: 1});
        const time3 = new TimeBlock({ type: BlockType.FOCUS, time: { hours: 0, minutes: 0, seconds: 3 }, index: 2});
        const time4 = new TimeBlock({ type: BlockType.BREAK, time: { hours: 0, minutes: 0, seconds: 2 }, index: 3});
        this._blockList = [ time1, time2, time3, time4 ];
    }

    getCurrentBlock() {
        console.log(`index atual: ${this._index}`);
        return this._blockList[ this._index ];
    }
    getPreviousBlock() {
        return this._blockList[ --this._index ];
    }
    getNextBlock() {
        this._index++;
        if (this._index === this._blockList.length) {
            this._index = this._blockList.length - 1;
            return null;
        }
        console.log(`index incrementado para: ${this._index}`);
        return this._blockList[this._index];
    }

    getBlockList() {
        return this._blockList;
    }
    getBlock(index: number) {
        return this._blockList[ index ];
    }

    addBlock(block: TimeBlock) {
        block._config.index = this._blockList.length;
        this._blockList.push(block);
        console.log(this._blockList as {});
        
    }
    removeBlock(index: number) { }
    editBlock(index: number, time: ITime) { }
    
}