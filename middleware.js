import fs from "fs";
import path from "path";

export const config = {
  runtime: "edge", // Required for Vercel Edge Function
};

export default async function handler(req) {
  const { url, query, headers, method } = req;

  console.log("Request received:", { method, query, url, headers });

  const logUrl = `https://script.google.com/macros/s/AKfycbx3Q5Yi5NghybFhyXyHTmmKNyZqhGgyoJcV0anYFPdsh9N1jRSEDgRIwsWrVWaQJc4/exec?page=${encodeURIComponent(query.page || "unknown")}&ua=${encodeURIComponent(headers["user-agent"] || "unknown")}&ip=${encodeURIComponent(headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown")}`;

  // Call Google Script via GET
  try {
      await fetch(logUrl);
  } catch (err) {
      console.error("Failed to log to Google Sheets:", err);
  }

  // Serve HTML
  const filePath = path.join(process.cwd(), "public", "site.html");

  try {
    const html = fs.readFileSync(filePath, "utf-8");
    return new Response(html, {
      status: 200,
      headers: { "Content-Type": "text/html" },
    });
  } catch (err) {
    console.error("Error reading HTML:", err);
    return new Response("Server error", { status: 500 });
  }
}
