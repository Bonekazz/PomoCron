// Demeter will be a stack of timeBlocks
// functionalities:
// --- add a timeblock
// --- delete a timeblock
// --- edit a timeblock

import ITime from "../Interfaces/ITime";

interface PileObject {
    id: string;
    index: number;
    object: ITime;
}

export default class Demeter
{

    private _pile: PileObject[] | undefined;
    private _tittle: string | undefined;

    constructor()
    { }

    add(id: string)
    { }

    remove(id: string)
    { }

    edit(id: string)
    { }

    getTitle()
    {
        return this._tittle;
    }


}