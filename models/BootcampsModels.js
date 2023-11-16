const mongoose = require('mongoose')

//definir el modelo para bootcamps

const BootcampSchema = mongoose.Schema({
    name:{
        type: String,
        unique: [true, "nombre de bootcamp debe ser unico"],
        required:[true, "nombre de bootcamp requerido"],
        maxlength: [50, "Longitud de nombre menor a 50"]
    },
    phone:{
        type: Number,
        maxlength: [10, "Longitud de telefono menor a 50"]
    },
    addres:{
        type: String,
        required:[true, "direccion requerida"],
    },
    topics:{
        type:[String],
        enum:[
            "AI",
            "Frontend/UX",
            "Backend",
            "DevOps",
        ]
    },
    averageRating: Number,
    createdAt: Date

})

module.exports = mongoose.model('Bootcamps',
                                BootcampSchema )