import Format from '../../utils/format';
import User from '../../services/user';

import ProtoService from '../../services/prototype-serivce';
import Auth from '../../services/auth-service';
import RoutesService from '../../services/routes-service';

export default class AppPage{
    constructor(){
        new ProtoService();
        this.router = new RoutesService();
        this.el = {};
        
        document.querySelectorAll('[id]').forEach(element => {
            this.el[Format.formatToCamelCase(element.id)] = element;
        });

        if(!localStorage.getItem('user')) this.router.redirectTo('login');

        this.isLogged = JSON.parse(localStorage.getItem('user'));

        if(this.isLogged){
            this.auth = new Auth();

            this.fetchUser();
            this.fetchContacts();
            // this.searchContact();
        }
    }

    async fetchContacts(){
        try{
            this.user.on('contactschange', docs => {
                const contacts = [];
                docs.forEach(doc => { contacts.push(doc.data()); });
                document.querySelector('app-list-contacts')
                    .dispatchEvent(new CustomEvent('contactIsLoaded', {detail: contacts}));
            });
            await this.user.getContacts();
        }catch(e){
            console.error(e)
        }
    }

    async fetchUser(){
        try{
            this.user = new User(this.isLogged.user.email);
            this.user.name = this.isLogged.user.displayName;
            this.user.email = this.isLogged.user.email;
            this.user.photo = this.isLogged.user.photoURL;
            
            await this.user.save();
    
            document.querySelector('title').innerHTML = this.user.name + ' Random chat';
            
            this.el.app.dispatchEvent(new Event('isAuth'));
            
            this.notification(`Bem vindo(a) ${this.user.name}`);

        }catch(e){
            console.error(e);
        }
    }

    // closeBtnDialog(){
    //     this.el['dialogClose'].on('click', e => {
    //         this.el['dialog'].css({transform:'scale(0)'});
    //         setTimeout(() => {
    //             this.el['dialog'].hide();
    //         },300);
    //     });
    //     window.onclick = e => {
    //         if(e.target == this.el['dialog']){
    //             this.el['dialog'].css({transform:'scale(0)'});
    //             setTimeout(() => {
    //                 this.el['dialog'].hide();
    //             },300);
    //         }
    //     }
    // }
    // searchContact(){
    //     this.el['inputSearchContact'].on('keyup',async e => {
    //         try{
    //             await this.user.getContacts(e.target.value);
    //         }catch(e){
    //             console.error(e)
    //         }
    //     });
    // }
    notification(text){
        document.querySelector('app-snackbar')
            .dispatchEvent(new CustomEvent('show', {detail: text}));
    }
}