import {fileURLToPath} from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";

export const createHash = async(password) =>{
    const salts = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salts);
}
export const validatedPassword = (password, hashedPassword) => bcrypt.compare(password, hashedPassword)

const __filname = fileURLToPath(import.meta.url);
const __dirname = dirname(__filname);



export default __dirname;
