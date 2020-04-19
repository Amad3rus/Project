export default class User {
    constructor(){

    }
    fetchUser(user){
        const users = [
            {
                name:'kakashi',
                email:'kakashi.ksura7@gmail.com',
                id:'1'
            },
            {
                name:'maria',
                email:'maria.maria7@gmail.com',
                id:'2'
            },
            {
                name:'joao',
                email:'joao.joa7@gmail.com',
                id:'3'
            },
            {
                name:'vinicius',
                email:'vinicius.vinicius7@gmail.com',
                id:'4'
            }
        ]
        const u = users.filter(u => u.id == user.id)[0];
        return Promise.resolve(u);
    }
}