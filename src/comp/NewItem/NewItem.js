import React, { useState } from "react";
import "./NewItem.css";
import { createItemAPI } from "../../APIs/apis";

const NewItem = (props) => {
    const { isOpen, onClose, updateItem } = props;
    const [name, setName] = useState("");
    const [club, setClub] = useState("");
    const [nationality, setNationality] = useState("");

    // Return null if modal is not open
    if (!isOpen) return null;

    // Create a new item using API and update parent component
    const createItem = async () => {
        const newItem = {
            "Name": name,
            "Club": club,
            "Nationality": nationality
        }
        const response = await createItemAPI(newItem);
        props.applyNewItemResults({ _id: response.inserted_id, ...newItem });
        reset();
    }

    // Reset all input fields to empty strings
    const reset = () => {
        setName("");
        setClub("");
        setNationality("");
    }

    return (
        <div className="newitem-overlay" onClick={onClose}>
            <div className="newitem-content" onClick={e => e.stopPropagation()}>
                <button className="newitem-close" onClick={onClose}> &times; </button>
                <h2>Create a new item</h2>
                <div className="newitem-container">
                    <div>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                        />
                        <input
                            value={club}
                            onChange={(e) => setClub(e.target.value)}
                            placeholder="Club"
                        />
                        <input
                            value={nationality}
                            onChange={(e) => setNationality(e.target.value)}
                            placeholder="Nationality"
                        />
                    </div>
                    <div>
                        <button onClick={createItem}>Create Item</button>
                        <button onClick={reset}>Reset</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewItem;