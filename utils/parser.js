import fs from "node:fs/promises"
import {fileURLToPath} from "node:url"
import path from "node:path"

const __dirname = path.dirname(fileURLToPath(import.meta.url)) 
const DB_PATH = path.join(__dirname, './package.json')
console.log(__dirname)
console.log(DB_PATH)

const packageDB = async() => {
    try {
        const db = await fs.readFile(DB_PATH, 'utf-8')
        console.log(JSON.parse(db))
    } catch (err){
        console.error( err)
    }  
}

packageDB()
