
let form = document.forms[`form`];
form.onsubmit = (e) => {
    e.preventDefault();
}

const pairList = [];
let buttonAdd = document.getElementById(`add`);
let list = document.getElementById(`list`);
let ul = list.getElementsByTagName('ul')[0];

buttonAdd.addEventListener("click", () => {
    let nameValue = form.elements[`nameValue`].value.trim();
    const regex = /^[a-zA-Z0-9]+\s*=\s*[a-zA-Z0-9]+$/;
    if (regex.test(nameValue)) {
        const [name, value] = nameValue.split(`=`);
        let pairItem = {name: name, value: value};
        pairList.push(pairItem);

        let li = document.createElement("li")
        li.innerText = `${name} = ${value}`
        ul.appendChild(li);
        form.elements[`nameValue`].value = ''
    } else {
        alert(`Error! Input data in format Name=Value`)
    }
});

function sortList(key) {
    pairList.sort((pair1, pair2) => {
        if (pair1[key] > pair2[key]) return 1
        if (pair1[key] < pair2[key]) return -1
        return 0
    });
    ul.innerText = '';
    pairList.forEach((pair) => {
        let li = document.createElement("li")
        li.innerText = `${pair.name} = ${pair.value}`
        ul.appendChild(li);
    });
}

let buttonSortByName = document.getElementById(`sortByName`);
buttonSortByName.addEventListener("click", () => {
    sortList(`name`);
});

let buttonSortByValue = document.getElementById(`sortByValue`);
buttonSortByValue.addEventListener("click", () => {
    sortList(`value`);
});


let deleteAction = false;

let buttonDelete = document.getElementById(`delete`);


buttonDelete.addEventListener("click", () => {
    if (!deleteAction) {
        deleteAction = true;
        for (const li of ul.children) {
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            li.prepend(checkbox);
        }
    } else {
        deleteAction = false;
        const toDelete = [];
        for (const li of ul.children) {
            let checkbox = li.querySelector("input[type='checkbox']");
            if (checkbox && checkbox.checked) {
                const [name, value] = li.innerText.replace(/\s/g, '').split('=');
                const index = pairList.findIndex(pair => pair.name === name && pair.value === value);
                if (index !== -1) {
                    pairList.splice(index, 1);
                }
                toDelete.push(li);
            } else if (checkbox) {
                checkbox.remove();
            }
        }
        toDelete.forEach(li => li.remove());
    }
});

