import Firebase from "./firebase";

export default class Auth{
    constructor(){
        this.isAuth = false;
        this.fbService = new Firebase();
    }

    async initAuth(){
        return new Promise(async (resolve, reject) => {
            try{
                this.auth = await this.fbService.initAuth();
                this.isAuth = true;
                resolve({auth:this.auth, isAuth: this.isAuth});
            }catch(e){
                console.error(e);
                reject(e);
            }
        });
    }
    async initAuthWidthEmailPassword(payload){
        return new Promise(async (resolve, reject) => {
            try{
                this.auth = await this.fbService.initLoginWidthEmail(payload);
                this.isAuth = true;
                resolve(this.auth);
            }catch(e){
                console.error(e);
                reject(e)
            }
        });
    }
}