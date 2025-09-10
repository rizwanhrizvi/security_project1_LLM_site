import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { headers, method, url } = req;

  // Log the request (you can forward this to Google Apps Script too)
  console.log("Request received:", { method, url, headers });

  // Path to your HTML file
  const filePath = path.join(process.cwd(), "public", "index.html");

  try {
    const html = fs.readFileSync(filePath, "utf-8");

    // Respond with HTML
    res.setHeader("Content-Type", "text/html");
    res.status(200).send(html);
  } catch (err) {
    console.error("Failed to load HTML:", err);
    res.status(500).send("Server error");
  }

  const logUrl = `https://script.google.com/macros/s/AKfycbx3Q5Yi5NghybFhyXyHTmmKNyZqhGgyoJcV0anYFPdsh9N1jRSEDgRIwsWrVWaQJc4/exec?page=${encodeURIComponent(query.page || "unknown")}&ua=${encodeURIComponent(headers["user-agent"] || "unknown")}&ip=${encodeURIComponent(headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown")}`;

  // Call Google Script via GET
  try {
      await fetch(logUrl);
  } catch (err) {
      console.error("Failed to log to Google Sheets:", err);
  }
}
