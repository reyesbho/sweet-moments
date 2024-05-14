export class User{
    id:number = 0;
    token:string = '';
    constructor(id: number, token:string){
        this.id = id;
        this.token = token;
    }
}