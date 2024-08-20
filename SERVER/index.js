require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoute');
// const chatRoutes = require('./routes/chat');
const cors=require("cors")
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
// app.use('/api/chat', chatRoutes);

// Connect to MongoDB
const db = process.env.MONGO_URI;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
   
    app.get('/', (req, res) => {
        res.send('Server running on port 3000')
    });
    const HOST= process.env.HOST||"192.168.78.131";
    
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`server is up and running on port: http://${HOST}:${PORT}`);
})