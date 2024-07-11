document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task-input");
    const addButton = document.getElementById("add-button");
    const tabs = document.querySelectorAll(".task-tabs div");
    const taskBoard = document.getElementById("task-board");
    const underline = document.getElementById("under-line");
    let mode = 'all';
    let taskList = [];
    let filterList = [];

    function randomIDGenerate() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    function updateUnderline(index) {
        const tabWidth = tabs[index].offsetWidth;
        underline.style.width = `${tabWidth}px`;
        underline.style.left = `${index * tabWidth}px`;
    }

    function addTask() {
        const task = {
            id: randomIDGenerate(),
            taskContent: taskInput.value,
            isComplete: false,
        };
        taskList.push(task);
        taskInput.value = '';
        render();
    }

    function render() {
        let list = [];
        if (mode === "all") {
            list = taskList;
        } else if (mode === "ongoing" || mode === "done") {
            list = filterList;
        }
        let resultHTML = "";
        for (let i = 0; i < list.length; i++) {
            if (list[i].isComplete) {
                resultHTML += `<div class="task">
                    <div class="task-done">${list[i].taskContent}</div>
                    <div>
                        <button class="btn btn-success" onclick="toggleComplete('${list[i].id}')">Check</button>
                        <button class="btn btn-danger" onclick="deleteTask('${list[i].id}')">Delete</button>
                    </div>
                </div>`;
            } else {
                resultHTML += `<div class="task">
                    <div>${list[i].taskContent}</div>
                    <div>
                        <button class="btn btn-success" onclick="toggleComplete('${list[i].id}')">Check</button>
                        <button class="btn btn-danger" onclick="deleteTask('${list[i].id}')">Delete</button>
                    </div>
                </div>`;
            }
        }
        taskBoard.innerHTML = resultHTML;
    }

    function toggleComplete(id) {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].id == id) {
                taskList[i].isComplete = !taskList[i].isComplete;
                break;
            }
        }
        render();
    }

    function deleteTask(id) {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].id == id) {
                taskList.splice(i, 1);
                break;
            }
        }
        render();
    }

    function filter(event) {
        mode = event.target.id;
        filterList = [];
        if (mode === "all") {
            render();
        } else if (mode === "ongoing") {
            for (let i = 0; i < taskList.length; i++) {
                if (!taskList[i].isComplete) {
                    filterList.push(taskList[i]);
                }
            }
            render();
        } else if (mode === "done") {
            for (let i = 0; i < taskList.length; i++) {
                if (taskList[i].isComplete) {
                    filterList.push(taskList[i]);
                }
            }
            render();
        }
    }

    addButton.addEventListener("click", addTask);
    tabs.forEach((tab, index) => {
        tab.addEventListener("click", (event) => {
            filter(event);
            updateUnderline(index);
        });
    });

    updateUnderline(0);
    window.addEventListener('resize', () => updateUnderline(tabs.findIndex(tab => tab.id === mode))); // 창 크기 조정 시 너비 업데이트
});
