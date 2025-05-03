interface Item {
    id: string; // Unique identifier for the item
    name: string; // Name of the item, e.g., "California Roll"
    price: number; // Price of the item
    quantity: number; // Quantity of the item purchased
    assignedToUserId: string | null; // User ID if the item is assigned to a user, null otherwise
    matched: boolean; // Whether the item has been matched
}

export default Item;