const fetch = require('node-fetch'); // 确保引入正确
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 处理 POST 请求
app.post('/api/server', async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ error: "Missing 'url' in request body" });
        }

        const formData = new URLSearchParams();
        formData.append('url', url);
        formData.append('submitBtn', 'submit');

        const response = await fetch('https://twidropper.com/result', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formData.toString()
        });

        const html = await response.text();
        res.status(200).send(html); // 返回 HTML
    } catch (error) {
        res.status(500).json({ error: error.message }); // 捕获并返回错误
    }
});

// 导出模块（供 Vercel 使用）
module.exports = app;
