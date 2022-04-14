

const cartItemsEl = document.querySelector(".ItemInCart");
const subtotal = document.querySelector(".subtotal");
const currency = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/cad.json';
const fakeAPI = 'https://fakestoreapi.com/products';
const backUpAPI = 'https://deepblue.camosun.bc.ca/~c0180354/ics128/final/fakestoreapi.json';
const symbol = document.querySelector("#symbol");
const currencyA = document.getElementById("currency").value;
fetch(currency).then((rate)=> {
  return rate.json();
}).catch((e)=>{
  console.log(e);
});

fetch(backUpAPI).then((data)=>{
    return data.json();
}).then((completeData)=>{
    let data1="";
    // console.log(completeData[1].title)
    completeData.map((values)=>{
        data1+=  ` <div class="card">
        <img src=${values.image} alt="img" class="images">
        <h1 class="title"> ${values.title} </h1>
        <p>${values.description}</p>
        <p class="price" value=${values.price}>$${values.price.toFixed(2)}</p>
        <button class=" btn btn-primary mb1 bg-olive add-to-cart" onclick="addToCart(${values.id})" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
        Add To Cart
         </button>
        </div>  ` ;
    });
    
    document.getElementById('cards').innerHTML= data1;
}).catch((err)=>{
    console.log(err);
});
async function getCurrency(){
  const response = await fetch(currency);
  const currencies = await response.json();
  console.log(currencies);
  currencyRate(currencies);
}

async function getAPI(){
  const response = await fetch(backUpAPI);
  const data = await response.json();
  console.log(data);
  shoppingCart(data);
}

getCurrency();
getAPI();
// shopping cart
var currencyAll = [];

var products = [];
let cart = [];
function shoppingCart(data){
  for (let i = 0; i < data.length; i++){
    products.push(data[i]);
  }
}
var numItem =[];
for (let i = 0; i < 20; i++){
  numItem[i] = 1;
}

var counter = 0;
function addToCart(id){

  if (cart.some((item) => item.id === id)){
    counter++;
    numItem[id]++;
  }  else {
    const item = products.find((product) => product.id === id);
    counter++;
    cart.push(item);
  }
  updateCart();
}


function removeItemFromCart(id){
  cart = cart.filter( (item) => item.id !== id);
  counter--;
  updateCart();
}
function updateCart(){
  renderCartItems();
}

var obj = {};
function currencyRate(cur){
  let usd = cur.cad.usd;
  let eur =cur.cad.eur;
  let cad =cur.cad.cad;
  obj = {cad,usd,eur};
 }
function renderCartItems(){ 
  let totalPrice, totalItems = 0;
  let subtotalCart = 0;
  let x = document.getElementById("currency").value;
   //clear cart element
  subtotal.innerHTML ="";
  let displayItem = `<tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr>`;
  cartItemsEl.innerHTML = displayItem;
  let CountryCur= ["cad","usd","eur"];
  let selectedSymbol;
  let symbol=["$","$","£"];
  
  for (let i = 0; i < symbol.length; i++){
    if (CountryCur[i] === x){
      selectedSymbol = symbol[i];
    }
  }

  // change price in page
 
   if (counter === 0){
     $(".ItemInCart").html("<p id='empty'>Cart is empty</p>");
   } else {
  cart.forEach((item) => {
    if (x === "cad"){
      totalPrice = item.price * numItem[item.id];
      totalItems += numItem[item.id];
      subtotalCart += totalPrice;
     
      cartItemsEl.innerHTML+= `<div class ="cart-item"><td><button type="button" class=" remove btn-danger" onclick="removeItemFromCart(${item.id})">X</button></td><td>${item.title}`  +
       "<td>" +numItem[`${item.id}`] +"</td>"
       +`</td><td>`+selectedSymbol+`${item.price}</td> ` +"<td>" +selectedSymbol+totalPrice.toFixed(2) + "</td>" +` </tr></div>`;
       subtotal.innerHTML = `Subtotal:              `+selectedSymbol+`${subtotalCart.toFixed(2)}`;
    } else if(x === "usd"){
      let temp = item.price * obj.usd;
      totalPrice = temp * numItem[item.id];
      totalItems += numItem[item.id];
      subtotalCart += totalPrice;
      
      cartItemsEl.innerHTML+= `<div class ="cart-item"><td><button type="button" class=" remove btn-danger" onclick="removeItemFromCart(${item.id})">X</button></td><td>${item.title}`  +
       "<td>" +numItem[`${item.id}`] +"</td>"
       +`</td><td>`+selectedSymbol+`${temp.toFixed(2)}</td> ` +"<td>" +selectedSymbol+totalPrice.toFixed(2) + "</td>" +` </tr></div>`;
       subtotal.innerHTML = `Subtotal:              `+selectedSymbol+`${subtotalCart.toFixed(2)}`;
    } else if (x === "eur"){
      let temp = item.price * obj.eur;
      totalPrice = temp * numItem[item.id];
      totalItems += numItem[item.id];
      subtotalCart += totalPrice;
      
      cartItemsEl.innerHTML+= `<div class ="cart-item"><td><button type="button" class=" remove btn-danger" onclick="removeItemFromCart(${item.id})">X</button></td><td>${item.title}`  +
       "<td>" +numItem[`${item.id}`] +"</td>"
       +`</td><td>`+selectedSymbol+`${(temp).toFixed(2)}</td> ` +"<td>" +selectedSymbol+totalPrice.toFixed(2) + "</td>" +` </tr></div>`;
       subtotal.innerHTML = `Subtotal:              `+selectedSymbol+`${subtotalCart.toFixed(2)}`;
    }

    // document.getElementById("demo").innerHTML= item.price.toFixed(2);
  });
}
}
 
  // ********** CREDIT CARD VALIDATION *************//
  // change  value currency of the page
  $('#currency').change(function(){
    let CountryCur= ["cad","usd","eur"];
    let selectedSymbol;
    let symbol=["$","$","£"];

    
    changeCurr = $(this).val()
      for (let i = 0; i < symbol.length; i++){
        if (CountryCur[i] === changeCurr){
          selectedSymbol = symbol[i];
        }
    }
    $('.price').map(function(){
      let price = parseFloat($(this).attr('value'))
      if (changeCurr === "cad"){
        $(this).text(selectedSymbol + price.toFixed(2))
      }
      else if (changeCurr === "usd"){
        let change = price *  obj.usd
        $(this).text(selectedSymbol + change.toFixed(2))
      }
      else if (changeCurr === "eur"){
        let change = price *  obj.eur
        $(this).text(selectedSymbol + change.toFixed(2))
      }
    })
  })
  //validate card number
  $('#cardNumbers').change(function(){
    let originalNum = [];
    let reverseNum = [];
    let lastDigit = 0;
    let sum = 0;
    
    let temp = $(this).val().replace(/\s/g,'');
    cardNum = /^4[0-9]{15}?$/;
    if (temp.length == 16 && !isNaN(temp) && temp.match(cardNum)){
     alert("dung");
  } else alert("sai")
});  
// validate year
$('#year').change(function(){
  const currentYear  = new Date().getFullYear();
  let tempYear = $(this).val()
  let month = $("#month").val()
  const d = new Date();
  let currentMonth = d.getMonth()+1;
  if (tempYear < currentYear){
    alert("false")
  }else if (tempYear == currentYear){
    console.log(month)
    console.log(currentMonth + " Current")
    if (month === "MM" || parseInt(month) > currentMonth){
      alert("true")
    }else{
      alert("false")
    }
  }else if (tempYear > currentMonth){
    alert("true")
  }
});
// validate month
$('#month').change(function(){
  let tempYear = $("#year").val()
  const currentYear  = new Date().getFullYear();
  const d = new Date();
  let currentMonth = d.getMonth()+1;
  let month = $(this).val()
  if (tempYear === "YYYY"){
    alert("true")
  }else if (tempYear == currentYear){
    if (month < currentMonth){
      alert("false")
    }else{
      alert("true")
    }
  }else if (tempYear > currentYear){
    alert("true")
  }
})
$('#SecurityCode').change(function(){
  let code = $(this).val().length
  if (code === 3 || code === 4){
    alert("true");
  } else alert("false");
})
//billing buttion clicked
$('#billingForm').hide();
$('#continue').click(function(){
  
  $('#billingForm').show();
  // $('#payment').hide();
});

// **************** billing validate   ****************


  var emailREGEX =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	var phoneREGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
	var pcodeREGEX = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
  var isValidationSuccess = false;
  // var addressREGEX =\{1,5}\s\w.\s(\b\w*\b\s){1,2}\w*\.; WORK ON BILLINNG ADDress
  $('#firstName').change(function(){
    
    if($('#firstName').val() == undefined || $('#firstName').val() == ""){
      isValidationSuccess = false;
      console.log(" InValid name.")
    } else {
      isValidationSuccess = true;
      console.log(" Valid name.")
    }
  });

  $('#lastName').change(function(){
    
    if($('#lastName').val() == undefined || $('#lastName').val() == ""){
      isValidationSuccess = false;
      console.log(" InValid name.")
    } else {
      isValidationSuccess = true;
      console.log(" Valid name.")
    }
  });

  $('#BPostalCode').change(function(){
    if ($('#BPostalCode').val() == undefined || $('#BPostalCode').val() == "") {
      isValidationSuccess = false;
      console.log(" Enter code")
    }
    else if(!pcodeREGEX.test($('#BPostalCode').val())){
      isValidationSuccess = false;
      console.log(" Please Enter Valid code.")
    }
    else{
      isValidationSuccess =true;
      console.log(" Valid code.")
    }
  });

  $('#BPhone').change(function(){
    let tempPhone = $(this).val().replace(/\-/g,'');
  if (tempPhone == undefined || tempPhone == "") {
		isValidationSuccess = false;
	}
	else if(!phoneREGEX.test(tempPhone)){
		isValidationSuccess = false;
	}
	else{
		isValidationSuccess =true;
	}
});

  $('#BEmail').change(function(){
    if ($('#BEmail').val() == undefined || $('#BEmail').val() == "") {
      isValidationSuccess = false;
      console.log(" Enter Email.")
    }
    else if(!emailREGEX.test($('#BEmail').val())){
      isValidationSuccess = false;
      console.log(" Please Enter Valid Email.")
    }
    else{
      isValidationSuccess =true;
      console.log(" Valid Email.")
    }
  });








// *************** DISPLAY CHECK OUT ***********************
$('#shippingDetails').hide();
$('#confirmation').hide();
$('#shippingForm').hide();
$('#orderConfirmation').hide();
// payment -> billing
$('.paymentButton').click(function(){
  $('#payment').hide();
  $('#orderConfirmation').hide();
  $('#shippingForm').hide();
  $('#billingForm').show(500);
});
// billing -> shipping
$('.billingButton').click(function(){
  $('#billingForm').hide();
  $('#orderConfirmation').hide();
  $('#shippingDetails').hide();
  $('#confirmation').hide();
  $('#payment').hide();
  $('#orderConfirmation').hide();
  $('#shippingForm').show(500);
});
//shipping -> same detail details
$('#sameDetails').change(function(){
 if ($('#sameDetails').prop("checked") == false){
    $('#shippingDetails').hide();
    
 }else {
    $('#shippingDetails').show(500);
    $('#confirmation').hide();
  }
});
// go back 
$('.orderReview').click(function(){
  $('#shippingForm').hide();
  $('#payment').hide();
  $('#shippingDetails').hide();
  $('#confirmation').hide();
  $('#shippingForm').hide();
  $('#billingForm').hide();
  $('#orderConfirmation').show(500);
});
$('.paymentMethodButton').click(function(){
  $('#billingForm').hide();
  $('#shippingDetails').hide();
  $('#confirmation').hide();
  $('#shippingForm').hide();
  $('#orderConfirmation').hide();
  $('#payment').show(500);
});

// **********************************  END CHECK OUT *******************************


$('#firstName').change(function(){
    
  if($('#firstName').val() == undefined || $('#firstName').val() == ""){
    isValidationSuccess = false;
    console.log(" InValid name.")
  } else {
    isValidationSuccess = true;
    console.log(" Valid name.")
  }
});

$('#lastName').change(function(){
  
  if($('#lastName').val() == undefined || $('#lastName').val() == ""){
    isValidationSuccess = false;
    console.log(" InValid name.")
  } else {
    isValidationSuccess = true;
    console.log(" Valid name.")
  }
});

$('#BPostalCode').change(function(){
  if ($('#BPostalCode').val() == undefined || $('#BPostalCode').val() == "") {
    isValidationSuccess = false;
    console.log(" Enter code")
  }
  else if(!pcodeREGEX.test($('#BPostalCode').val())){
    isValidationSuccess = false;
    console.log(" Please Enter Valid code.")
  }
  else{
    isValidationSuccess =true;
    console.log(" Valid code.")
  }
});

