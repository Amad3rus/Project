import { ReaderDom } from '../../app';
import LoginComponent from './login-component.html';
import Auth from '../../services/auth-service';
import Format from '../../utils/format';
import ProtoService from '../../services/prototype-serivce';
import FormValidationService from '../../services/form-validation-service';

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

        this.fb = new FormValidationService(this.el.loginForm);
        
        this.el.loginFromEmail.disabled = true;

        this.el.loginForm.on('submit', e => {
            e.preventDefault();
            // const formLogin = new FormData(this.el.loginForm);
            // console.log(formLogin.get('email'));
            const payload = this.el.loginForm.toJSON();

        });
        this.fb.manageState.validateState();
        this.loginWidthGoogle();
        this.showPassword();
        this.forgottenPassword();
        this.withoutAccount();
        this.backToFormLogin();
        this.loginWidthEmail();

        this.el.loginForm.on('form', e => {
            if(e.detail.size == 0) this.el.loginFromEmail.disabled = false;
            else this.el.loginFromEmail.disabled = true;
        });
    }

    loginWidthGoogle(){
        this.el.loginFromGoogle.on('click', async e => {
            this.isLogged = await this.auth.initAuth();
            if(this.isLogged.isAuth) this.el.loginForm.dispatchEvent(new Event('isAuth'));
        });
    }

    loginWidthEmail(){
        this.el.loginFromEmail.on('click', e => {
             this.el.login.querySelector('.notification').addClass('notify-active');
             setTimeout(() => {
                 this.el.login.querySelector('.notification').removeClass('notify-active');
             }, 3000);
         });
    }
    
    showPassword(){
        this.el.showPassword.on('click', e => {
            this.showTextPassword = !this.showTextPassword;

            if(this.showTextPassword){
                this.el.iconPassword.innerHTML = 'visibility';
                this.el.inputPassword.setAttribute('type', 'text');
            }else{
                this.el.iconPassword.innerHTML = 'visibility_off';
                this.el.inputPassword.setAttribute('type', 'password');
            }
        });
    }
    forgottenPassword(){
        this.el.forgottenAccount.on('click', e => {
            this.hideFormActive(3);
        });
    }
    withoutAccount(){
        this.el.withoutAccount.on('click', e => {
            this.hideFormActive(2);
        });
    }

    hideFormActive(tab){
        this.el.login.querySelectorAll('.form-container').forEach(form => {
            if(form.hasClass('out-login')) form.removeClass('out-login');
            
            if(form.hasClass('active-login')) {
                form.removeClass('active-login');
                form.addClass('out-login');

                setTimeout(() => {
                    form.hide();
                    form.removeClass('out-login');
                }, 1001);
            }
           
            if(form.getAttribute('tabindex') == tab) {
                form.css({display: 'flex'});
                setTimeout(() => {
                    form.addClass('active-login');
                }, 500);
            }
        });
    }

    backToFormLogin(){
        this.el.backButtonFromLoginForgottenAccount.on('click', e => this.showFormDefault());
        this.el.backButtonFromLoginWithoutAccount.on('click', e => this.showFormDefault());
    }
    showFormDefault(){
        this.el.login.querySelectorAll('.form-container').forEach(form => {
            if(form.hasClass('out-login')) form.removeClass('out-login');

            if(form.hasClass('active-login')) {
                form.removeClass('active-login');
                form.addClass('out-login');

                setTimeout(() => {
                    form.hide();
                    form.removeClass('out-login');
                }, 1001);
            }

            if(form.getAttribute('tabindex') == '1') {
                form.css({display: 'flex'});
                setTimeout(() => {
                    form.addClass('active-login');
                }, 500);
            }
        });
    }


}