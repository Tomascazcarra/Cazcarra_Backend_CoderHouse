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

export const generateMailTemplate = async(template,payload) =>{
    const content = await fs.promises.readFile(`${__dirname}/templates/${template}.handlebars`,'utf-8')
    const precompiledContent = Handlebars.compile(content);
    const compiledContent = precompiledContent({...payload})
    return compiledContent;
}



export default __dirname;
