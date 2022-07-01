require("dotenv").config();
const express = require("express");
const db = require("./utils/db");
const app = express();
const router = require("./routes/route");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000",
    })
);
// * cookie parser untuk parsing cookie dari refresh token
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

const port = 5000;

app.get("/", (req, res) => {
    res.send("hello express");
});

app.listen(port, async () => {
    try {
        await db.authenticate();
        console.log("Database Connected...");
        console.log(`Example app listening on port ${port}`);
    } catch (error) {
        console.log(error);
    }
});
