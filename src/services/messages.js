export default class Messages {
    constructor(){
       
    }

    fetchMessages(value){
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
                }
            ]
        }
        return Promise.resolve(messages);
    }
}