import User from '../services/user';
import Format from '../utils/format';
import Contacts from './contacts';
import Model from './model';
import RenderView from './renderView';

export default class Messages extends Model{
    constructor(){
        super();
        this.messages = [
            {
                name:'Kakashi',
                message:'olá',
                time: new Date().getTime(),
                id: Format.createUid()
            },
            {
                name:'Maria',
                message:'já estou aqui',
                time: new Date().getTime(),
                id:Format.createUid()
            },
            {
                name:'João',
                message:'Não foi?',
                time: new Date().getTime(),
                id:Format.createUid()
            },
            {
                name:'Vinícius',
                message:'tudo bem?',
                time: new Date().getTime(),
                id:Format.createUid()
            },
            {
                name:'Vinícius',
                message:'tudo bem?',
                time: new Date().getTime(),
                id:Format.createUid()
            },
            {
                name:'Vinícius',
                message:'Hoje não?',
                time: new Date().getTime(),
                id:Format.createUid()
            }
        ]
        this.type = 'contact';

        this.content = {
            message:'oi',
            name:'kakashi',
            time:Date.now()
        }
    }

    fetchMessages(value){
        return new Promise(async (resolve, reject) => {
            try{
                // const contacts = await this.contact.fetchContacts(value);
                // contacts.forEach(contact => { contact.messages = this.messages; });
                // resolve(contacts);
            }catch(e){
                console.error(e);
                reject(e);
            }
        });
    }
    get content(){ return this.data.content;};
    set content(value){this.data.content = value};

    get type(){ return this.data.type;};
    set type(value){this.data.type = value};

    get timestamp(){ return this.data.timestamp;};
    set timestamp(value){this.data.timestamp = value};

    get status(){ return this.data.status;};
    set status(value){this.data.status = value};

    getViewElement(){
        const div = document.createElement('div');

        switch(this.type){
            case 'contact':
                div.innerHTML = RenderView.messageContact(this.content);
                div.querySelectorAll('.receive').forEach(contact => contact.onclick = e => this.extractInfoFromContact(this.content));
                break;
            case 'audio':
                div.innerHTML = RenderView.messageAudio(this.content);
                break;
            case 'video':
                div.innerHTML = RenderView.messageVideo(this.content);
                break;
            case 'image':
                div.innerHTML = RenderView.messageImage(this.content);
                break;
            case 'document':
                div.innerHTML = RenderView.messageDocument(this.content);
                break;
            default:
                div.innerHTML = RenderView.messageText(this.content);
        }
        return div;
    }
    
    extractInfoFromContact(contact){
        console.log(contact);
    }
}