const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/server', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).send({ error: "URL is required" });
    }

    try {
        const formData = new URLSearchParams();
        formData.append('url', url);
        formData.append('submitBtn', 'submit');

        const response = await fetch('https://twidropper.com/result', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formData.toString()
        });

        const html = await response.text();
        res.send(html); // 返回 HTML 给前端解析
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Start server (for local development)
if (process.env.NODE_ENV !== 'production') {
    app.listen(3000, () => console.log('Server running on port 3000'));
}

module.exports = app; // For Vercel
