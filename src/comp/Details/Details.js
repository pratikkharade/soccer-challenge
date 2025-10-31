import React from "react";
import "./Details.css";
import InlineEdit from "../InlineEdit/InlineEdit";

const Details = (props) => {
    const { isOpen, onClose, selectedItem, updateItem } = props;
    
    // Return null if modal is not open
    if (!isOpen) return null;

    return (
        <div className="details-overlay" onClick={onClose}>
            <div className="details-content" onClick={e => e.stopPropagation()}>
                <button className="details-close" onClick={onClose}> &times; </button>
                <h2>{selectedItem.Name}</h2>
                <div className="details-container">
                    {
                        Object.keys(selectedItem).map((key) => {
                            return (key != "_id" && key != "Name") ? <p key={key}>{key}: <InlineEdit
                                thisKey={key}
                                item_id={selectedItem._id}
                                value={selectedItem[key]}
                                updateItem={updateItem}
                            /></p> : <React.Fragment key={key} />
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Details;



// import React from "react";
// import "./Details.css"; // create a CSS file for styling

// const Details = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="details-overlay" onClick={onClose}>
//       <div className="details-content" onClick={e => e.stopPropagation()}>
//         <button className="details-close" onClick={onClose}>
//           &times;
//         </button>
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Details;