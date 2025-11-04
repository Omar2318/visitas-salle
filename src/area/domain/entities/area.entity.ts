export class AreaEntity {
    constructor(
        private readonly _id: string,
        private readonly _name: string,
    ){}

    public get id(){
        return this._id;
    }

    public get name(){
        return this._name;
    }
    
}