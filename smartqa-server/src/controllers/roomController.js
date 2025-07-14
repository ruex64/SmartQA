// const { request, response } = require("express");

// const roomController = {

// // post /room/    

//     createRoom: async (request, response) => {
//         try {
//             const { createdBy } = request.body;
//             const code = Math.random.toString(36).substring(2, 8).toUpperCase();
//             const room = await Rooms.create({
//                 roomCode: code,
//                 createdBy: createdBy
//             });
//             response.json(room);

//         } catch (error) {
//             console.log(error);
//             response.status(500).json({ message: 'Internal Server Error' });
//         }
//     },

// //get /room/:code
    
//     getByRoomCode: async (request, response) => {
//         try {
//             const code = request.params.code;

//             const room = await Rooms.findOne({ roomCode: code });
//             if (!room) {
//                 return response.status(404).json({ message: "Invalid room code" });
//             }
//             response.json(room);

//         } catch (error) {
//             console.log(error);
//         }
//     },

//     //post /room/:code/question
//     createQuestion: async (request, response) => {
//         try {
//             const { content, createdBy } = request.body;
//             const { code } = request.params;
//             const question = await Questions.create({
//                 roomCode: code,
//                 content: content,
//                 createdBy: createdBy
//             });
//             response.json(question);

//         } catch (error) {
//             console.log(error);
//             response.status(500).json({ message: "Internal server error" });
//         }
//     },

//     //get /room/:code/question
//     getQuestions: async (request, response) => {
//         try {
//             const code = request.params.code;
//             const questions = await Questions.find({ roomCode: code }).sort({ createdAt: -1 });
//             response.json(questions);

//         } catch (error) {
//             console.log(error);
//             request.status(500).json({ message: "Internal server Error" });
//         }
//     },

// };


// module.exports = roomController;


const Room = require("../models/Rooms");
const Question = require("../models/Questions");

// Create Room
exports.createRoom = async (req, res) => {
  try {
    const { name } = req.body;
    const room = new Room({ name, user: req.user._id });
    await room.save();
    res.status(201).json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get User Rooms
exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ user: req.user._id });
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add Question to Room
exports.addQuestion = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { questionText } = req.body;
    const room = await Room.findOne({ _id: roomId, user: req.user._id });
    if (!room) return res.status(404).json({ message: "Room not found" });

    const question = new Question({ questionText, room: roomId, user: req.user._id });
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Questions in Room
exports.getQuestions = async (req, res) => {
  try {
    const { roomId } = req.params;
    const questions = await Question.find({ room: roomId, user: req.user._id });
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//delete room
exports.deleteRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findOneAndDelete({ _id: roomId, user: req.user._id });
    if (!room) return res.status(404).json({ message: "Room not found or unauthorized" });

    await Question.deleteMany({ room: roomId, user: req.user._id }); // delete related questions
    res.status(200).json({ message: "Room and its questions deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//delete question
exports.deleteQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const question = await Question.findOneAndDelete({ _id: questionId, user: req.user._id });
    if (!question) return res.status(404).json({ message: "Question not found or unauthorized" });

    res.status(200).json({ message: "Question deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
