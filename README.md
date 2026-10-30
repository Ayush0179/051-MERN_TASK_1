# Item Management System – CRUD Application

A simple and interactive **CRUD (Create, Read, Update, Delete) application** developed using HTML, CSS, JavaScript, Node.js and Express.js.

This project demonstrates how to build a frontend that communicates with a backend through REST APIs to perform CRUD operations on an array of items.

## 🚀 Features

- **Create Items:** Add new items with their name and price.
- **Read Items:** Retrieve and display all available items.
- **Update Items:** Edit the details of existing items.
- **Delete Items:** Remove items from the list.
- **Dynamic Interface:** Automatically refresh the item list after operations.
- **Input Validation:** Validate item names and prices.
- **REST API Integration:** Communicate with the backend using JavaScript Fetch API.
- **Postman Testing:** Test API endpoints independently.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Frontend structure |
| CSS3 | Styling and responsive layout |
| JavaScript | Frontend logic and API communication |
| Node.js | Backend runtime environment |
| Express.js | REST API development |
| JavaScript Array | Temporary item storage |
| Postman | API testing |

## 📁 Project Structure

```text
item-crud-app/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### Prerequisites

- Node.js installed on your computer.
- npm package manager.
- Postman (optional, for API testing).

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/item-crud-app.git
```

Navigate to the project directory:

```bash
cd item-crud-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Application

For development:

```bash
npm run dev
```

Alternatively:

```bash
npm start
```

### 4. Open the Application

Visit the following URL in your browser:

```text
http://localhost:5000
```

## 🔌 REST API Endpoints

Base URL:

```text
http://localhost:5000/api/items
```

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/api/items` | Retrieve all items |
| POST | `/api/items` | Add a new item |
| PUT | `/api/items/:id` | Update an existing item |
| DELETE | `/api/items/:id` | Delete an item |

### Example API Requests

**1. Create an Item – POST**

```json
{
  "name": "Gaming Mouse",
  "price": 2500
}
```

**2. Update an Item – PUT**

```json
{
  "name": "Wireless Gaming Mouse",
  "price": 3500
}
```

**3. Retrieve Items – GET**

Returns an array containing all available items.

**4. Delete an Item – DELETE**

Pass the item ID in the URL to remove the corresponding item.

## 🧪 API Testing Using Postman

The REST API endpoints can be tested independently using Postman.

1. Open Postman.
2. Create a new HTTP request.
3. Select the appropriate HTTP method.
4. Enter the API endpoint.
5. For POST and PUT requests, select Body → raw → JSON.
6. Send the request and inspect the response.

## 📌 How It Works

1. The user interacts with the frontend interface.
2. JavaScript captures the input values.
3. The Fetch API sends HTTP requests to the Express backend.
4. Express processes the requested CRUD operation.
5. The JavaScript array is updated accordingly.
6. The backend returns a JSON response.
7. The frontend refreshes the displayed item list.

## ⚠️ Note About Data Storage

This application uses an in-memory JavaScript array for storing items.

Therefore, all modifications are temporary. The array resets to its initial sample data whenever the Node.js server restarts.

No external database is required for this project.

## 🔮 Future Improvements

- Persistent data storage using a database.
- Search and filter functionality.
- Improved user interface.
- Pagination for large item collections.
- Additional input validation and error handling.

## 👨‍💻 Author

Ayush R
GitHub: [My GitHub Profile](https://github.com/YOUR-Ayush0179)

## 📄 License

This project was developed for educational purposes as part of a web development assignment.
