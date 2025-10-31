import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import "./Home.css";
import Details from "../Details/Details";
import { fetchDataAPI, updateItemAPI, deleteItemAPI, deleteMultipleItemsAPI } from "../../APIs/apis";
import Search from "../Search/Search";
import NewItem from "../NewItem/NewItem";

const Home = () => {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isNewItemOpen, setIsNewItemOpen] = useState(false);
    const [attributes, setAttributes] = useState([]);

    // Fetch data from the API and initialize items and attributes state
    const fetchData = async () => {
        const data = await fetchDataAPI();
        setItems(data);
        if (data.length) {
            setAttributes(Object.keys(data[0]).filter(key => key !== "_id"));
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Show the details page for a selected item
    const showDetailsPage = (item) => {
        setIsDetailsOpen(true);
        setSelectedItem(item);
    }

    // Update an item both in the API and local state
    const updateItem = async (itemId, newValues) => {
        try {
            await updateItemAPI(itemId, newValues);

            // Update local state without refetching everything
            setItems(prevItems =>
                prevItems.map(item =>
                    item._id === itemId ? { ...item, ...newValues } : item
                )
            );

            // Update selectedItem if the details popup is open
            if (selectedItem && selectedItem._id === itemId) {
                setSelectedItem(prev => ({ ...prev, ...newValues }));
            }
        } catch (error) {
            console.error("Error updating item:", error);
        }
    };

    // Delete a single item after confirmation
    const deleteItem = async (itemId) => {
        if (!window.confirm("Are you sure you want to delete? (This action is irrversible)")) {
            return
        }
        await deleteItemAPI(itemId);
        setItems(prev => prev.filter(item => item._id !== itemId));
    }

    // Delete the first three items after confirmation
    const deleteMultipleItems = async () => {
        if (!window.confirm("Are you sure you want to delete the first 3 items? (This action is irrversible)")) {
            return
        }
        const ids = [];
        for (let i = 0; i < 3; i++) {
            ids.push(items[i]._id);
        }
        await deleteMultipleItemsAPI(ids);
        setItems(prev => prev.filter(item => !ids.includes(item._id)));
    }

    // Open the form to add a new item
    const createItem = () => {
        setIsNewItemOpen(true);
    }

    // Apply search results to update the items state
    const applySearchResults = (items) => {
        setItems(items);
    }

    // Add a new item to the beginning of the items list
    const applyNewItemResults = (newItem) => {
        setItems(prevItems => [
            newItem, ...prevItems
        ])
    }

    return (
        <div className="home-wrapper">
            <Search attributes={attributes} applySearchResults={applySearchResults} />
            <div>
                <button onClick={createItem}>Add a new item</button>
                <button onClick={deleteMultipleItems}>Delete 1st Three</button>
            </div>
            {items.length === 0 &&
                <p>No Records Found.</p>
            }
            <div className="cards-container">
                {items.map((item, idx) => (
                    <Card key={idx}
                        idx={idx}
                        item={item}
                        deleteItem={deleteItem}
                        updateItem={updateItem}
                        showDetailsPage={showDetailsPage}
                    />
                ))}
                {isDetailsOpen && <Details
                    isOpen={isDetailsOpen}
                    onClose={() => setIsDetailsOpen(false)}
                    updateItem={updateItem}
                    selectedItem={selectedItem}
                />}
                {isNewItemOpen && <NewItem
                    isOpen={isNewItemOpen}
                    onClose={() => setIsNewItemOpen(false)}
                    applyNewItemResults={applyNewItemResults}
                />}
            </div>
        </div>
    );
};

export default Home;