const mongoose = require('mongoose')

const CourseSchema = mongoose.Schema({
    title:{
        type: String,
        unique: [true, "nombre de course debe ser unico"],
        required:[true, "nombre de course requerido"],
        maxlength: [30, "Longitud de nombre es mayor a 30"],
        minlength:[10, "Longitud de nombre minimo de 10"]
    },
    descripcion:{
        type: String,
        required:[true, "descripcion de course requerido"],
        minlength: [10, "Longitud de descripcion  debe ser minimo de 10"]
    },
    week:{
        type: Number,
        required:[true, "semana requerida"],
        max: [9, "Longitud de semanas es mayor a 9"]
    },
    enroll_cost:{
        type:Number,
        required:[true, "enroll_const requerida"]
    },
    minimum_skill:{
        type:[String],
        required:[true, "enroll_const requerida"],
        enum:[
            "Beginner",
            "Intermediate",
            "Advanced",
            "Expert",
        ]
    }
})

module.exports = mongoose.model('Courses',
                                CourseSchema)