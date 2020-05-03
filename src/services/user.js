import Format from '../utils/format';
import Contacts from './contacts';
import Firebase from '../services/firebase';
import Model from './model';

export default class User extends Model{
    constructor(email){
        super();
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

        if(email) this.getByEmail(email);
    }
    get name(){return this.data.name};
    get email(){return this.data.email};
    get photo(){return this.data.photo};

    set name(name){this.data.name = name};
    set email(email){this.data.email = email};
    set photo(photo){this.data.photo = photo};

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

    static getRef(){
        return Firebase.database().collection('/users');
    }

    static findByEmail(email){
        return User.getRef().doc(email);
    }

    getByEmail(email){
        return new Promise((resolve, reject) => {
            User.findByEmail(email)
                .onSnapshot(doc => {
                    this.fromJson(doc.data());
                    resolve(doc);
            });
        });
    }
    async save(){
        try{
            return await User.findByEmail(this.email).set(this.toJson());
        }catch(e){
            console.error(e);
        }
    }
}