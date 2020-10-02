describe('TaskManager', () => {
  describe('#constructor', () => {
    describe('when initializing a new TaskManager', () => {
      it('should create an empty tasks array', () => {
   
        const taskManager = new TaskManager(0);
        expect(taskManager.tasks).toEqual([]);

      });
      it('should set the currentId to the passed in number', () => {
        let id = 1;
        const taskManager = new TaskManager(id);
        expect(taskManager.currentId).toBe(id);

      });
    });
  });
  describe('#addTask', () => {
    describe('passing new task data as parameters', () => {
      it('should add the task to the tasks array', () => {
        const taskManager = new TaskManager(0);

        const task = {
          id: taskManager.currentId,
          name: 'Cook Dinner',
          description: 'Spaghetti Meatballs',
          assignedTo: 'Wifey',
          dueDate: Date.now(),
          status: status
        };

        taskManager.addTask(task.name, task.description, task.assignedTo, task.dueDate, task.status);

        expect(taskManager.tasks[0]).toEqual(task);
      });

      it('should increment the currentId property', () => {
        const taskManager = new TaskManager(0);

        const task = {
          id: taskManager.currentId,
          name: 'Learn Javascript ',
          description: 'Functions, Arrays, Objects',
          assignedTo: 'Rob',
          dueDate: Date.now(),
          status: status
        };

        taskManager.addTask(task.name, task.description, task.assignedTo, task.dueDate, task.status);

        expect(taskManager.currentId).toBe(1);
       
      });
    });
  });
  describe('#deleteTask', () => {
    describe('when passed an existing taskId', () => {
      it('should remove the task from the tasks array', () => {
        const taskManager = new TaskManager();

        const deleteTask = {
          id: taskManager.currentId,
          name: 'Learn Javascript ',
          description: 'Functions, Arrays, Objects',
          assignedTo: 'Rob',
          dueDate: Date.now(),
          status: status
        };

        taskManager.addTask(deleteTask.name, deleteTask.description, deleteTask.assignedTo, deleteTask.dueDate, deleteTask.status);
        taskManager.addTask('Learn CSS', 'Borders, Box-Model', 'Ken', Date.now());

        taskManager.deleteTask(deleteTask.id);

        expect(taskManager.tasks).not.toContain(deleteTask);

      });
    });
  });
  describe('#getTaskById', () => {
    describe('when passed an existing taskId', () => {
      it('should return the task', () => {
        const taskManager = new TaskManager();

        const task = {
          id: taskManager.currentId,
          name: 'Learn Javascript ',
          description: 'Functions, Arrays, Objects',
          assignedTo: 'Rob',
          dueDate: Date.now(),
          status: status
        };

        taskManager.addTask(task.name, task.description, task.assignedTo, task.dueDate, task.status);

        const result = taskManager.getTaskById(task.id);

        expect(result).toEqual(task);

      });
    });
  });
  describe('#save', () => {
    describe('when tasks exist in the task manager', () => {
      it('should store the tasks in local storage', () => {
        const taskManager = new TaskManager();

        const task = {
          id: taskManager.currentId,
          name: 'Learn Javascript ',
          description: 'Functions, Arrays, Objects',
          assignedTo: 'Rob',
          dueDate: Date.now(),
          status: status
        };

        taskManager.addTask(task.name, task.description, task.assignedTo, task.dueDate, task.status);

        // create JSON of the task in an array
        const tasksJson = JSON.stringify([task]);

        // spy on the localStorage
        const localStorageSpy = spyOn(localStorage, 'setItem');

        // call save
        taskManager.save();

        // check if localStorage was called first with the tasks key and the json
        expect(localStorageSpy.calls.first().args).toEqual(['tasks', tasksJson]);

      });

      it('should store the currentId in local storage', () => {
        const taskManager = new TaskManager();

        taskManager.addTask('test', 'test', 'test', Date.now());

        // spy on the localStorage
        const localStorageSpy = spyOn(localStorage, 'setItem');

        // call save
        taskManager.save();

        // create string of the currentId
        const currentId = String(taskManager.currentId);

        // check if localStorage was called last with the currentId key and the currentId
        expect(localStorageSpy.calls.mostRecent().args).toEqual(['currentId', currentId]);
      });
    });
  });
  describe('#load', () => {
    describe('when tasks are saved in localStorage', () => {
      it('should set the tasks array to the saved tasks', () => {
        const taskManager = new TaskManager();

        const task = {
          id: taskManager.currentId,
          name: 'Learn Javascript ',
          description: 'Functions, Arrays, Objects',
          assignedTo: 'Rob',
          dueDate: Date.now(),
          status: status
        };

        // create a tasks array
        const tasks = [task];

        // create JSON of the tasks array
        const tasksJson = JSON.stringify(tasks);

        // spy on localStorage.getItem() and return the tasksJson.
        spyOn(localStorage, 'getItem').and.returnValue(tasksJson);

        // call load
        taskManager.load();

        expect(taskManager.tasks).toEqual(tasks);

      });
    });

    describe('when the currentId is saved in localStorage', () => {
      it('should set the currentId to the saved currentId', () => {
        const taskManager = new TaskManager();

        // spy on localStorage.getItem() and return a currentId as a string.
        spyOn(localStorage, 'getItem').and.returnValue('1');

        // call load
        taskManager.load();

        expect(taskManager.currentId).toBe(1);
        // expect(taskManager.currentId).toBe(2);
      });
    });
  });
});