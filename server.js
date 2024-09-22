const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const dotenv = require('dotenv');
const cors = require('cors')
dotenv.config()

const app = express();
const PORT = process.env.PORT || PORT;

app.use(bodyParser.json());
app.use(cors());

// POST endpoint
app.post('/bfhl', (req, res) => {
    const { data, file_b64 } = req.body;
    const user_id = "john_doe_17091999"; // Example user ID
    const email = "john@xyz.com"; // Example email
    const roll_number = "ABCD123"; // Example roll number

    if (!Array.isArray(data)) {
        return res.status(400).json({ is_success: false });
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const highest_lowercase_alphabet = alphabets.filter(char => char === char.toLowerCase());
    const lastChar = highest_lowercase_alphabet.sort().pop();

    const fileValid = !!file_b64; // Check if file_b64 is provided
    const fileMimeType = fileValid ? 'image/png' : null; // Replace with actual MIME type handling
    const fileSizeKB = fileValid ? Buffer.from(file_b64, 'base64').length / 1024 : 0;

    return res.json({
        is_success: true,
        user_id: user_id,
        email: email,
        roll_number: roll_number,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: lastChar ? [lastChar] : [],
        file_valid: fileValid,
        file_mime_type: fileMimeType,
        file_size_kb: fileSizeKB.toFixed(2)
    });
});

// GET endpoint
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});