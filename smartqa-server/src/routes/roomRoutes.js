// const express=require('express');

// const roomController=require('../controllers/roomController');
// const router=express.Router();



// router.post('/',roomController.createRoom);
// router.get('/:code',roomController.getByRoomCode);
// router.post('/:code/question',roomController.createQuestion);
// router.get('/:code/question',roomController.getQuestions);


// module.exports=router;
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
