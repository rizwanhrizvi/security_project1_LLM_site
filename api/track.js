export default async function handler(req, res) {
    const { headers, query, method, url } = req;

    console.log("Request received:", { method, url, headers });

    const logUrl = `https://script.google.com/macros/s/AKfycbx3Q5Yi5NghybFhyXyHTmmKNyZqhGgyoJcV0anYFPdsh9N1jRSEDgRIwsWrVWaQJc4/exec?page=${encodeURIComponent(query.page || "unknown")}&ua=${encodeURIComponent(headers["user-agent"] || "unknown")}&ip=${encodeURIComponent(headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown")}`;

    // Call Google Script via GET
    try {
        await fetch(logUrl);
    } catch (err) {
        console.error("Failed to log to Google Sheets:", err);
    }
}
