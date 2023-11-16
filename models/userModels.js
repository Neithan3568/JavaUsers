const mongoose = require('mongoose')
const bcryptjs= require ('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required: [true, "nombre requerido"]
        },
        email:{
            type: String,
            required: [true, "email requerido"],
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "email no valido"
            ]
        },
        role:{
            type:String,
            required: [true, "rol requerido"],
            enum:[
                "user",
                "publisher"
            ]
        },
        password:{
            type: String,
            required: [true, "contraseña requerida"],
            max: 6,
            select: false
        },
        createdAt:{
            type: Date,
            default: Date.now
        }

    }
)
//crear la accion pre
userSchema.pre('save', async function(next){
    //crear la sal
    const sal = await bcryptjs.genSalt(10)
    //encriptar la contraseña
    this.password= await bcryptjs.
                   hash(this.password, sal)
})

const JWT_SECRET_KEY ="hola_2687351"
//methodo que me constuye el jwt token
userSchema.methods.ObtenerJWT = function () {
    return jwt.sign({
        id: this._id,
    },
    JWT_SECRET_KEY
    )
}


//metodo para comparar password de body con el password de la entidad
userSchema.methods.comparePassword =
        async function(password){
            //comparar password
         return await  bcryptjs.compare(password,
            this.password)
        }



const User =
module.exports = mongoose.model('User',
                                userSchema)