
import axios from "axios";

// Fetches all items from the backend API. No parameters.
export const fetchDataAPI = async () => {
    try {
        const response = await axios.get("http://127.0.0.1:8000/items");
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

// Updates an item by ID with new values. Parameters: itemId (string|number), newValues (object)
export const updateItemAPI = async (itemId, newValues) => {
    try {
        const response = await axios.put(`http://127.0.0.1:8000/items/${itemId}`, newValues);
        return response.data;
    } catch (error) {
        console.error("Error updating item:", error);
        throw error;
    }
};

// Searches items by field and query. Parameters: field (string), query (string)
export const searchItemsAPI = async (field, query) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/items/search?field=${encodeURIComponent(field)}&query=${encodeURIComponent(query)}`);
        return response.data;
    } catch (error) {
        console.error("Error searching items:", error);
        return [];
    }
};

// Deletes a single item by ID. Parameter: itemId (string|number)
export const deleteItemAPI = async (itemId) => {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/items/${itemId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting item:", error);
        throw error;
    }
};

// Deletes multiple items by their IDs. Parameter: ids (array)
export const deleteMultipleItemsAPI = async (ids) => {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/items`, { data: { ids } });
        return response.data;
    } catch (error) {
        console.error("Error deleting item:", error);
        throw error;
    }
};

// Creates a new item. Parameter: newItem (object)
export const createItemAPI = async (newItem) => {
    try {
        const response = await axios.post("http://127.0.0.1:8000/items", newItem);
        return response.data;
    } catch (error) {
        console.error("Error adding item:", error);
        throw error;
    }
};