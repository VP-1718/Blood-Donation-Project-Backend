const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/dbConnect');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
