export class Pokemon{

    public id: number;
    public name: string;
    public image: string;
    public abilities: string[];
    public types: string[];

   constructor(){
        this.id=0;
        this.name="";
        this.image="";
        this.abilities= [];
        this.types=[];
    }
}