const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();

// Connect to the database file
const dbPath = path.join(__dirname, "db", "namaadhu.db");
const namaadhu = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY);

// Helper: Convert "HH:MM" → total minutes
function toMinutes(timeStr) {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
}

// Helper: Determine the next prayer
function getNextPrayer(prayers, nowMinutes) {
  const order = ["fajr", "sunrise", "duhr", "asr", "maghrib", "isha"];
  for (const name of order) {
    const time = prayers[name];
    if (!time) continue;
    if (toMinutes(time) > nowMinutes) {
      const diff = toMinutes(time) - nowMinutes;
      return { name, time, minutesUntil: diff };
    }
  }
  // All prayers passed → next fajr (tomorrow)
  const diff = 24 * 60 - nowMinutes + toMinutes(prayers["fajr"]);
  return { name: "fajr (tomorrow)", time: prayers["fajr"], minutesUntil: diff };
}

// Route: Return today’s prayer times + next prayer
app.get("/", (req, res) => {
  console.log("HTTP", req.httpVersion, req.method, req.url, req.headers['user-agent']);
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const nowMinutes = today.getHours() * 60 + today.getMinutes();

  const query = `SELECT * FROM namaadhu WHERE month = ? AND day = ?`;
  namaadhu.get(query, [month, day], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ message: "No prayer times found for today." });

    const nextPrayer = getNextPrayer(row, nowMinutes);
    res.json({
      date: `${month}-${day}`,
      prayers: row,
      nextPrayer
    });
  });
});

// Start the server
const PORT = process.env.PORT || 6336;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
