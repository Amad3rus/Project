import Format from '../utils/format';
import Messages from './messages';

export default class Contacts {
    constructor(){
        this.messages = new Messages();
        this.contacts = [
            {
                name:'Kakashi',
                messages:[],
                time: new Date().getTime(),
                id:Format.createUid()
            },
            {
                name:'Maria',
                messages:[],
                time: new Date().getTime(),
                id:Format.createUid()
            },
            {
                name:'João',
                messages:[],
                time: new Date().getTime(),
                id:Format.createUid()
            },
            {
                name:'Vinícius',
                messages:[],
                time: new Date().getTime(),
                id:Format.createUid()
            },
        ]
    }

    fetchContacts(){
        this.contacts.forEach(c => {
            this.messages.messages.forEach(m => c.messages.push(m));
        });
        
        if(localStorage.getItem('contacts'))
            return Promise.resolve(JSON.parse(localStorage.getItem('contacts')));
        else {
            localStorage.setItem('contacts', JSON.stringify(this.contacts));
            return Promise.resolve(this.contacts);
        }
    }
}