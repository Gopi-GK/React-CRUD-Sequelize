import axios from 'axios'
import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//import toast,{Toaster} from 'react-hot-toast';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
  

// Stylings 
const formLable = {
    fontSize: "26px",
    fontFamily: "Sans-Serif",
    color: "#1B1C1C",
    //fontWeight:"bold"
}
const formControls = {
    display: "flex",
    alignItems: "center",
    padding: "10px 15px"
}
const header = {
    boxShadow:"rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
        padding:"10px 0px 10px 0px",
        margin:" 10px 0px 15px 0px"
}

// const success=()=>{
//     <SnackbarProvider />
//     enqueueSnackbar("Product is added successfully",{ variant:"success"})
// }

// const fail=()=>{
//     <SnackbarProvider />
//     enqueueSnackbar("Product is added successfully",{ variant:"error"})
// }


const AddProduct = ({ history }) => {

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [published, setPublished] = useState(true)
    const [image, setImage] = useState('')

    const addProductHandler = async (e) => {

        e.preventDefault()

        // const data = {
        //     title: title,
        //     price: price,
        //     description: description,
        //     published: published
        // }


        const formData = new FormData()

        formData.append('image', image)
        formData.append('title', title)
        formData.append('price', price)
        formData.append('description', description)
        formData.append('published', published)

        // await axios.post('/api/products/addProduct', formData)
        // history.push('/')
        if (!image|| !title ||!price||!description){
            enqueueSnackbar("Please enter the each input field",{ variant:"error"})
                }else{
 
         await axios.post('/api/products/addProduct', formData)
        
         enqueueSnackbar("Product is added successfully",{ variant:"success"})
        // toast.success("Product added Successfully",{duration: 4000,position: 'top-center'});
         history.push('/')
         
 
               }


    }
    
    return (
        <>
            <Container className=' p-2'>
                <div className="container row" style={header}>

                    <div className='col-lg-4' >

                    </div>
                    <div className='col-lg-4' style={{ justifyContent: "center", alignItems: 'center',display:"flex" }}>
                    <h1>Add Product</h1>
                    </div>
                    <div className='col-lg-4' >
                        
                    </div>

                </div>

                
               

                <Form onSubmit={addProductHandler} method="POST" encType='multipart/form-data'>

                    <Form.Group controlId="fileName" className="mb-3">
                        <Form.Label style={formLable}>Upload Image</Form.Label>
                        <Form.Control
                            type="file"
                            name='image'
                            onChange={(e) => setImage(e.target.files[0])}
                            size="lg" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label style={formLable}>Title</Form.Label>
                        <Form.Control
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label style={formLable}>Price ($)</Form.Label>
                        <Form.Control
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            type="number"
                        />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label style={formLable}>Description</Form.Label>
                        <Form.Control
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            as="textarea"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="publishedCheckedid">
                        <Form.Check
                            type="checkbox"
                            onChange={(e) => setPublished(e.target.checked)}
                            label="publish"
                        />
                    </Form.Group>

                    <div style={formControls}>
                        <div className='col-lg-6' style={{ display: "flex", float: "left" }}>
                            <Button variant="outline-primary">
                                <Link to="/" style={{ textDecoration: "none" }}> Back</Link>
                            </Button>
                        </div>
                        <div className='col-lg-6' style={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button variant="primary" type="submit">
                                Add Product
                            </Button>
                            <SnackbarProvider />
                            {/* <Toaster /> */}
    

                        </div>


                    </div>

                </Form>
            </Container>
        </>
    )
}

export default AddProduct
