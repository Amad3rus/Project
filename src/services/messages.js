import User from '../services/user';
import Format from '../utils/format';
import Contacts from './contacts';

export default class Messages {
    constructor(){
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
}