import Format from '../utils/format';
import Contacts from './contacts';

export default class User {
    constructor(){
        this.contacts = new Contacts();
        this.users = [
            {
                name:'kakashi',
                contacts:[],
                email:'kakashi.kisura7@gmail.com',
                id: Format.createUid()
            },
            {
                name:'maria',
                contacts:[],
                email:'maria.maria7@gmail.com',
                id:Format.createUid()
            },
            {
                name:'joao',
                contacts:[],
                email:'joao.joa7@gmail.com',
                id:Format.createUid()
            },
            {
                name:'vinicius',
                contacts:[],
                email:'vinicius.vinicius7@gmail.com',
                id:Format.createUid()
            }
        ]
    }

    async fetchUser(user){
        const contacts = await this.contacts.fetchContacts();
        this.users.forEach(u => {
            contacts.forEach(c => u.contacts.push(c));
        });

       if(localStorage.getItem('users')){
           const users = JSON.parse(localStorage.getItem('users'));
            return Promise.resolve(users.filter(u => u.email == user.user.email)[0]);
       }else{
           localStorage.setItem('users', JSON.stringify(this.users));
           const users =  this.users;
           return Promise.resolve(users.filter(u => u.email == user.email)[0]);
       }
    }
}