import { ReaderDom } from '../../app';
import LoginComponent from './login-component.html';
import Auth from '../../services/auth-service';
import Format from '../../utils/format';
import ProtoService from '../../services/prototype-serivce';
import User from '../../services/user';

export default class Login extends HTMLElement{
    constructor(){
        super();
        this.appendChild(ReaderDom.appendComponent(LoginComponent));
        new ProtoService();
        this.el = {};

        this.querySelectorAll('[id]').forEach(element => {
            this.el[Format.formatToCamelCase(element.id)] = element;
        });

        this.el.loginForm.on('submit', e => {
            e.preventDefault();
            // const formLogin = new FormData(this.el.loginForm);
            // console.log(formLogin.get('email'));
            const payload = this.el.loginForm.toJSON();
        });

        this.loginWidthGoogle();
    }

    loginWidthGoogle(){
        this.el.loginFromGoogle.on('click', async e => {
            this.auth = new Auth();
            
            this.isLogged = await this.auth.initAuth();

            if(this.isLogged.isAuth){
                this.user = new User(this.isLogged.auth.user.email);
                this.user.name = this.isLogged.auth.user.displayName;
                this.user.email = this.isLogged.auth.user.email;
                this.user.photo = this.isLogged.auth.user.photoURL;
                
                await this.user.save();
    
                document.querySelector('title').innerHTML = this.user.name + ' Random chat';
    
                this.el.loginForm.dispatchEvent(new Event('isAuth'));
            }
        });
    }
}