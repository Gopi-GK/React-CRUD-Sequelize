import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap'
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

const ShowProducts = () => {


    const header ={
        boxShadow:"rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
        padding:"10px 0px 10px 0px",
        margin:" 10px 0px 15px 0px"
    }


    const [products, setProducts] = useState([])

    useEffect(() => {
        const getProductsData = async () => {
            const { data } = await axios.get('/api/products/allProducts')
            console.log(data)
            setProducts(data)
        }
        getProductsData()
    }, [])

    return (
        <>
            <Container className="justify-content-center p-2">
                <div className="container row " style={header}>

                    <div className='col-lg-4' >

                    </div>
                    <div className='col-lg-4' style={{ justifyContent: "center", alignItems: 'center' }}>
                        <h1 className="text-center"> All Products</h1>
                    </div>
                    <div className='col-lg-4' style={{ alignItems: "center", display: "flex", justifyContent: "flex-end" }}>
                        <Link to="/addProduct" className="btn btn-success">Add New (+)</Link>
                    </div>

                </div>


                {/* <hr /> */}

                <Row>
                    {
                        products.map(product => {
                            return <Col md={6} lg={3} sm={12} key={product.id}>
                                <ProductCard product={product} />
                            </Col>
                        })
                    }
                </Row>


            </Container>


        </>
    )
}

export default ShowProducts
