const express = require("express");
const mysql = require("mysql2");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Konfigurasi Basis Data
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: '',
  database: "design_order",
});

db.connect((err) => {
  if (err) {
    console.error("Koneksi basis data gagal:", err);
    process.exit(1);
  }
  console.log("Terhubung ke basis data.");
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: true,
  })
);

// Set folder views dan file statis
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Middleware untuk mengatur judul default untuk tata letak EJS
app.use((req, res, next) => {
  res.locals.title = "Design Order App"; // Judul default
  next();
});

// Rute
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/order");
const dashboardRoutes = require("./routes/dashboard");
const portfolioRoutes = require("./routes/portfolio");

app.use("/", authRoutes); // Login, Logout, Home
app.use("/order", orderRoutes); // Pesan Sekarang
app.use("/dashboard", dashboardRoutes); // Dashboard
app.use("/portfolio", portfolioRoutes); // Portfolio

// Mulai server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
