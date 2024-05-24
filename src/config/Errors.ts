
const errorFactory = (name: string) => {
    return class BussinesError extends Error {
        constructor(message: string){
            super(message);
            this.name = name;
        }
    }
}

export const LoginError = errorFactory("LoginError");