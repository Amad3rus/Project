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
        this.auth = new Auth();

        this.el = {};
        this.showTextPassword = false;

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
        this.showPassword();
    }

    loginWidthGoogle(){
        this.el.loginFromGoogle.on('click', async e => {
            this.isLogged = await this.auth.initAuth();
            if(this.isLogged.isAuth) this.el.loginForm.dispatchEvent(new Event('isAuth'));
        });
    }

    showPassword(){
        this.el.showPassword.on('click', e => {
            this.showTextPassword = !this.showTextPassword;

            if(this.showTextPassword){
                this.el.iconPassword.innerHTML = 'visibility_off';
                this.el.inputPassword.setAttribute('type', 'text');
            }else{
                this.el.iconPassword.innerHTML = 'visibility';
                this.el.inputPassword.setAttribute('type', 'password');
            }
        });
    }
}