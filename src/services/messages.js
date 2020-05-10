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

    get icon(){return this.data.icon;};
    set icon(value){this.data.icon = value};

    getViewElement(me = true){
        const div = document.createElement('div');

        switch(this.type){
            case 'contact':
                div.innerHTML = RenderView.messageContact(this.data);
                div.querySelectorAll('.receive')
                    .forEach(contact => contact.onclick = e => this.extractInfoFromContact(this.data));
                break;
            case 'audio':
                div.innerHTML = RenderView.messageAudio(this.data);
                break;
            case 'video':
                div.innerHTML = RenderView.messageVideo(this.data);
                break;
            case 'image':
                div.innerHTML = RenderView.messageImage(this.data);
                div.querySelectorAll('.btn-download-image-from-contact')
                    .forEach(btn => btn.onclick = e => this.downloadImageFromContact(this.data, btn));
                div.querySelector('.image img').on('load', e => this.hideSpinner(e))
                break;
            case 'document':
                div.innerHTML = RenderView.messageDocument(this.data);
                break;
            default:
                div.innerHTML = RenderView.messageText(this.data);
        }

        let messageOutput = 'message-in';

        if(me){
            messageOutput = 'message-out';
            this.getStatusView();
        }

        div.firstElementChild.classList.add(messageOutput);
        div.querySelectorAll('.message-in')
            .forEach(icon => icon.querySelectorAll('i')
                .forEach(i => i.hide()));
        return div;
    }
    hideSpinner(e){
        // e.hide();
        console.log('load image complete', e);
    }
    extractInfoFromContact(contact){
        console.log(contact);
    }
    downloadImageFromContact(content, element){
        element.addClass('active');
        setTimeout(() => {element.removeClass('active')}, 5000);
    }
    playAudioSend(audio){
        console.log('send', audio);
    }
    playAudioReceive(audio){
        console.log('receive', audio);
    }
    getStatusView(){
        switch(this.status){
            case 'wait':
                this.icon = 'access_time';
                break;
            case 'sent':
                this.icon = 'done';
                break;
            case 'received':
                this.icon = 'done_all';
                break;
            case 'read':
                this.icon = 'done_all';
                break;
        }
    }
    static sendMessage(message){
        return new Promise(async (resolve, reject) => {
            const result = await Messages.getRef(message.chatId).add(message);
            resolve(await result.parent.doc(result.id).set({status:'sent'}, {merge:true}));
        });
    }
    static getRef(chatId){
        return Firebase.database().collection('chats').doc(chatId).collection('messages');
    }
    static getRefStorage(email){
        // return Firebase.storage().ref(email);
    }
    static sendMessageImage(messageImage){
        return new Promise(async (resolve, reject) => {
            console.log(messageImage);
            let uploadTask = Firebase.storage()
                                .ref(messageImage.from)
                                .child(`${Date.now()}_${messageImage.file.info.name}`)
                                .put(messageImage.file.info);
            
            // uploadTask.on('state_changed', e => {
            //     console.log('uploading...', e);
            // }, err => {
            //     console.log(err);
            // }, async () => {
            //     delete messageImage.file;
            //     resolve(await Messages.sendMessage({...messageImage, "content":uploadTask.snapshot.downloadURL}));  
            // })

            uploadTask.on('state_changed', progress, error, success);

            async function progress(progress){
                console.info('uplading... make a progressbar', progress);
            }
            async function error(err){
                console.error(err);
            }
            async function success(){
                delete messageImage.file;
                resolve(await Messages.sendMessage({...messageImage, "content":uploadTask.snapshot.downloadURL}));
            }
        });
    }
}