const db = require("../config/db");

// Add user
exports.addUser = (req, res) => { 
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email and password required" });

  db.query(
    "INSERT INTO users (email, password, walletBalance) VALUES (?, ?, ?)",
    [email, password, 10000],
    (err) => {
      if (err) return res.status(500).json({ message: "Server error" });
      res.json({ message: "User added successfully" });
    }
  );
};

// Get users
exports.getUsers = (req, res) => {
  db.query("SELECT id, email, walletBalance FROM users", (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });
    res.json(results);
  });
};

// Remove user
exports.removeUser = (req, res) => {
  const { id } = req.body;
  db.query("DELETE FROM users WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ message: "Server error" });
    res.json({ message: "User removed successfully" });
  });
};

// Reset balances
exports.resetBalances = (req, res) => {
  db.query("UPDATE users SET walletBalance = 10000", (err) => {
    if (err) return res.status(500).json({ message: "Server error" });
    res.json({ message: "All balances reset to 10000" });
  });
};

// Get logs from trades table
exports.getLogs = (req, res) => {
  const query = `
    SELECT user_id as userId, action, created_at as timestamp
    FROM trades
    ORDER BY created_at DESC
    LIMIT 50
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });
    res.json(results);
  });
};
