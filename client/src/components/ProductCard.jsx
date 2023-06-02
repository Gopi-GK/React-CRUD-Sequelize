//import Button from '@restart/ui/esm/Button'
import React from 'react'
import { Card,Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const cardName={
    fontWeight:"24px",
    fontFamily:"Sans-Serif",
    color:"#348CE4"
}

const cardValue={
    fontWeight:"20px",
    fontFamily:"Sans-Serif",
    color:"#1B1C1C",
    overflow:"hidden",
    textOverflow:"ellipsis"
}

const cardButton={
display:"flex",
alignItems:"center",
//justifyContent:"flexEnd",
paddingTop:"8px"
}
const cardImage ={
    height:"360px",
    objectFit:"cover"
}

const cardStyling ={
    width: '18rem', boxShadow:
       'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
}

const ProductCard = ({ product }) => {
    return (
        <>

            <Card className=' m-2 p-3 rounded' style={cardStyling}>
                <Card.Img src={product.image} style={cardImage} />
                <Card.Body>
                    <Card.Title style={cardName}>Title:  <span style={cardValue}>{product.title}</span></Card.Title>
                    <Card.Title style={cardName}>Price: <span style={cardValue}> ${product.price}</span> </Card.Title>
                    
                    <Card.Title style={cardName}>
                        Description: <span style={cardValue}> {product.description.slice(0,9)}...</span> 
                    </Card.Title>
                    
                    
                    <div style={cardButton}>
                    <Link to={`product/${product.id}`}>
                        <Button variant="primary" size="sm"> Detail </Button>
                    </Link>
                    </div>
                 
                   
                </Card.Body>

                
               
            </Card>
       
           
        </>
    )
}

export default ProductCard
