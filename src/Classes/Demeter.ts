// A TimeBlock Buffer

import { BlockType } from "../Types/BlockTypes";
import TimeBlock from "./TimeBlock";

// features:
// -- retornar o proximo bloco
// -- trocar a ordem dos blocos

export default class Demeter {

    private _blockList: TimeBlock[]; // array of blocks

    private _index: number = 0;
    
    constructor() {
        // inicializar com 3 blocos por padrão
        const time1 = new TimeBlock({ type: BlockType.FOCUS, time: { hours: 0, minutes: 25, seconds: 0 } });
        const time2 = new TimeBlock({ type: BlockType.BREAK, time: { hours: 0, minutes: 5, seconds: 0 } });
        const time3 = new TimeBlock({ type: BlockType.FOCUS, time: { hours: 0, minutes: 25, seconds: 0 } });
        this._blockList = [ time1, time2, time3 ];
    }

    getCurrentBlock() {
        return this._blockList[ this._index ];
    }
    getPreviousBlock() {
        return this._blockList[ --this._index ];
    }
    getNextBlock() {
        return this._blockList[++this._index];
    }

    getBlockList() {
        return this._blockList;
    }
    
}