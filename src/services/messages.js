import User from '../services/user';

export default class Messages {
    constructor(){
        this.user = new User();
    }

    fetchMessages(value){
        return new Promise((resolve, reject) => {
            let messages = [];
            if(value){
                messages = [
                    {
                        name:'Kakashi',
                        message:'olá',
                        time: new Date().getTime(),
                        id:'1',
                    },
                    {
                        name:'Maria',
                        message:'já estou aqui',
                        time: new Date().getTime(),
                        id:'2',
                    },
                    {
                        name:'João',
                        message:'Não foi?',
                        time: new Date().getTime(),
                        id:'3',
                    },
                    {
                        name:'Vinícius',
                        message:'tudo bem?',
                        time: new Date().getTime(),
                        id:'4',
                    },
                    {
                        name:'Vinícius',
                        message:'tudo bem?',
                        time: new Date().getTime(),
                        id:'5',
                    }
                ]
            }
            this.user.fetchUser(value)
                .then((user) => {
                    const message = messages.filter(m => m.id == user.id);
                    resolve(message);
                })
                .catch((e) => console.error(e));
        });
    }
}