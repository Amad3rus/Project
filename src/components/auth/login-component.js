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
        this.format = new Format();

        this.el = {};

        this.showTextPassword = false;
        this.showTextPasswordNoAccount = false;

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
        this.onSubmit();
        this.resetForm();
    }
    loginWidthGoogle(){
        this.el.loginFromGoogle.on('click', async e => {
            this.isLogged = await this.auth.initAuth();
            if(this.isLogged.isAuth) this.el.loginForm.dispatchEvent(new Event('isAuth'));
        });
    }
    showNotification(msg, time = 3000){
        return new Promise((resolve, reject) => {
            this.el.login.querySelector('.notification').addClass('notify-active');
            this.el.notificationLoginTooltipContent.innerHTML = msg;
            setTimeout(() => {
                this.el.login.querySelector('.notification').removeClass('notify-active');
                resolve(true);
            }, time);
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
        this.el.showPasswordNew.on('click', e => {
            this.showTextPasswordNoAccount = !this.showTextPasswordNoAccount;
            
            if(this.showTextPasswordNoAccount){
                this.el.iconPasswordNoAccount.innerHTML = 'visibility';
                this.el.inputPasswordNoAccount.setAttribute('type', 'text');
            }else{
                this.el.iconPasswordNoAccount.innerHTML = 'visibility_off';
                this.el.inputPasswordNoAccount.setAttribute('type', 'password');
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
        this.el.backButtonFromLoginFromCode.on('click', e => this.showFormDefault());
        this.el.btnVerifyCodeCancel.on('click', e => this.showFormDefault());
    }
    showFormDefault(){
        this.resetForm();
        this.resetLocalStorage();
        this.format.clearInterval();
        
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
                            (e.detail.size == 0) ? this.el.loginFromEmail.disabled = false : this.el.loginFromEmail.disabled = true;
                            break;
                        case '2':
                            (e.detail.size == 0) ? this.el.loginFromEmailNew.disabled = false : this.el.loginFromEmailNew.disabled = true;
                            break;
                        case '3':
                            this.fb.validationsState.delete('password');
                            (e.detail.size == 0) ? this.el.loginFromEmailSend.disabled = false : this.el.loginFromEmailSend.disabled = true;
                            break;
                        case '4':
                            (this.el.inputCodeFromEmail.value.length == 7) ? this.el.btnVerifyCode.disabled = false : this.el.btnVerifyCode.disabled = true;
                            break;
                    }
                }
            });
        });
        this.el.loginFromEmailNew.on('click', e => this.createPayload('create'));
        this.el.loginFromEmail.on('click', e => this.createPayload('login'));
        this.el.loginFromEmailSend.on('click', e => this.createPayload('reset'));
        this.el.btnVerifyCode.on('click', e => this.createPayload('code'));

        this.el.loginFromEmailNew.on('keyup', e => {
            if(e.key == 'Enter' && !this.el.loginFromEmailNew.disabled) this.createPayload('create');
        });
        this.el.inputEmailForgotten.on('keyup', e => {
            if(e.key == 'Enter' && !this.el.loginFromEmailSend.disabled) this.createPayload('reset');
        });
        this.el.inputPassword.on('keyup', e => {
            if(e.key == 'Enter' && !this.el.loginFromEmail.disabled) this.createPayload('login');
        });
        
        this.el.inputCodeFromEmail.on('paste', e => e.preventDefault());
        
        this.el.inputCodeFromEmail.on('keydown', e => {
            if(e.key == "Enter" && !this.el.btnVerifyCode.disabled) this.createPayload('code');
            this.el.inputCodeFromEmail.value = Format.inputMask(this.el.inputCodeFromEmail, 'code');
        });
    }
    createPayload(type){
        let payload;
        switch(type){
            case 'login':
                payload = { "password":this.el.inputPassword.value, "email":this.el.inputEmailLogin.value }
                this.loginWidthPass(payload);
                break;
            case 'reset':
                payload = { "email":this.el.inputEmailForgotten.value }
                this.resetPassword(payload);
                break;
            case 'create':
                payload = { "password":this.el.inputPasswordNoAccount.value, "email":this.el.inputEmailNoAccount.value }
                this.createAccount(payload);
                break;
            case 'code':
                payload = { "code": Format.removeMask(this.el.inputCodeFromEmail.value, 'code').toUpperCase() }
                this.validateCode(payload);
                break;
        }
        this.resetForm();
        // window.open('mailto:kakashi.kisura@gmail.com'); // open app default browser or mobile
    }
    async resetPassword(payload){
        await this.showNotification(`Código enviado ao E-mail: <strong style="font-size:16px; color:white;" >${payload.email}</strong>`, 3000);
        this.hideFormActive(4);
        this.el.showEmailToGetCode.innerHTML = payload.email;
        this.format.timerRegressive(60 * 5, this.el.timerInputCode);
        this.el.timerInputCode.on('timeout', async e => {
            await this.showNotification('Time Out');
            this.showFormDefault();
        });
        const resetPasswordToken = await this.http.resetPasswordl(JSON.stringify(payload));
        localStorage.setItem('resetPasswordToken', resetPasswordToken);
    }
    async loginWidthPass(payload){
        console.log(payload);
    }
    async createAccount(payload){
        console.log(payload);
    }
    async validateCode(payload){
        const localCode = JSON.parse(localStorage.getItem('resetPasswordToken'));
        const payloadToSend = Object.assign(payload, localCode);
        this.resetLocalStorage();
        try{
            await this.http.validateCode(JSON.stringify(payloadToSend));
            await this.showNotification('Code validado');
            this.showFormDefault();
        }catch(e){
            await this.showNotification('<span style="color:var(--color-red); font-size: 14px;">Código invalido</span>')
        }
    }
    resetForm(){
        this.el.loginForm.reset();
        this.fb.manageState.validateState();
        this.el.loginFromEmailSend.disabled = true;
        this.el.loginFromEmail.disabled = true;
        this.el.loginFromEmailNew.disabled = true;
        this.el.btnVerifyCode.disabled = true;
    }
    resetLocalStorage(){
        if(localStorage.getItem('resetPasswordToken')) localStorage.removeItem('resetPasswordToken');
    }
}