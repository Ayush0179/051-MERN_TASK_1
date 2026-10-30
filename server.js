
const express = require("express");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Temporary array to store items
let items = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Headphones", price: 2000 },
    { id: 3, name: "Keyboard", price: 1500 }
];

// Home route
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// GET: Fetch all items
app.get("/api/items", (req, res) => {
    res.json(items);
});

app.post("/api/items", (req, res) => {
    const { name, price } = req.body;

    if (!name || price === undefined || price === "") {
        return res.status(400).json({
            message: "Name and price are required"
        });
    }

    if (!Number.isFinite(Number(price)) || Number(price) < 0) {
        return res.status(400).json({
            message: "Price must be a valid non-negative number"
        });
    }

    const newItem = {
        id: items.length > 0
            ? Math.max(...items.map(item => item.id)) + 1
            : 1,
        name: name.trim(),
        price: Number(price)
    };

    items.push(newItem);

    res.status(201).json({
        message: "Item added successfully",
        item: newItem
    });
});

app.put("/api/items/:id", (req, res) => {
    const id = Number(req.params.id);
    const { name, price } = req.body;

    const item = items.find(item => item.id === id);

    if (!item) {
        return res.status(404).json({
            message: "Item not found"
        });
    }

    if (!name || !Number.isFinite(Number(price)) || Number(price) < 0) {
        return res.status(400).json({
            message: "Valid name and price are required"
        });
    }

    item.name = name.trim();
    item.price = Number(price);

    res.json({
        message: "Item updated successfully",
        item
    });
});

app.delete("/api/items/:id", (req, res) => {
    const id = Number(req.params.id);

    const itemIndex = items.findIndex(item => item.id === id);

    if (itemIndex === -1) {
        return res.status(404).json({
            message: "Item not found"
        });
    }

    const deletedItem = items.splice(itemIndex, 1);

    res.json({
        message: "Item deleted successfully",
        item: deletedItem[0]
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
