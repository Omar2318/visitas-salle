export interface AreaProps {
    id: string;
    name: string;
}

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

    public toObject(): AreaProps{
        return {
            id: this._id,
            name: this._name
        }
    }

    public static fromObject(object: Record<string, any>){
        const {id, name} = object;
        return new AreaEntity(id,name);
    }
    
}