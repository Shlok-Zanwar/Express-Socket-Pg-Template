const { Router } = require('express');
// import games from "./games.route.js";
// import auth from "./auth.route.js";

const router = Router();

// router.use("/games", games);
// router.use("/auth", auth);

router.get("/", (req, res) => {
    res.send("Hello World!");
});

module.exports = router;
