document.getElementById('addTaskBtn').addEventListener('click', addTask);
document.getElementById('taskList').addEventListener('click', handleTaskActions);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskCategory = document.getElementById('taskCategory');
    const taskNotes = document.getElementById('taskNotes');
    const taskDateTime = document.getElementById('taskDateTime');
    const taskReminder = document.getElementById('taskReminder');
    const taskText = taskInput.value.trim();
    const taskCat = taskCategory.value;
    const taskNote = taskNotes.value.trim();
    const taskTime = taskDateTime.value;
    const reminderTime = taskReminder.value;

    if (taskText === '' || taskTime === '' || taskCat === '') {
        alert('Please enter task, category, and date/time.');
        return;
    }

    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');
    taskItem.innerHTML = `
        <span class="category">${taskCat}</span>
        <span>${taskText} - ${new Date(taskTime).toLocaleString()}</span>
        <div class="notes">${taskNote}</div>
        <div class="task-actions">
            <button class="edit">Edit</button>
            <button class="complete">Complete</button>
            <button class="delete">Delete</button>
        </div>
    `;

    document.getElementById('taskList').appendChild(taskItem);
    taskInput.value = '';
    taskCategory.value = '';
    taskNotes.value = '';
    taskDateTime.value = '';
    taskReminder.value = '';

    if (reminderTime !== '') {
        setReminder(taskText, reminderTime);
    }
}

function handleTaskActions(e) {
    const targetClass = e.target.classList;
    const taskItem = e.target.closest('.task-item');

    if (targetClass.contains('edit')) {
        editTask(taskItem);
    } else if (targetClass.contains('complete')) {
        completeTask(taskItem);
    } else if (targetClass.contains('delete')) {
        deleteTask(taskItem);
    }
}

function editTask(taskItem) {
    const taskCategory = taskItem.querySelector('.category').innerText;
    const taskText = taskItem.querySelector('span:nth-child(2)').innerText.split(' - ')[0];
    const taskDateTime = new Date(taskItem.querySelector('span:nth-child(2)').innerText.split(' - ')[1]);
    const taskNotes = taskItem.querySelector('.notes').innerText;

    document.getElementById('taskInput').value = taskText;
    document.getElementById('taskCategory').value = taskCategory;
    document.getElementById('taskDateTime').value = taskDateTime.toISOString().slice(0, 16);
    document.getElementById('taskNotes').value = taskNotes;
    taskItem.remove();
}

function completeTask(taskItem) {
    taskItem.classList.toggle('complete');
}

function deleteTask(taskItem) {
    taskItem.remove();
}

function setReminder(taskText, reminderTime) {
    const reminderDate = new Date(reminderTime).getTime();
    const now = new Date().getTime();
    const timeToReminder = reminderDate - now;

    if (timeToReminder > 0) {
        setTimeout(() => {
            alert(`Reminder: ${taskText}`);
        }, timeToReminder);
    }
}
