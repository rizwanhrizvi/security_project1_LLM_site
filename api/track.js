export default function handler(req, res) {
    const { headers, method, url } = req;

    console.log("Request received:", { method, url, headers });

    // You can log requests to a DB, or Google Sheet, etc.
    
    // Respond with a 1x1 transparent image
    const img = Buffer.from(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgQMB9D8AAAAASUVORK5CYII=",
        "base64"
    );
    res.setHeader("Content-Type", "image/png");
    res.status(200).send(img);
}
