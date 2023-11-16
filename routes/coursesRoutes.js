const express = require('express')
const mongoose = require('mongoose')
const CourseModel = require ('../models/CoursesModels')
const router = express.Router()

//evidencia: uris de courses
//traer todos los campos courses
router.get('/',
        async(request,response)=> {
            try {
                    const courses=
                    await CourseModel.find()

                    if(courses.length === 0){
                            return response.
                             status(404).
                             json({
                                    success: false,
                                    msg:"No hay cursos disponibles"
                             })
                    }
                response
                .status(200)
                .json({
                       "success": true,
                       "results": courses
                })

            } catch (error) {
                    response
                    .status(500)
                    .json({
                        success: false,
                        msg: "Error interno del servidor"
                    })
                
            }    
            

        })

//traer todos los campos courses por id
router.get('/:id',
        async(request,response)=> {
            try {
                const coursesId = request.params.id
                if(!mongoose.Types.ObjectId.isValid(coursesId)){
                        response
                        .status(500)
                        .json({
                                success: false,
                                msg: "identificador invalido"
                        })     
                }else{
                        const selected_course =
                        await CourseModel.findById(coursesId)
                        if(!selected_course){
                                response
                                        .status(404)
                                        .json({
                                                success: false,
                                                msg: `no se halló el course con id: ${coursesId}`
                                        })
                        }else{
                                response
                                .status(200)
                                .json({
                                        "success" : true,
                                        "results": selected_course   
                                })
                        }
                }
        } catch (error) {
                response
                .status(500)
                .json({
                        success: false,
                        msg: "Error interno del servidor"
                })
        }
        })

//crear todos los campos de courses
router.post('/',
        async(request,response)=> {
            try {
                //crear el nuevo course
                const course = await CourseModel.
                         create(request.body)
                 response
                .status(201)
                .json({
                         "success" : true,
                        "data" : course   
                })
        }catch (error) {
               response
              .status(500)
              .json({
              success: false,
              msg: error.message
            })
            }
            
        })

//actualizar courses por id 
router.put('/:id',
        async(request,response)=> {
            try{
                const courseId = request.params.id
                if(!mongoose.Types.ObjectId.isValid(courseId)){
                        response
                        .status(500)
                        .json({
                                success: false,
                                msg: "identificador invalido"
                       })     
                }
                else{
                        const selected_course =
                        await CourseModel.findByIdAndUpdate(
                                courseId,
                                request.body,
                               {
                                new : true
                               }
                        )
                        if(!selected_course){
                                response
                                    .status(404)
                                    .json({
                                        success: false,
                                        msg: `no se halló el bootcamp con id: ${courseId}`
                                })
                        }else{
                                response
                                    .status(200)
                                    .json({
                                        "success": true,
                                        "results":selected_course
                                })
                        }
                 }
        }catch (error) {
                response
                        .status(500)
                        .json({
                                success: false,
                                msg: Error.message
                       })   
        }
        courseId= request.params.id
        const updCourse=
         await CourseModel.findByIdAndUpdate(
         courseId,
         request.body,
         {
                new : true
         }
        )

        response
                .status(201)
                .json({
                     "success" : true,
                     "results" : updCourse  
                })
        })

//eliminar courses por id 
router.delete('/:id',
        async(request,response)=> {
            bootcampId= request.params.id
            const DelCourse=
             await CourseModel.findByIdAndDelete(
                    bootcampId,
             request.body,
             {
                    new : true
             }
            )

            response
                    .status(201)
                    .json({
                         "success" : true,
                         "results" :[] 
                    })
        })

module.exports = router