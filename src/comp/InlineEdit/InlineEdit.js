import React, { useState } from "react";

const InlineEdit = (props) => {
    const {thisKey, item_id, value, updateItem} = props;
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(value);

    // Handle blur event to stop editing and update item if text changed
    const handleBlur = () => {
        setIsEditing(false);
        if (text !== value){
            updateItem(item_id, {[thisKey] : text});
        }
    };

    return isEditing ? (
        <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={handleBlur}
            autoFocus
        />
    ) : (
        // Display text or placeholder and enable editing on click
        <span onClick={() => setIsEditing(true)} style={{ cursor: "pointer" }}>
            {text || " N/A "}
        </span>
    );
};

export default InlineEdit;