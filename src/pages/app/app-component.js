import Format from '../../utils/format';
import User from '../../services/user';

import ProtoService from '../../services/prototype-serivce';
import Auth from '../../components/auth/auth-component';

export default class AppPage{
    constructor(){
        new ProtoService();
        this.auth = new Auth();

        this.el = {};
        
        document.querySelectorAll('[id]').forEach(element => {
            this.el[Format.formatToCamelCase(element.id)] = element;
        });

        setTimeout(async () => {
            this.user = new User(this.auth.auth.user.email);
            this.user.name = this.auth.auth.user.displayName;
            this.user.email = this.auth.auth.user.email;
            this.user.photo = this.auth.auth.user.photoURL;
            
            await this.user.save();

            document.querySelector('title').innerHTML = this.user.name + ' Random chat';

            this.fetchContacts();
            // this.el['app'].css({display:'flex'});
            
            if(this.auth.isAuth)
                this.el['app'].dispatchEvent(new Event('isAuth'));
            
                this.notification(`Bem vindo(a) ${this.user.name}`);
        }, 300);
        this.closeBtnDialog();
        this.searchContact();
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

    async fetchUser(user){
        try{
            this.auth = await this.authService.fetchUser(user);
            this.el['profileName'].innerHTML = this.auth['name'];
            this.el['profileName'].setAttribute('title', this.auth['name']);
        }catch(e){
            console.error(e);
        }
    }

    closeBtnDialog(){
        this.el['dialogClose'].on('click', e => {
            this.el['dialog'].css({transform:'scale(0)'});
            setTimeout(() => {
                this.el['dialog'].hide();
            },300);
        });
        window.onclick = e => {
            if(e.target == this.el['dialog']){
                this.el['dialog'].css({transform:'scale(0)'});
                setTimeout(() => {
                    this.el['dialog'].hide();
                },300);
            }
        }
    }
    searchContact(){
        this.el['inputSearchContact'].on('keyup',async e => {
            try{
                await this.user.getContacts(e.target.value);
            }catch(e){
                console.error(e)
            }
        });
    }
    notification(text){
        document.querySelector('app-snackbar')
            .dispatchEvent(new CustomEvent('show', {detail: text}));
    }
}