showProduct();

function showProduct(){

    fetch("http://localhost:9090/productList")
    .then(response => response.json())
    .then(data =>{
        let tableInfo = "";
        data.forEach(element => tableInfo+=`
        
        <tr>
            <td>${element.id}</td>
            <td>${element.name}</td>
            <td>${element.storageAmount}</td>
            <td><button onclick='navigate(${element.id})'>view</button></td>
        <tr>
        `)
    document.querySelector('#listTable').innerHTML = tableInfo;
    });
}

function navigate(productId){
    window.location.href='/product.html?id='+ productId;
}