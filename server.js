require('dotenv').config();
const cors = require('cors');
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

const connectDB = require('./config/database');
connectDB();

// Allow all origins (you can restrict it to specific origins later)
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
