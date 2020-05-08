import { ReaderDom } from '../../app';
import SidebarComponent from './sidebar-component.html';
import Format from '../../utils/format';
import { Wordlist } from '../../utils/wordlist';
import User from '../../services/user';
import Auth from '../auth/auth-component';
import RenderView from '../../services/renderView';

export default class Sidebar extends HTMLElement{
    constructor(){
        super();
        this.appendChild(ReaderDom.appendComponent(SidebarComponent));
        this.el = {};
        this.auth = new Auth();
        this.render = new RenderView();

        this.querySelectorAll('[id]').forEach(element => {
            this.el[Format.formatToCamelCase(element.id)] = element;
        });
        
        this.config = { animate:'animated',fadeinleft:'fadeInLeft',left:'hide-left',sidebar:false};
        
        this.initEvents();
    }

    initEvents(){
        this.openAndHidePanel();
        this.eventEditName();
        this.eventProfileAddContact();
        this.eventProfileAddContact();
        this.closeAllPanelLeft();
        this.setProfile();
        this.eventRizeWindow();
    }
    eventRizeWindow(){
        window.addEventListener('resize', (e) => {
            if(e.target.innerWidth <= 1024){
                this.removeClass(this.config.animate);
                this.removeClass(this.config.fadeinleft);
                this.style.width = 0;
                this.config.sidebar = true;
            }else{
                this.removeClass(this.config.left);
                this.addClass(this.config.animate);
                this.addClass(this.config.fadeinleft);
                this.style.width = '100%';
                this.config.sidebar = false;
            }
        });
    }
    setProfile(){
        setTimeout(async () => {
            this.user = new User(this.auth.auth.user.email);
            this.user.name = this.auth.auth.user.displayName;
            this.user.email = this.auth.auth.user.email;
            this.user.photo = this.auth.auth.user.photoURL;
            
            this.user.on('datachange', e => {
                this.el['noPhotoUrl'].hide();
                this.el['noStatusHeaderProfile'].hide();
                this.el['profileSetPhoto'].hide();
    
                this.el['profileConfigImage'].css({display:'inline-block'});
                this.el['profileConfigImage'].src = e.photo;
    
                this.el['photoUrl'].show();
                this.el['photoUrl'].src = e.photo;
    
                this.el['statusHeaderProfile'].show();
                this.el['statusHeaderProfile'].src = e.photo;
    
                this.el['editName'].innerHTML = e.name;
                this.el['profileName'].innerHTML = e.name;
                this.el['profileName'].setAttribute('title', e.name);
                
                this.el['logout'].show();
                this.el['logout'].on('click', e => localStorage.removeItem('user'));
            });

            this.user.on('contactschange', contacts => {
                this.fetchContactToStorage(contacts);
            });

            await this.user.save();
            await this.user.getContacts();
        }, 300);
    }
    fetchContactToStorage(contacts){
        this.el['contactsProfile'].innerHTML = '';
        contacts.forEach((value, index) => {
            let contact = value.data();
            let li = document.createElement('li');
            li.innerHTML += this.render.renderListContact(contact);
            li.querySelectorAll('button .contact-image').forEach(contact => contact.hide());
            li.onclick = e => this.openPanelConversation(contact);
            this.el['contactsProfile'].appendChild(li);
        });
    }
    openPanelConversation(contact){
        this.dispatchEvent(new CustomEvent('contactchange',{'detail':contact}))
    }
    openAndHidePanel(){
        this.el['headerMessages'].on('click', e => {
            this.el['panelContacts'].show();
            setTimeout(() => {
                this.el['panelContacts'].addClass('open-panel');
            },300);
        });
        
        this.el['closePanelProfile'].on('click', e => {
            this.el['panelProfile'].removeClass('open-panel');
            setTimeout(() => {
                this.el['panelProfile'].hide();
            }, 300);
        });

        this.el['sidebarProfile'].onclick = e =>{
            this.el['panelProfile'].show();
            setTimeout(() => {
                this.el['panelProfile'].addClass('open-panel');
            },300);
        };

        this.el['closePanelContacts'].on('click', e => {
            this.el['panelContacts'].removeClass('open-panel');
            setTimeout(() => {
                this.el['panelContacts'].hide();
            }, 300);
        });
    }
    eventEditName(){
        this.el['editName'].on('focus', e => {
            e.target.innerHTML = '';
        });
        
        this.el['editName'].on('keypress', e => {
            if(e.target.innerHTML.length < 30){
            }else{
                this.el['editName'].setAttribute('contenteditable', false);
            }
            if(e.key == 'Enter'){
                e.preventDefault();
                this.el['editNameEnter'].click();
            }
        });
        
        this.el['editNameEnter'].on('click', async e => {
            this.el['editNameEnter'].disabled = true;
            let permission = true;
            let anonimous = '';
            
            Wordlist.forEach(l => {
               if(l.toLocaleLowerCase() == this.el['editName'].innerHTML.toLocaleLowerCase()){
                    permission = false;
                    anonimous = 'Anonimous';
               }
            });

            if(!permission){
                this.el['editNameEnter'].disabled = false;
                this.snackbarService.callNotification('offline', `nome ${this.el['editName'].innerHTML} inválido`, '&times;');
            }else{
                this.userService.name = this.el['editName'].innerHTML;
                await this.userService.save();
                this.el['editNameEnter'].disabled = false;
            }
        });
    }
    eventProfileSetPhoto(){
        this.el['profileSetPhoto'].on('click', setPhoto => {
            this.el['profileInputPhoto'].click();
        });
    }
    eventProfileAddContact(){
        this.el['profileAddContact'].on('submit', e => {
            e.preventDefault();
            const formAddContact = new FormData(this.el['profileAddContact']);
            const contact = new User(formAddContact.get('email'));

            contact.on('datachange', async e => {
                if(e.name){
                    await this.userService.addContact(contact);
                    console.info('novo contato adicionado.');
                    this.snackbarService.callNotification('online', 'novo contato adicionado.', '&check;');
                    this.closeAllPanelLeft();
                }else{
                    this.snackbarService.callNotification('offline', 'usuário não encontrado', '&times;');
                }
            });
        });
    }
    eventHideMenuOnclick(){
        this.el['hideMenu'].onclick = e => {
            e.preventDefault();
            if(this.config.sidebar && !this.el['sidebar'].hasClass(this.config.animate)){
                this.el['sidebar'].addClass(this.config.animate);
                this.el['sidebar'].addClass(this.config.fadeinleft);
                this.el['sidebar'].style.width = '100%';
                this.config.sidebar = false;
                this.el['menuSetinha'].checked = true;
            }else{
                this.el['sidebar'].removeClass(this.config.animate);
                this.el['sidebar'].removeClass(this.config.fadeinleft);
                this.el['sidebar'].style.width = 0;
                this.config.sidebar = true;
                this.el['menuSetinha'].checked = false;
            }
        }
    }
    closeAllMainPanel(){
        this.el['chat'].hide();
        this.el['takePhoto'].hide();
        this.el['previewPanelFile'].hide();
        this.el['imageCamera'].hide();
        this.el['statusPhotoTakeSend'].hide();
        this.el['iconFile'].hide();
        this.el['containerDocumentPreview'].hide();
        this.el['statusAttachFile'].disabled = false;
    }
    closeAllPanelLeft(){
        this.el['panelProfile'].removeClass('open-panel');
        this.el['panelContacts'].removeClass('open-panel');

        setTimeout(() => {
            this.el['panelProfile'].hide();
            this.el['panelContacts'].hide();
        }, 300)
    }
}
