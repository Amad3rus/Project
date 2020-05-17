import { ReaderDom } from '../../app';
import LoginComponent from './login-component.html';
import Auth from '../../services/auth-service';
import Format from '../../utils/format';
import ProtoService from '../../services/prototype-serivce';
import FormValidationService from '../../services/form-validation-service';
import HttpRequestService from '../../services/http-request-service';

export default class Login extends HTMLElement{
    constructor(){
        super();
        this.appendChild(ReaderDom.appendComponent(LoginComponent));
        new ProtoService();
        this.auth = new Auth();
        this.http = new HttpRequestService();
        this.el = {};

        this.showTextPassword = false;

        this.querySelectorAll('[id]').forEach(element => {
            this.el[Format.formatToCamelCase(element.id)] = element;
        });

        this.fb = new FormValidationService(this.el.loginForm);
       
        this.fb.manageState.validateState();
        this.loginWidthGoogle();
        this.showPassword();
        this.forgottenPassword();
        this.withoutAccount();
        this.backToFormLogin();
        this.loginWidthEmail();
        this.onSubmit();
        this.resetForm();

    }
    loginWidthGoogle(){
        this.el.loginFromGoogle.on('click', async e => {
            this.isLogged = await this.auth.initAuth();
            if(this.isLogged.isAuth) this.el.loginForm.dispatchEvent(new Event('isAuth'));
        });
    }
    loginWidthEmail(){
    }
    showNotification(msg){
        this.el.login.querySelector('.notification').addClass('notify-active');
        setTimeout(() => {
            this.el.login.querySelector('.notification').removeClass('notify-active');
            this.showFormDefault();
        }, 3000);
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
            this.fb.rules.empty(3);
            this.hideFormActive(3);
        });
    }
    withoutAccount(){
        this.el.withoutAccount.on('click', e => {
            this.fb.rules.empty(2);
            this.hideFormActive(2);
        });
    }
    hideFormActive(tab){
        this.fb.rules.empty(1);
        this.resetForm();
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
        this.resetForm();
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
    onSubmit(){
        this.el.loginForm.on('form', e => {
            e.target.querySelectorAll('[tabindex]').forEach(tab => {
                 if(tab.hasClass('active-login')){
                     switch(tab.getAttribute('tabindex')){
                        case '1':
                            (e.detail.size == 0 ) ? this.el.loginFromEmail.disabled = false : this.el.loginFromEmail.disabled = true;
                            break;
                        case '2':
                            break;
                        case '3':
                            this.fb.validationsState.delete('password');
                            (e.detail.size == 0) ? this.el.loginFromEmailSend.disabled = false : this.el.loginFromEmailSend.disabled = true;
                            break;
                    }
                }
            });
        });
        this.el.loginForm.on('submit', async e => {
            e.preventDefault();
            e.stopPropagation();
            this.sendPayload();
        });

        this.el.inputEmailForgotten.on('keyup', e => {
            if(e.key == 'Enter' && !this.el.loginFromEmailSend.disabled) this.sendPayload();
        });
    }
    async sendPayload(){
        const payload = this.el.loginForm.toJSON();
        this.showNotification();
        this.resetForm();
        delete payload.password;
        await this.http.resetPasswordl(JSON.stringify(payload));
        // window.open('mailto:kakashi.kisura@gmail.com'); // open app default browser or mobile
    }
    resetForm(){
        this.el.loginForm.reset();
        this.fb.manageState.validateState();
        this.el.loginFromEmailSend.disabled = true;
        this.el.loginFromEmail.disabled = true;
        this.el.loginFromEmailNew.disabled = true;
    }
}