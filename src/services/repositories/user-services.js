export default class UserService{
    constructor(dao){
        this.dao = dao;
    }

    getUser = () =>{
        return this.dao.getUser();
    }
    getUserBy = (params) =>{
        return this.dao.getUserBy(params);
    }
    updateUser = (id, user) =>{
        return this.dao.updateUser(id,user)
    }
}