const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const PORT = 3001;

app.use(express.json())

const DbConnection = async () => {
    try {
        await mongoose.connect('mongodb+srv://curd:curd@cluster0.sh6mfsu.mongodb.net/?appName=Cluster0');
        console.log("MongoDb connected")
    } catch (err) {
        console.log(err);
    }
}

app.get('/', (req, res) => {
    res.send("Hello world");
})

const UserRouter = require('./routes/UserRoute')
app.use('/api', UserRouter);

DbConnection();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})