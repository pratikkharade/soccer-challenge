import React, { Component } from 'react';
import "./Card.css"

function Card(props) {
    // Trigger showing the details page for the item
    const showDetailsPage = () => {
        props.showDetailsPage(props.item);
    }
    // Trigger deleting the item by its ID
    const deleteItem = async () => {
        props.deleteItem(props.item._id);
    }

    return (
        <div className='card-wrapper'>
            <div className='card-title'>
                {props.idx + 1}. {props.item.Name}
            </div>
            <div className='card-subtitle'>
                {props.item.Club}
            </div>
            <div className='card-actions'>
                <div onClick={showDetailsPage}>
                    Details
                </div>
                <div onClick={deleteItem}>
                    Delete
                </div>
            </div>
        </div>
    );
}

export default Card;