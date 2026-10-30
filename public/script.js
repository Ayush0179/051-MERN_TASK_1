
const API_URL = "/api/items";

// Get HTML elements
const itemForm = document.getElementById("item-form");
const itemName = document.getElementById("item-name");
const itemPrice = document.getElementById("item-price");
const itemList = document.getElementById("item-list");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submit-btn");
const formTitle = document.getElementById("form-title");
const cancelBtn = document.getElementById("cancel-btn");
const refreshBtn = document.getElementById("refresh-btn");

let editingId = null;

// Display messages
function showMessage(text, isError = false) {
    message.textContent = text;
    message.style.color = isError ? "red" : "green";
}

// GET: Fetch and display all items
async function fetchItems() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch items");
        }

        const items = await response.json();

        itemList.innerHTML = "";

        if (items.length === 0) {
            itemList.innerHTML = `
                <tr>
                    <td colspan="4">No items found</td>
                </tr>
            `;
            return;
        }

        items.forEach(item => {
            const row = document.createElement("tr");

            const idCell = document.createElement("td");
            idCell.textContent = item.id;

            const nameCell = document.createElement("td");
            nameCell.textContent = item.name;

            const priceCell = document.createElement("td");
            priceCell.textContent = `₹${item.price}`;

            const actionsCell = document.createElement("td");

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.className = "edit-btn";
            editButton.addEventListener("click", () => editItem(item));

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "delete-btn";
            deleteButton.addEventListener("click", () => deleteItem(item.id));

            actionsCell.append(editButton, deleteButton);
            row.append(idCell, nameCell, priceCell, actionsCell);

            itemList.appendChild(row);
        });

    } catch (error) {
        showMessage(error.message, true);
    }
}

// POST: Add a new item
// PUT: Update an existing item
itemForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = itemName.value.trim();
    const price = itemPrice.value;

    if (!name || price === "" || !Number.isFinite(Number(price)) || Number(price) < 0) {
        showMessage("Please enter a valid name and price", true);
        return;
    }

    const itemData = {
        name,
        price: Number(price)
    };

    try {
        const url = editingId === null
            ? API_URL
            : `${API_URL}/${editingId}`;

        const method = editingId === null ? "POST" : "PUT";

        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(itemData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Operation failed");
        }

        showMessage(result.message);

        resetForm();
        fetchItems();

    } catch (error) {
        showMessage(error.message, true);
    }
});

// Load an item into the form for editing
function editItem(item) {
    editingId = item.id;

    itemName.value = item.name;
    itemPrice.value = item.price;

    formTitle.textContent = "Update Item";
    submitBtn.textContent = "Update Item";
    cancelBtn.hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Reset form after submission or cancellation
function resetForm() {
    editingId = null;

    itemForm.reset();

    formTitle.textContent = "Add New Item";
    submitBtn.textContent = "Add Item";
    cancelBtn.hidden = true;
}

// DELETE: Remove an item
async function deleteItem(id) {
    if (!confirm("Are you sure you want to delete this item?")) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Delete failed");
        }

        showMessage(result.message);

        if (editingId === id) {
            resetForm();
        }

        fetchItems();

    } catch (error) {
        showMessage(error.message, true);
    }
}

// Cancel editing
cancelBtn.addEventListener("click", resetForm);

// Refresh item list
refreshBtn.addEventListener("click", fetchItems);

// Load items when page opens
fetchItems();
