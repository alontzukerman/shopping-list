
document.onload = ShowList();

document.getElementById("addItem").addEventListener('click', AddingItem);
document.getElementById("deleteItem").addEventListener('click', deleteItem);
document.getElementById("editItem").addEventListener('click', updateItem);

async function AddingItem()
{   
    let check = await axios.get(`http://localhost:3000/products/${itemID.value}`);
    if (check.data === "product is not exist")
    {  
        if (itemID.value && itemName.value && itemCompany.value && itemSize.value && itemSize.value < 9999 && itemSize.value > 0)
        {  
            let newElem = document.createElement("li");                   
            let request = await axios.post(`http://localhost:3000/products`, {id: itemID.value, name: itemName.value, company: itemCompany.value, size: itemSize.value});
            newElem.innerHTML = JSON.stringify(request.data);                                
            ShowList();
        }
    }
    else
    {
        window.alert("This ID already exists");
    }
}

async function ShowList()
{
    let request = await axios.get(`http://localhost:3000/products`);
    console.log(request);
    console.log(request.data);
    theList.innerText = "";
    editSelect.innerHTML = null;
    request.data.forEach(e => {
        let li = document.createElement("li");
        li.innerText = ` ${e.name}`;
        li.alt = ` ID: ${e.id} , Name: ${e.name} , Company: ${e.company} , Size: ${e.size}`;
        li.addEventListener("click" , getPeoperties);
        theList.appendChild(li);
        let op = document.createElement("option");
        op.innerText = e.id;    
        editSelect.appendChild(op);
    });
}

async function deleteItem(e)
{
    let bool = window.confirm(`Item: ${editSelect.value} will be permanently deleted!
    Are you sure?`)
    if (bool)
    {
        window.alert(JSON.stringify((await axios.delete(`http://localhost:3000/products/${editSelect.value}`)).data));
    }
    ShowList();
}

async function updateItem(e)
{
    if (editName.value && editCompany.value && editSize.value && editSize.value < 9999 && editSize.value > 0)
    {
        let bool = window.confirm(`Item: ${editSelect.value} will be Edited to => Name: ${editName.value} , Company: ${editCompany.value} , Size: ${editSize.value}
        Are you sure?`)
        if (bool)
        {
            await axios.put(`http://localhost:3000/products/${editSelect.value}` , {id: editSelect.value, name: editName.value, company: editCompany.value, size: editSize.value});
            window.alert(`Product updated`);
        }
    ShowList();
    }
}

async function getPeoperties(e) 
{
    [e.currentTarget.alt , e.currentTarget.innerText] = [e.currentTarget.innerText , e.currentTarget.alt]
}
