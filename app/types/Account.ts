export type Account = {  
    id:number,
    uuid:string
    email:string,
    password:string,
    role:string // USER, ADMIN
    createdAt: Date
    updatedAt: Date
}