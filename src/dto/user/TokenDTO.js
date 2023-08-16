export default class UserTokenDTO {
    static getForm = user =>{
        return {
            name: user.name,
            id: user._id,
            role: user.role
        }
    }
}