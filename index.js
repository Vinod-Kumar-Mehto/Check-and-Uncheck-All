const addItems = document.querySelector(".add_item");
const itemList = document.querySelector(".plates");
const items =[];

function addItem(e){
    e.preventDefault();
    const text = this.querySelector("[type=text]").value;
    const item ={
        text,
        done: false
    };

    items.push(item);
    populateList(items, itemList);
    localStorage.setItem("items", JSON.stringify(items));
    this.reset();
    this.querySelector("[type=text]").focus();
    console.log(items);
};

function populateList(plates = [], platesList){

    platesList.innerHTML = plates.map((plate, index) =>{
        return `
            <li> 
            <input type="checkbox" data-index = ${index} id ="item${index}" ${plate.done ? "checked" : " "}/>
            <label for="item${index}">${plate.text}</label>
            </li>
            <hr>
            <p></P>
        `;
    }).join("");

};

function toggleDone(e){
    if(!e.target.matches("input")) return;
    const el = e.target
    const index = el.dataset.index
    items[index].done = !items[index].done;
   
};



function checkAll(){
    const check = itemList.querySelectorAll("input");
    check.forEach((current, index) => {
        current.checked =true;
        items[index].done = true;
       
    
    
    
    })
};

function uncheckAll(){
    const check = itemList.querySelectorAll("input");
    console.log(check)
    check.forEach((current, index) => {
        current.checked = false;
        items[index].done = false;
        
    
    })
};
function clearAll(){
    localStorage.removeItem("items");
    itemList.innerHTML =" ";

}


addItems.addEventListener("submit", addItem)
itemList.addEventListener("click", toggleDone);
document.querySelector(".checkall").addEventListener("click", checkAll)
document.querySelector(".uncheckall").addEventListener("click", uncheckAll)
document.querySelector(".clearall").addEventListener("click", clearAll)



populateList(items, itemList)