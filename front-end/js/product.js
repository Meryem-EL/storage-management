const urlString = window.location.search;
const urlParams = new URLSearchParams(urlString);
let prodId ='';
let prodName ='';
let transactions = [];

showExistingProduct();

function saveProduct(){
     prodId = document.querySelector('#productId').value;
     prodName = document.querySelector('#productName').value;
    //prepare the post Request
    fetch("http://localhost:9090/product", {
      method:'POST', 
      headers: {"Accept":"application/json, text/plain, */*","Content-type":"application/json"},
      body: JSON.stringify({id:prodId,name:prodName,transactionList:transactions})
    })
    //take the return result from the post Request
    .then(result => result.json())
    //set the input fields with the return product
    .then(data=> {
      document.getElementById('productId').value = data.id;
      document.getElementById('productName').value= data.name;
      
      transactions = data.transactionList;

      ShowTransactionList();
      //show the success messagge 
      showMessage(data.name);
    });
}

function showMessage(message){
    document.getElementById('SuccessMessage').innerHTML=`
    <p class="successMessage">Product ${message} have been saved successfully</p>
  `;
      //hide the success message after x seconds  
      setTimeout(function(){
        document.getElementById('SuccessMessage').innerHTML="";
      },3000);
  }

  function showExistingProduct(){
   if(urlParams.get('id') !=null){
    fetch('http://localhost:9090/product?id='+urlParams.get('id'))
    .then(result => result.json())
    .then(data=> {
      document.getElementById('productId').value = data.id;
      document.getElementById('productName').value= data.name;
      transactions = data.transactionList;
      
      ShowTransactionList();
   })
  }
}

function saveTransaction(){

  const prodId = document.querySelector('#productId').value;
  const qty = document.querySelector('#transactionQty').value;

  if(prodId != '' && qty != ''){
    transactions.push({amount:parseInt(qty)});
    closeModal();
    document.querySelector('#transactionQty').value='';
    saveProduct();
  }else{
    alert('unable to add transaction check amount !');
  }
}

let modalBtn = document.querySelector('.modal-btn');
let modalBg = document.querySelector('.modal-bg');

modalBtn.addEventListener('click',function(){
modalBg.classList.add('bg-active');
});

function closeModal(){
  modalBg.classList.remove('bg-active');
}

let modalClose = document.querySelector('.modal-close');
modalClose.addEventListener('click',function(){
  closeModal();
});

function setTableLayout(){
  document.getElementById('TableHolder').innerHTML=`
  <table class="content-table">
  <thead>
  <tr>
  <th>date</th>
  <th>amount</th>
  </tr>
  <tbody id="transactionList">

  </tbody>
  
  </thead>
  
  `;
}
function ShowTransactionList(){
  setTableLayout();
  let transactionTable = '';
  transactions.reverse();
  transactions.forEach(element =>{
     transactionTable+=`
     <tr>
     <td>${element.transactionDateTime}</td>
     <td>${element.amount}</td>

     `;
     document.querySelector('#transactionList').innerHTML = transactionTable;
  });
}