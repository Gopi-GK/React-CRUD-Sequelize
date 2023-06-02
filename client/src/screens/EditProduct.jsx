import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router'
import { Link } from 'react-router-dom';

const EditProduct = () => {

    const { id } = useParams()
    const history = useHistory()



    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [published, setPublished] = useState(true)

    useEffect(() => {
        const getDataById = async () => {
            const { data } = await axios.get(`/api/products/${id}`)
            setTitle(data.title)
            setPrice(data.price)
            setDescription(data.description)
            setPublished(data.published)
        }

        getDataById()
    }, [id])

    const updateHandler = async (e) => {

        e.preventDefault()

        // update by put request

        const data = {
            title: title,
            price: price,
            description: description,
            published: published
        }

        await axios.put(`/api/products/${id}`, data)

        history.push('/products')

    }

    //Stylings 

    const header = {
        boxShadow: "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
        padding: "6px 0px 6px 0px",
        margin: " 10px 0px 15px 0px"
    }
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

    return (
        <>
            <Container className=' p-2'>
                <div className="container row" style={header}>

                    <div className='col-lg-4' >

                    </div>
                    <div className='col-lg-4' style={{ justifyContent: "center", alignItems: 'center', display: "flex" }}>
                        <h1>Edit Product</h1>
                    </div>
                    <div className='col-lg-4' >

                    </div>

                </div>

                <Form onSubmit={updateHandler}>
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
                            value={published}
                            onChange={(e) => setPublished(e.target.checked)}
                            label="publish"
                        />
                    </Form.Group>


                    
                    <div style={formControls}>
                        <div className='col-lg-6' style={{ display: "flex", float: "left" }}>
                            <Button variant="outline-primary">
                                <Link to="/" style={{ textDecoration: "none" }}> Cancel</Link>
                            </Button>
                        </div>
                        <div className='col-lg-6' style={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button variant="primary" type="submit">
                            Update Product
                            </Button>
                        </div>


                    </div>
                </Form>
            </Container>
        </>
    )
}

export default EditProduct
