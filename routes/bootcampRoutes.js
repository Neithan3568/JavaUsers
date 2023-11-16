const express =require('express')
const mongoose=require("mongoose")
const BootcampModel = require('../models/BootcampsModels')
const router = express.Router()

//traer todos los camp por id
router.get('/',
        async(request,response)=> {

                try {
                        const bootcamps=
                        await BootcampModel.find()

                        if(bootcamps.length === 0){
                               return response.
                                status(404).
                                json({
                                        success: false,
                                        msg:"no hay bootcamp disponible"
                                })
                        }
                 response
                        .status(200)
                        .json({
                             "success" : true,
                            "results":bootcamps
                        })
                } catch (error) {
                        response.
                        status(500)
                        .json({
                                success: false, 
                                msg: "Error interno del servidor"
                        })
                        
                }

        //traer todos los bootcamps
 
    
 
        })

//traer todos los campos bootcamps por id
router.get('/:id',
        async (request,response)=> {
                try {
                        const bootcampId = request.params.id
                        if(!mongoose.Types.ObjectId.isValid(bootcampId)){
                                response
                                .status(500)
                                .json({
                                        success: false,
                                        msg: "identificador invalido"
                                })     
                        }else{
                                const selected_bootcamp =
                                await BootcampModel.findById(bootcampId)
                                if(!selected_bootcamp){
                                        response
                                                .status(404)
                                                .json({
                                                        success: false,
                                                        msg: `no se halló el bootcamp con id: ${bootcampId}`
                                                })
                                }else{
                                        response
                                        .status(200)
                                        .json({
                                                "success" : true,
                                                "results": selected_bootcamp   
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


//crear todos loscampos de bootcamps
router.post('/',
        async (request,response)=> {
                 try {
                        //crear el nuevo bootcamp
                        const bootcamp = await BootcampModel.
                                 create(request.body)
                         response
                        .status(201)
                        .json({
                                 "success" : true,
                                "data" : bootcamp   
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
//actualizar bootcamp por id 
router.put('/:id',
        async (request,response)=> {

                try{
                        const bootcampId = request.params.id
                        if(!mongoose.Types.ObjectId.isValid(bootcampId)){
                                response
                                .status(500)
                                .json({
                                        success: false,
                                        msg: "identificador invalido"
                               })     
                        }
                        else{
                                const selected_bootcamp =
                                await BootcampModel.findByIdAndUpdate(
                                        bootcampId,
                                        request.body,
                                       {
                                        new : true
                                       }
                                )
                                if(!selected_bootcamp){
                                        response
                                            .status(404)
                                            .json({
                                                success: false,
                                                msg: `no se halló el bootcamp con id: ${bootcampId}`
                                        })
                                }else{
                                        response
                                            .status(200)
                                            .json({
                                                "success": true,
                                                "results":selected_bootcamp
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
                bootcampId= request.params.id
                const updBootcamp=
                 await BootcampModel.findByIdAndUpdate(
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
                             "results" : updBootcamp  
                        })
        })

//eliminar bootcamp por id 
router.delete('/:id',
        async (request,response)=> {
                bootcampId= request.params.id
                const DelBootcamp=
                 await BootcampModel.findByIdAndDelete(
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

//evidencia: uris de courses
//traer todos los campos courses
router.get('/',
        (request,response)=> {
                response
                        .status(200)
                        .json({
                             "success" : true,
                             "msg" : "mostrar todos los courses"   
                        })
        })

//traer todos los campos courses por id
router.get('/:id',
        (request,response)=> {
                response
                        .status(200)
                        .json({
                             "success" : true,
                             "msg" : `seleccionado con courses con id ${request.params.id}`   
                        })
        })

//crear todos los campos de courses
router.post('/',
        (request,response)=> {
                response
                        .status(201)
                        .json({
                             "success" : true,
                             "msg" : "crear course"   
                        })
        })

//actualizar courses por id 
router.put('/:id',
        (request,response)=> {
                response
                        .status(201)
                        .json({
                             "success" : true,
                             "msg" : `actualizando course con id ${request.params.id}`    
                        })
        })

//eliminar courses por id 
router.delete('/:id',
        (request,response)=> {
                response
                        .status(201)
                        .json({
                             "success" : true,
                             "msg" : `eliminando courses con id ${request.params.id}`    
                        })
        })

//evidencia: uris para reviews
//traer todos los campos reviews
router.get('/',
        (request,response)=> {
                response
                        .status(200)
                        .json({
                             "success" : true,
                             "msg" : "mostrar todos los reviews"   
                        })
        })

//traer todos los campos reviews por id
router.get('/:id',
        (request,response)=> {
                response
                        .status(200)
                        .json({
                             "success" : true,
                             "msg" : `seleccionado con review con id ${request.params.id}`   
                        })
        })

//crear todos los campos de reviews
router.post('/',
        (request,response)=> {
                response
                        .status(201)
                        .json({
                             "success" : true,
                             "msg" : "crear review"   
                        })
        })

//actualizar reviews por id
router.put('/:id',
        (request,response)=> {
                response
                        .status(201)
                        .json({
                             "success" : true,
                             "msg" : `actualizando review con id ${request.params.id}`    
                        })
        })

//eliminar reviews por id
router.delete('/:id',
        (request,response)=> {
                response
                        .status(201)
                        .json({
                             "success" : true,
                             "msg" : `eliminando review con id ${request.params.id}`    
                        })
        })

//evidencia: uris para users
//traer todos los campos users
router.get('/',
        (request,response)=> {
                response
                        .status(200)
                        .json({
                             "success" : true,
                             "msg" : "mostrar todos los users"   
                        })
        })

//traer todos los campos users por id
router.get('/:id',
        (request,response)=> {
                response
                        .status(200)
                        .json({
                             "success" : true,
                             "msg" : `seleccionado con user con id ${request.params.id}`   
                        })
        })

//crear todos los campos de users
router.post('/',
        (request,response)=> {
                response
                        .status(201)
                        .json({
                             "success" : true,
                             "msg" : "crear user"   
                        })
        })

//actualizar users por id 
router.put('/:id',
        (request,response)=> {
                response
                        .status(201)
                        .json({
                             "success" : true,
                             "msg" : `actualizando users con id ${request.params.id}`    
                        })
        })

//eliminar users por id 
router.delete('/:id',
        (request,response)=> {
                response
                        .status(201)
                        .json({
                             "success" : true,
                             "msg" : `eliminando users con id ${request.params.id}`
                        })
        })

module.exports= router
