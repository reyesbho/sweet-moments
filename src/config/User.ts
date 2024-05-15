export class User{
    id:number = 0;
    token:string = '';
    user: string = '';
    email: string = '';
    constructor(id: number, token:string, user:string, email: string){
        this.id = id;
        this.token = token;
        this.user = user;
        this.email = email;
    }
}