const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");

// Middleware to protect routes
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: "Not authenticated" });
};

router.post("/create", isAuthenticated, roomController.createRoom);
router.get("/", isAuthenticated, roomController.getRooms);
router.post("/:roomId/questions", isAuthenticated, roomController.addQuestion);
router.get("/:roomId/questions", isAuthenticated, roomController.getQuestions);
router.delete("/:roomId", isAuthenticated, roomController.deleteRoom);
router.delete("/question/:questionId", isAuthenticated, roomController.deleteQuestion);

module.exports = router;
