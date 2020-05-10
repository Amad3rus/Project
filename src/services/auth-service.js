import Firebase from "./firebase";

export default class Auth{
    constructor(){
        this.isAuth = false;
        this.fbService = new Firebase();
        this.initAuth();
    }

    async initAuth(){
        try{
            this.auth = await this.fbService.initAuth();
            this.isAuth = true;
        }catch(e){
            console.error(e);
        }
    }
}