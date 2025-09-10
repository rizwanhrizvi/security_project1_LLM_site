import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const { method, url, headers } = req;

  // Log the request
  console.log("Request received:", { method, url, headers });

  // const logUrl = `https://script.google.com/macros/s/AKfycbx3Q5Yi5NghybFhyXyHTmmKNyZqhGgyoJcV0anYFPdsh9N1jRSEDgRIwsWrVWaQJc4/exec?page=${encodeURIComponent(query.page || "unknown")}&ua=${encodeURIComponent(headers["user-agent"] || "unknown")}&ip=${encodeURIComponent(headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown")}`;

  // // Call Google Script via GET
  // try {
  //     await fetch(logUrl);
  // } catch (err) {
  //     console.error("Failed to log to Google Sheets:", err);
  // }

  // Serve the HTML
  const filePath = path.join(process.cwd(), "public", "site.html");

  try {
    const html = fs.readFileSync(filePath, "utf-8");
    res.setHeader("Content-Type", "text/html");
    res.status(200).send(html);
  } catch (err) {
    console.error("Error reading HTML:", err);
    res.status(500).send("Server error");
  }
}
