const express = require('express')
const mongoose = require('mongoose')
const reviewModel = require ('../models/ReviewsModels')
const router = express.Router()

//evidencia: uris de review
//traer todos los campos review
router.get('/',
        async(request,response)=> {
            try {
                    const review=
                    await reviewModel.find()

                    if(review.length === 0){
                            return response.
                             status(404).
                             json({
                                    success: false,
                                    msg:"No hay reviews disponibles"
                             })
                    }
                response
                .status(200)
                .json({
                       "success": true,
                       "results": review
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

//traer todos los campos review por id
router.get('/:id',
        async(request,response)=> {
            try {
                const reviewId = request.params.id
                if(!mongoose.Types.ObjectId.isValid(reviewId)){
                        response
                        .status(500)
                        .json({
                                success: false,
                                msg: "identificador invalido"
                        })     
                }else{
                        const selected_review =
                        await reviewModel.findById(reviewId)
                        if(!selected_review){
                                response
                                        .status(404)
                                        .json({
                                                success: false,
                                                msg: `no se halló el review con id: ${reviewId}`
                                        })
                        }else{
                                response
                                .status(200)
                                .json({
                                        "success" : true,
                                        "results": selected_review   
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

//crear todos los campos de review
router.post('/',
        async(request,response)=> {
            try {
                //crear el nuevo review
                const review = await reviewModel.
                         create(request.body)
                 response
                .status(201)
                .json({
                         "success" : true,
                        "data" : review   
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

//actualizar review por id 
router.put('/:id',
        async(request,response)=> {
            try{
                const reviewId = request.params.id
                if(!mongoose.Types.ObjectId.isValid(reviewId)){
                        response
                        .status(500)
                        .json({
                                success: false,
                                msg: "identificador invalido"
                       })     
                }
                else{
                        const selected_review =
                        await reviewModel.findByIdAndUpdate(
                                reviewId,
                                request.body,
                               {
                                new : true
                               }
                        )
                        if(!selected_review){
                                response
                                    .status(404)
                                    .json({
                                        success: false,
                                        msg: `no se halló el bootcamp con id: ${reviewId}`
                                })
                        }else{
                                response
                                    .status(200)
                                    .json({
                                        "success": true,
                                        "results":selected_review
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
        reviewId= request.params.id
        const updReview=
         await reviewModel.findByIdAndUpdate(
         reviewId,
         request.body,
         {
                new : true
         }
        )

        response
                .status(201)
                .json({
                     "success" : true,
                     "results" : updReview  
                })
        })

//eliminar review por id 
router.delete('/:id',
        async(request,response)=> {
            bootcampId= request.params.id
            const DelReview=
             await reviewModel.findByIdAndDelete(
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