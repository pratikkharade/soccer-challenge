# main.py
from fastapi import FastAPI, Query, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi.middleware.cors import CORSMiddleware
from bson import ObjectId
from fastapi import Body

app = FastAPI()

# Allow local React frontend to access API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect to MongoDB Atlas
client = AsyncIOMotorClient("mongodb+srv://pkharade:pkharade-soccer-fastapis@cluster0.dq8wgsf.mongodb.net/")
db = client["soccer_fastapis"]
collection = db["master"]

@app.get("/items")
async def get_items():
    """
    Retrieve all items from the database.
    Returns:
        List of all documents with ObjectId converted to string.
    """
    items = []
    cursor = collection.find({})
    # Iterate over cursor asynchronously and convert ObjectId to string
    async for document in cursor:
        document["_id"] = str(document["_id"])  # convert ObjectId to string
        items.append(document)
    return items

@app.put("/items/{item_id}")
async def update_item(item_id: str, new_values: dict = Body(...)):
    """
    Update fields of an existing item by its ID.
    Args:
        item_id (str): The ObjectId of the item to update.
        new_values (dict): Dictionary of fields and new values to update.
    Returns:
        Status message with count of updated documents.
    Raises:
        HTTPException 404 if item not found.
    """
    # Attempt to convert string values to int or float where applicable
    for key, value in new_values.items():
        if isinstance(value, str):
            try:
                if "." in value:
                    new_values[key] = float(value)
                else:
                    new_values[key] = int(value)
            except ValueError:
                # Leave value as string if conversion fails
                pass
    
    # Update the document matching the ObjectId
    result = await collection.update_one(
        {"_id": ObjectId(item_id)},
        {"$set": new_values}
    )
    if result.matched_count == 0:
        # Raise 404 if no document found with given id
        raise HTTPException(status_code=404, detail="Item not found")
    return {"status": "success", "updated_count": result.modified_count}

@app.get("/items/search")
async def search_items(field, query):
    """
    Search items by a specified field and query value.
    Args:
        field (str): The document field to search on.
        query (str): The search query string or numeric value.
    Returns:
        List of matched documents with ObjectId converted to string.
    """
    try:
        # Try converting query to a float to check if numeric search
        num_value = float(query)
        is_numeric = True
    except ValueError:
        is_numeric = False
    
    if is_numeric:
        # Numeric search: exact match on the field
        cursor = collection.find({field: num_value})
    else:
        # Text search: case-insensitive regex match on the field
        cursor = collection.find({field: {"$regex": query, "$options": "i"}})
    
    results = []
    # Iterate over cursor asynchronously and convert ObjectId to string
    async for document in cursor:
        document["_id"] = str(document["_id"])
        results.append(document)
    return results

@app.delete("/items/{item_id}")
async def delete_item(item_id):
    """
    Delete a single item by its ID.
    Args:
        item_id (str): The ID of the item to delete.
    Returns:
        Status message with count of deleted documents.
    Raises:
        HTTPException 404 if item not found.
    """
    # Delete document matching the ObjectId
    result = await collection.delete_one({"_id": ObjectId(item_id)})
    if result.deleted_count == 0:
        # Raise 404 if no document found with given id
        raise HTTPException(status_code=404, detail="Item not found")
    return {"status": "success", "deleted_count": result.deleted_count}


@app.delete("/items")
async def delete_multiple_items(payload: dict = Body(...)):
    """
    Delete multiple items by a list of IDs.
    Args:
        payload (dict): Dictionary containing "ids" key with list of ID strings.
    Returns:
        Status message with count of deleted documents.
    Raises:
        HTTPException 400 for invalid ID format.
        HTTPException 404 if no items found to delete.
    """
    try:
        ids = payload.get("ids", [])
        # Convert string IDs to ObjectId instances
        object_ids = [ObjectId(id) for id in ids]
    except Exception:
        # Raise 400 if any ID is invalid format
        raise HTTPException(status_code=400, detail="Invalid ID format")

    # Delete all documents with _id in the list of ObjectIds
    result = await collection.delete_many({"_id": {"$in": object_ids}})
    if result.deleted_count == 0:
        # Raise 404 if no documents found to delete
        raise HTTPException(status_code=404, detail="No items found to delete")
    return {"status": "success", "deleted_count": result.deleted_count}

@app.post("/items")
async def create_item(new_item: dict = Body(...)):
    """
    Create a new item in the database.
    Args:
        new_item (dict): Dictionary representing the new item data.
    Returns:
        Status message with inserted document ID.
    Raises:
        HTTPException 400 if no data provided.
    """
    if not new_item:
        # Raise 400 if request body is empty
        raise HTTPException(status_code=400, detail="No data provided")

    # Insert new document into collection
    result = await collection.insert_one(new_item)
    return {"status": "success", "inserted_id": str(result.inserted_id)}