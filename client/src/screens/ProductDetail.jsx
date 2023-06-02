import React, { useEffect, useState } from 'react'
import { Card, Button, Container, Form, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useHistory, useParams } from 'react-router'
import axios from 'axios';
import moment from 'moment/moment';


const ProductDetail = () => {

    const { id } = useParams()
    const history = useHistory()

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [productDescription, setProductDescription] = useState('')
    const [published, setPublished] = useState(true)
    const [productImage, setProductImage] = useState('')


    // review rating  description
    const [reviews, setReviews] = useState([])
    const [quantity, setQuantity] = useState(0)
    const [stocktype, setStocktype] = useState("")
    const [date, setDate] = useState("")
    const [description, setDescription] = useState('')


    useEffect(() => {

        const getSingleProductData = async () => {
            const { data } = await axios.get(`/api/products/getProductReviews/${id}`)
            console.log(data)

            setTitle(data.title)
            setPrice(data.price)
            setProductDescription(data.description)
            setPublished(data.published)
            setProductImage(data.image)

            // for reviews
            setReviews(data.review)


        }
        getSingleProductData()

    }, [id])



    // handling Delete
    const handleDelete = async (id) => {
        await axios.delete(`/api/products/${id}`)
        history.push('/')
    }

    // to add review

    const addReviewHandler = async (e) => {

        e.preventDefault()

        let review = {
            product_id: id,
            quantity: quantity,
            stocktype: stocktype,
            date: date,
            description: description
        }

        await axios.post(`/api/products/addReview/${id}`, review)

        history.push('/')
    }
    // Stylings
    const productImg = {
        height: "450px",
        objectFit: "cover"
    }
    const productName = {
        fontSize: "24px",
        fontFamily: "Sans-Serif",
        color: "#348CE4"
    }
    const productValue = {
        fontSize: "20px",
        fontFamily: "Sans-Serif",
        color: "#1B1C1C",

    }
    const formLable = {
        fontSize: "22px",
        fontFamily: "Sans-Serif",
        color: "#1B1C1C",
    }
    const stockCard = {
        boxShadow: "rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px",
        padding: "15px 15px",
        marginTop:"5px"
    }
    const header = {
        boxShadow:"rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
        padding:"5px 5px"
    }

    const stockInfo={
        fontSize: "24px",
        fontFamily: "Sans-Serif",
        color: "#1B1C1C"
    }
const stockTitle ={
    fontSize: "22px",
        fontFamily: "Sans-Serif",
        color: "#348CE4"
}
const stockValue ={
    fontSize: "18px",
        fontFamily: "Sans-Serif",
        color: "#1B1C1C"
}

    // Stylings


    return (
        <>

            <Container className="mt-10 p-4">

                <div className="container row" style={header} >

                    <div className='col-lg-4' style={{ alignItems: "center", display: "flex" }}>
                        <Link to="/" className="btn btn-primary">  Back to Products</Link>
                    </div>
                    <div className='col-lg-4' style={{ justifyContent: "center", alignItems: 'center' }}> <h1 className="text-center"> Product Details</h1></div>
                    <div className='col-lg-4'></div>


                </div>

                {/* <hr /> */}


                <Row>
                    <Col md={8} lg={8} sm={8}>
                        <Card className='shadow-lg m-3 p-2 rounded'>
                            <Card.Img src={`http://localhost:3000/${productImage}`} fluid style={productImg} />
                            <Card.Body>
                                <Card.Title style={productName}>Title: <span style={productValue}>{title}</span></Card.Title>
                                <Card.Title style={productName}>Price:<span style={productValue}> ₹{price}</span></Card.Title>
                                <Card.Title style={productName}>
                                    Description: <span style={productValue}>{productDescription}</span>
                                </Card.Title>
                                <Card.Title style={productName}>
                                    Published: <span style={productValue}> {published ? (<small>True</small>) : (<small>false</small>)}</span>
                                </Card.Title>
                                <br />


                                <Link to={`/product/edit/${id}`}>
                                    <Button>Edit</Button>
                                </Link>

                                <Button className="btn btn-danger m-2" onClick={() => handleDelete(id)}>Delete</Button>

                            </Card.Body>
                        </Card>
                    </Col>


                    <Col md={4} lg={4} sm={4}>
                    <div style={stockCard}>

                        <h2 className='text-center'>Stock Details</h2>
                       

                        {/* <Form onSubmit={addReviewHandler}>
                            <Form.Group className="mb-3" controlId="rating">
                                <Form.Label>Rating</Form.Label>
                                <Form.Control
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                    type="number"
                                />
                            </Form.Group>

                        

                            <Form.Group className="mb-3" controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    as="textarea"
                                    />
                            </Form.Group>


                            <Button variant="primary" type="submit">
                                Add Review
                            </Button>
                        </Form> */}
                       

                            <Form onSubmit={addReviewHandler}>

                                <Form.Group className="mb-3" controlId="quantity">

                                    <Form.Label style={formLable}>Quantity</Form.Label>

                                    <Form.Control

                                        value={quantity}

                                        onChange={(e) => setQuantity(e.target.value)}

                                        type="number"

                                    />

                                </Form.Group>




                                <Form.Group className="mb-3" controlId="stocktype">

                                    <Form.Label style={formLable}>Stock Type</Form.Label>

                                    {/* <Form.Control

                                    value={stocktype}

                                    onChange={(e) => setStocktype(e.target.value)}

                                    type="text"

                                /> */}

                                    <Form.Select value={stocktype} onChange={(e) => setStocktype(e.target.value)} >
                                        <option disabled value="">Select Stock Update Type</option>
                                        <option value="Newly Purchased">Newly Purchased</option>
                                        <option value="Current Stock">Current Stock</option>
                                    </Form.Select>

                                </Form.Group>

                                <Form.Group className="mb-3" controlId="date">

                                    <Form.Label style={formLable}>Stock Updated Date</Form.Label>

                                    <Form.Control

                                        value={date}

                                        onChange={(e) => setDate(e.target.value)}

                                        type="date"

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





                                <Button variant="primary" type="submit">

                                    Add Stock

                                </Button>

                            </Form>
                        </div>

                        <br />
                        <div style={stockInfo}>
                        <h5>Stock Update Details</h5>
                        </div>
                       

                        {/* {reviews.length > 0 ? (
                            reviews.map(review => {
                                return <p key={review.id}>
                                    Quantity: {review.quantity} <br />
                                    Stock Update Type: {review.stocktype} <br />
                                    Date: {(moment(review.date).format("DD MMM YYYY "))}<br />
                                    Description:{review.description}</p>
                            })
                        ) : (<p> No stock updates for this product </p>)} */}

                        {reviews.length > 0 ? (
                            reviews.map(review => {
                                return <p key={review.id} style={stockTitle}>   Quantity: <span style={stockValue}> {review.quantity}</span> <br />
                                   Stock Update Type: <span style={stockValue}> {review.stocktype}</span> <br />
                                    
                                    Date: <span style={stockValue}>{(moment(review.date).format("DD MMM YYYY "))}</span> <br />
                                    Description: <span style={stockValue}> {review.description}</span></p>
                                    
                            })
                        ) : (<p> No stock updates for this product </p>)}


                    </Col>
                </Row>




            </Container>





        </>
    )
}

export default ProductDetail
