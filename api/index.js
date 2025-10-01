import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const { method, query, url, headers } = req;

  // Log request
  // console.log("Request received:", { method, query, url, headers });

  console.log("Request received:", req);
  console.log("Response sent:", res);

  const logUrl = `https://script.google.com/macros/s/AKfycbx3Q5Yi5NghybFhyXyHTmmKNyZqhGgyoJcV0anYFPdsh9N1jRSEDgRIwsWrVWaQJc4/exec?page=${encodeURIComponent(query.page || "unknown")}&ua=${encodeURIComponent(headers["user-agent"] || "unknown")}&ip=${encodeURIComponent(headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown")}`;

  // Call Google Script via GET
  try {
      await fetch(logUrl);
  } catch (err) {
      console.error("Failed to log to Google Sheets:", err);
  }

  // Serve the HTML
  const filePath = path.join(process.cwd(), "public", "site.html");

  if (!fs.existsSync(filePath)) {
    console.error("HTML file not found:", filePath);
    return res.status(500).send("HTML file missing");
  }

  try {
    const html = fs.readFileSync(filePath, "utf-8");
    res.setHeader("Content-Type", "text/html");
    res.status(200).send(html);
  } catch (err) {
    console.error("Error reading HTML:", err);
    res.status(500).send("Server error");
  }
}
