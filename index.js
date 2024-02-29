// add


class AddToDo {
    constructor() {
        this.toDo = JSON.parse(localStorage.getItem('toDo')) || [];
        this.form = document.getElementById('submit-form');
        this.userInput = document.getElementById('add-list');
    }

    addToDo(description) {
        const addToDoObj = { description, completed: false, num: this.toDo.length + 1 };
        this.toDo.push(addToDoObj);
        localStorage.setItem('toDo', JSON.stringify(this.toDo));
    }

    activ() {
        this.userInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.addToDo(this.userInput.value.trim());
                window.location.reload();
                this.form.reset();
            }
        });
    }
}

function activ() {
    const newToDo = new AddToDo();
    newToDo.activ();
}


// completed
const deleteCompleted = (toDo) => {
    toDo = toDo.filter((todo) => !todo.completed);
    for (let i = 0; i < toDo.length; i += 1) {
        toDo[i].num = i + 1;
    }
    localStorage.setItem('toDo', JSON.stringify(toDo));
};



// edit
function editTodo(toDo, i, newDescription) {
    toDo[i].description = newDescription;
    localStorage.setItem('toDo', JSON.stringify(toDo));
    return toDo;
}

// remove

function removeTodo(toDo, i) {
    toDo.splice(i, 1);
    for (let i = 0; i < toDo.length; i += 1) {
        toDo[i].num = i + 1;
    }
    return toDo;
}

// status

function Status(todo, toDo) {
    if (todo.completed === false) {
        todo.completed = true;
    } else {
        todo.completed = false;
    }
    localStorage.setItem('toDo', JSON.stringify(toDo));
}


// render

class ToDo {
    constructor() {
        this.toDo = JSON.parse(localStorage.getItem('toDo')) || [];
        this.listContainer = document.getElementById('list-container');
        this.clearAllCompleted = document.getElementById('clear');
    }

    renderToDo() {
        this.listContainer.innerHTML = '';
        for (let i = 0; i < this.toDo.length; i += 1) {
            const todo = this.toDo[i];
            const div = document.createElement('div');
            div.classList.add('wrapper');
            const hr = document.createElement('hr');
            const divCard = document.createElement('div');
            divCard.classList.add('card');
            const divInputLabel = document.createElement('div');
            divInputLabel.classList.add('input-label');
            const checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.classList.add('box');
            const label = document.createElement('input');
            label.value = `${todo.description}`;
            label.classList.add('list');
            const Icon = document.createElement('span');
            Icon.classList.add('material-symbols-sharp');
            Icon.textContent = 'more_vert';
            const deleteIcon = document.createElement('span');
            deleteIcon.classList.add('material-symbols-outlined');
            deleteIcon.textContent = 'delete';
            deleteIcon.style.display = 'none';

            divInputLabel.appendChild(checkBox);
            divInputLabel.appendChild(label);

            divCard.appendChild(divInputLabel);
            divCard.appendChild(Icon);
            divCard.appendChild(deleteIcon);

            div.appendChild(hr);
            div.appendChild(divCard);

            this.listContainer.appendChild(div);

            Icon.addEventListener('click', () => {
                Icon.style.display = 'none';
                deleteIcon.style.display = 'inline';
                deleteIcon.addEventListener('click', () => {
                    this.toDo = removeTodo(this.toDo, i);
                    localStorage.setItem('toDo', JSON.stringify(this.toDo));
                    window.location.reload();
                    this.renderToDo();
                });
            });

            label.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') {
                    const newDescription = label.value.trim();
                    if (newDescription !== '') {
                        this.toDo = editTodo(this.toDo, i, newDescription);
                        this.renderToDo();
                    } else {
                        label.value = todo.description;
                    }
                }
            });

            checkBox.addEventListener('change', () => {
                label.classList.toggle('checked');
                Status(todo, this.toDo);
            });
        }
    }

    init() {
        activ();
        this.clearAllCompleted.addEventListener('click', () => {
            deleteCompleted(this.toDo);
            window.location.reload();
        });
        this.renderToDo();
    }
}

// index


const newToDo = new ToDo();
newToDo.init();