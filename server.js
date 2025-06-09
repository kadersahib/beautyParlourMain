// server.js
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./backend/routes/auth.js');

app.use(cors());
app.use(express.json());



app.use('/api', authRoutes);

app.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
});




// // Serve static files from your existing project
// app.use(express.static(__dirname));

// // Temporary in-memory cart
// let cart = [];

// app.post('/api/add-to-cart', (req, res) => {
//   const { id, name, price, qty } = req.body;
//   const existing = cart.find(item => item.id === id);
//   if (existing) {
//     existing.qty += qty;
//   } else {
//     cart.push({ id, name, price, qty });
//   }
//   res.json({ message: 'Item added to cart', cart });
// });

// app.get('/api/cart', (req, res) => {
//   res.json(cart);
// });


// // Sample hardcoded users
// const users = [
//     { username: 'sanjith', password: '123456' },
//     { username: 'admin', password: 'admin123' }
//   ];
  
//   app.post('/api/login', (req, res) => {
//     const { username, password } = req.body;
//     const user = users.find(u => u.username === username && u.password === password);
  
//     if (user) {
//       res.json({ success: true, username });
//     } else {
//       res.status(401).json({ success: false, message: 'Invalid username or password' });
//     }
//   });

// const PORT = 3000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));



  