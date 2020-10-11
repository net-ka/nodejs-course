const Task = require('../../resources/tasks/task.model');

const DBTasks = [];

(() => {
  for (let i = 0; i < 3; i++) {
    DBTasks.push(new Task());
  }
})();

const getAllTasksByBoard = async boardId => {
  return DBTasks.filter(task => task.boardId === boardId);
};

const getTaskById = async id => {
  return DBTasks.find(task => task.id === id);
};

const createTaskByBoard = async task => {
  DBTasks.push(task);

  return getTaskById(task.id);
};

const deleteTask = async id => {
  const index = DBTasks.findIndex(task => task.id === id);

  if (index >= 0) {
    const deletedTask = DBTasks.splice(index, 1);

    return deletedTask;
  }

  return null;
};

const updateTask = async (id, updatedTaskData) => {
  const index = DBTasks.findIndex(task => task.id === id);

  const updatedTask = { id, ...updatedTaskData };

  DBTasks[index] = updatedTask;

  return getTaskById(id);
};

const changeUserIdToNull = async id => {
  DBTasks.forEach(task => {
    if (task.userId === id) {
      task.userId = null;
    }
  });
};

const deleteTasksForDeletedBoard = async boardId => {
  const tasksForDelete = DBTasks.map(task => {
    if (task.boardId === boardId) {
      return task.id;
    }
  });

  if (tasksForDelete.length > 0) {
    tasksForDelete.forEach(taskId => {
      deleteTask(taskId);
    });
  }
};

module.exports = {
  getAllTasksByBoard,
  getTaskById,
  createTaskByBoard,
  deleteTask,
  updateTask,
  changeUserIdToNull,
  deleteTasksForDeletedBoard
};
