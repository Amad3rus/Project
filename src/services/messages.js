import Format from '../utils/format';
import Model from './model';
import RenderView from './renderView';
import Firebase from './firebase';

export default class Messages extends Model{
    constructor(){
        super();
    }
    get id(){ return this.data.id;};
    set id(value){this.data.id = value};

    get content(){ return this.data.content;};
    set content(value){this.data.content = value};

    get type(){ return this.data.type;};
    set type(value){this.data.type = value};

    get timestamp(){ return this.data.timestamp;};
    set timestamp(value){this.data.timestamp = value};

    get status(){ return this.data.status;};
    set status(value){this.data.status = value};

    getViewElement(me = true){
        const div = document.createElement('div');

        switch(this.type){
            case 'contact':
                div.innerHTML = RenderView.messageContact(this.data);
                div.querySelectorAll('.receive').forEach(contact => contact.onclick = e => this.extractInfoFromContact(this.data));
                break;
            case 'audio':
                div.innerHTML = RenderView.messageAudio(this.data);
                break;
            case 'video':
                div.innerHTML = RenderView.messageVideo(this.data);
                break;
            case 'image':
                div.innerHTML = RenderView.messageImage(this.data);
                div.querySelectorAll('.btn-download-image-from-contact').forEach(btn => btn.onclick = e => this.downloadImageFromContact(this.data, btn));
                break;
            case 'document':
                div.innerHTML = RenderView.messageDocument(this.data);
                break;
            default:
                div.innerHTML = RenderView.messageText(this.data);
        }

        const messageOutput = (me) ? 'message-out' : 'message-in';
        div.firstElementChild.classList.add(messageOutput);
        
        return div;
    }
    
    extractInfoFromContact(contact){
        console.log(contact);
    }
    downloadImageFromContact(content, element){
        console.log(element);
        element.addClass('active');
        setTimeout(() => {element.removeClass('active')}, 5000);
    }
    playAudioSend(audio){
        console.log('send', audio);
    }
    playAudioReceive(audio){
        console.log('receive', audio);
    }
    static sendMessage(message){
        return Messages.getRef(message.chatId).add(message);
    }
    static getRef(chatId){
        return Firebase.database().collection('chats').doc(chatId).collection('messages');
    }
}