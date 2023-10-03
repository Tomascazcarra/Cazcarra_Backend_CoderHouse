
export default class UserCurrentDTO {
    constructor(user) {
        this.name = `${user.first_name} ${user.last_name}`
        this.role = user.role,
            this.email = user.email
    }
}