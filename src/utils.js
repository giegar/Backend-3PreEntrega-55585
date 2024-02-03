import path from "path"
import { fileURLToPath } from "url"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from './config/config.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default __dirname;

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

export const generateToken =  user => {
    const token = jwt.sign({user}, config.jwtSecretKey, {expiresIn: '24h'})
    return token
}
