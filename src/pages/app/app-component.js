import Format from '../../utils/format';
import Messages from '../../services/messages';
import Contacts from '../../services/contacts';

import User from '../../services/user';
import Validation from '../../services/validations';

import RenderView from '../../services/renderView';
import ProtoService from '../../services/prototype-serivce';
import Auth from '../../components/auth/auth-component';

export default class AppPage{
    constructor(){
        new ProtoService();
        this.auth = new Auth();
        this.render = new RenderView();
        this.messagesService = new Messages();
        this.contactsService = new Contacts();
        this.validations = new Validation();

        this.el = {};
        this.config = { animate:'animated',fadeinleft:'fadeInLeft',left:'hide-left',sidebar:false};
        
        document.querySelectorAll('[id]').forEach(element => {
            this.el[Format.formatToCamelCase(element.id)] = element;
        });

        setTimeout(async () => {
            this.userService = new User(this.auth.auth.user.email);
            this.userService.name = this.auth.auth.user.displayName;
            this.userService.email = this.auth.auth.user.email;
            this.userService.photo = this.auth.auth.user.photoURL;
            
            await this.userService.save();

            document.querySelector('title').innerHTML = this.userService.name + ' Random chat';

            this.fetchContacts();
            this.el['app'].css({display:'flex'});
            this.notification(`Bem vindo(a) ${this.userService.name}`);
        }, 300);
        this.closeBtnDialog();
    }

    async fetchContacts(){
        try{
            this.userService.on('contactschange', docs => {
                // this.fetchContactFromAttachment(docs);
                const contacts = [];
                docs.forEach(doc => { contacts.push(doc.data()); });
                document.querySelector('app-list-contacts').dataset.contacts = JSON.stringify(contacts);
                document.querySelector('app-list-contacts').dispatchEvent(new Event('contactIsLoaded'))
            });
            await this.userService.getContacts();
        }catch(e){
            console.error(e)
        }
    }

    async fetchUser(user){
        try{
            this.auth = await this.authService.fetchUser(user);
            this.fetchMessages();
            this.el['profileName'].innerHTML = this.auth['name'];
            this.el['profileName'].setAttribute('title', this.auth['name']);
        }catch(e){
            console.error(e);
            this.validations.setThrowError('003', 'tentando fazer login', 'app controller');
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
    notification(text){
        document.querySelector('app-snackbar')
            .dispatchEvent(new CustomEvent('show', {detail: text}));
    }
}