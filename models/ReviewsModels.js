const mongoose = require('mongoose')

const ReviewSchema = mongoose.Schema({
    title:{
        type: String,
        unique: [true, "nombre de course debe ser unico"],
        required:[true, "nombre de course requerido"],
        maxlength: [20, "Longitud de nombre es mayor a 20"]
    },
    text:{
        type: String,
        required:[true, "descripcion de course requerido"],
        maxlength: [50, "Longitud de descripcion  debe ser minimo de 50"]
    },
    rating:{
        type:[Number],
        required:[true, "rating requerido"],
        enum:[
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10
        ]
    },

})

module.exports = mongoose.model('Reviews',
                                ReviewSchema)