export default class GetUserDTO{
    constructor(user){
        this.name = `${user.first_name} ${user.last_name}`
        this.role = user.role,
        this.email = user.email
    }
}