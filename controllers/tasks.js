const mongoose = require("mongoose");

const Task = require("../models/tasks");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");
// const getAllTasks = async (_, res) => {
//   try {
//     const tasks = await Task.find({});
//     res.status(200).json({ tasks });
//     // res.status(200).json({ tasks, amount: tasks.length });
//     // res
//     //   .status(200)
//     //   .json({ success: true, data: { tasks, nbHits: tasks.length } });
//   } catch (error) {
//     res.status(500).json(error.message);
//   }
// };
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

// const getTask = async (req, res) => {
//   //   res.json({ id: req.params.id });
//   // console.log(req.params.id);
//   try {
//     const task = await Task.findOne({ _id: req.params.id });
//     if (!task) {
//       return res.status(404).json({ msg: `No task with id ${id}` });
//     }
//     res.status(200).json({ task });
//   } catch (error) {
//     res.status(500).json(error.message);
//   }
// };
// const getTask = asyncWrapper(async (req, res, next) => {
//   // console.log(mongoose.Types.ObjectId.isValid(req.params.id));
//   // try {
//   //   const task = await Task.find({ _id: req.params.id });
//   // } catch (error) {
//   //   res.status(404).json("Not Found");
//   // }
//   const task = await Task.findOne({ _id: req.params.id });

//   // console.log(task);
//   if (!task) {
//     // const error = new Error("Not Found");
//     // error.status = 404;
//     // console.log(error);
//     // return next(error);
//     return next(createCustomError(`No task with id ${id}`, 404));
//     //return res.status(404).json({ msg: `No task with id ${id}` });
//   }
//   res.status(200).json({ task });
// });
const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }

  res.status(200).json({ task });
});

// const createTask = async (req, res) => {
//   try {
//     const task = await Task.create(req.body);
//     res.status(201).json({ task });
//   } catch (error) {
//     res.status(500).json(error.message);
//   }
// };

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

// const deleteTask = async (req, res) => {
//   //   res.send("delete task");
//   try {
//     const { id: taskID } = req.params;
//     const task = await Task.findOneAndDelete({ _id: taskID });
//     if (!task) {
//       return res.status(404).json({ msg: "No task with id ${taskID}" });
//     }
//     res.status(200).json({ success: true });
//   } catch (error) {
//     res.status(500).json({ success: false });
//   }
// };
const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id ${id}`, 404));
  }
  res.status(200).json({ success: true });
});

// const updateTask = async (req, res) => {
//   //   res.send("Update Task");
//   //   console.log(req.body);
//   const { id: taskID } = req.params;
//   try {
//     // const taskId = await Task.findOneAndUpdate
//     // res.status(200).json({ id: taskID, data: req.body });
//     const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!task) {
//       return res.status(404).json({ msg: `No task with id : ${taskID}` });
//     }
//     return res.status(200).json({ task });
//   } catch (error) {
//     res.status(500).json({ success: false });
//   }
// };

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`No task with id ${id}`, 404));
  }
  return res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
