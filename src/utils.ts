import { hashSync,genSaltSync } from "bcrypt";

const saltRounds = process.env.SALT_ROUND
export function hash(password:string):string{
    const salt = genSaltSync(Number(saltRounds));
    return hashSync(password,salt);
}

export function generateCode(length:number):string{
    const data = "0123456789";
    let code = "";
    for(let i=0; i<length;i++){
        code+= data[Math.floor(Math.random()*data.length)]
    }
    return code
}