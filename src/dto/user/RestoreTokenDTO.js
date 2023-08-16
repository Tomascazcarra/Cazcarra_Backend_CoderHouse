export default class RestoreTokenDTIO {
    static getForm = (user) =>{
        return {
            email: user.email,
        }
    }
}