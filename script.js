
function addItem() {
    var itemInput = document.getElementById("itemInput");
    var itemName = itemInput.value.trim();
    if (itemName !== "") {
        var item = { name: itemName, checked: false };
        var itemList = getItemList();
        itemList.push(item);
        saveItemList(itemList);
        displayItems();
        itemInput.value = ""; 
    }
}


function displayItems() {
    var itemList = getItemList();
    var listContainer = document.getElementById("itemList");
    listContainer.innerHTML = "";
    itemList.forEach(function(item, index) {
        var listItem = document.createElement("li");
        listItem.className = "list-group-item";
        listItem.innerHTML = `
            <div>
            <input type="checkbox" onchange="toggleItem(${index})" ${item.checked ? "checked" : ""}>
            <span>${item.name}</span>
            </div>
            
            <button class="btn btn-danger btn-sm float-right" onclick="deleteItem(${index})">Smazat</button>
        `;
        listContainer.appendChild(listItem);
    });
}


function toggleItem(index) {
    var itemList = getItemList();
    itemList[index].checked = !itemList[index].checked;
    saveItemList(itemList);
    displayItems();
}


function deleteItem(index) {
    var itemList = getItemList();
    itemList.splice(index, 1);
    saveItemList(itemList);
    displayItems();
}


function getItemList() {
    var storedItems = localStorage.getItem("items");
    return storedItems ? JSON.parse(storedItems) : [];
}


function saveItemList(itemList) {
    localStorage.setItem("items", JSON.stringify(itemList));
}


displayItems();
