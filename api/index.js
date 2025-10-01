import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const { method, query, url, headers } = req;

  // Extract only important headers
  const importantHeaders = {
    "user-agent": headers["user-agent"],
    "x-forwarded-for": headers["x-forwarded-for"] || req.socket.remoteAddress,
    "host": headers["host"],
    "accept": headers["accept"],
  };

  const requestLog = {
    method,
    url,
    query,
    headers: importantHeaders,
    cookies: headers.cookie,
    referer: headers.referer,
    origin: headers.origin,
  };
  
  if (method !== "GET") {
    requestLog.bodyPreview = req.body ? JSON.stringify(req.body).slice(0, 450) : null;
  }
  
  console.log("Request received:", requestLog);


  // const logUrl = `https://script.google.com/macros/s/AKfycbx3Q5Yi5NghybFhyXyHTmmKNyZqhGgyoJcV0anYFPdsh9N1jRSEDgRIwsWrVWaQJc4/exec?page=${encodeURIComponent(query.page || "unknown")}&ua=${encodeURIComponent(headers["user-agent"] || "unknown")}&ip=${encodeURIComponent(headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown")}`;

  // // Call Google Script via GET
  // try {
  //   await fetch(logUrl);
  // } catch (err) {
  //   console.error("Failed to log to Google Sheets:", err);
  // }

  // Serve the HTML
  const filePath = path.join(process.cwd(), "public", "site.html");

  if (!fs.existsSync(filePath)) {
    console.error("HTML file not found:", filePath);
    // Log response before sending
    console.log("Response:", {
      statusCode: 500,
      headers: { "Content-Type": "text/plain" },
      bodyPreview: "HTML file missing",
    });
    return res.status(500).send("HTML file missing");
  }

  try {
    const html = fs.readFileSync(filePath, "utf-8");

    // Log the response before sending
    console.log("Response:", {
      statusCode: 200,
      headers: { "Content-Type": "text/html" },
      bodyPreview: html.slice(0, 200) + (html.length > 200 ? "..." : ""),
    });

    res.setHeader("Content-Type", "text/html");
    res.status(200).send(html);
  } catch (err) {
    console.error("Error reading HTML:", err);
    // Log response before sending
    console.log("Response:", {
      statusCode: 500,
      headers: { "Content-Type": "text/plain" },
      bodyPreview: "Server error",
    });
    res.status(500).send("Server error");
  }
}

