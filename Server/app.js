const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB
const connectDB = async()=>{
    try{
        await mongoose.connect('mongodb://admin:_AbdulKhaliq@ac-m5zx3ns-shard-00-00.i2ian0y.mongodb.net:27017,ac-m5zx3ns-shard-00-01.i2ian0y.mongodb.net:27017,ac-m5zx3ns-shard-00-02.i2ian0y.mongodb.net:27017/User?ssl=true&replicaSet=atlas-7yzf9p-shard-0&authSource=admin&retryWrites=true&w=majority')
        console.log("DB Connected")
    }catch(error){
        console.log("error")
    }
}

connectDB();
const textSchema = new mongoose.Schema({
    text: String,
});

const Text = mongoose.model('Text', textSchema);

app.use(express.json());

app.get('/getText', async (req, res) => {
    try {
        const texts = await Text.find();
        res.json(texts);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving the text data.' });
    }
});


app.post('/saveText', async (req, res) => {
    const { text } = req.body;
    try {
        const newText = new Text({ text });
        await newText.save();
        res.json({ message: 'Text saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while saving the text.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
