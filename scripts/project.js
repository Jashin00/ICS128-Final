
const conFirmCart = document.querySelector('#orderDetails');
const cartItemsEl = document.querySelector(".ItemInCart");
const subtotal = document.querySelector(".subtotal");
const subtotalC = document.querySelector(".subtotalC");
const shipping = document.querySelector("#shipping");
const tax = document.querySelector("#tax");
const orderTotal = document.querySelector("#orderTotal");
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
  
  currencyRate(currencies);
}

async function getAPI(){
  const response = await fetch(backUpAPI);
  const data = await response.json();
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

// **** Tax for Canada **** /// 

var obj = {};
function currencyRate(cur){
  let usd = cur.cad.usd;
  let eur =cur.cad.eur;
  let cad =cur.cad.cad;
  obj = {cad,usd,eur};
 }
 var test = [];
function renderCartItems(){ 
  let totalPrice, totalItems = 0;
  let subtotalCart = 0;
  let x = document.getElementById("currency").value;
   //clear cart elementd
  subtotal.innerHTML ="";
  subtotalC.innerHTML="";
  shipping.innerHTML="";
  tax.innerHTML="";
  orderTotal.innerHTML="";
  let displayItem = `<tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr>`;
  conFirmCart.innerHTML = displayItem;
  
  cartItemsEl.innerHTML = displayItem;
  let CountryCur= ["cad","usd","eur"];
  let selectedSymbol;
  let symbol=["$","$","£"];
  let shippingFee = 12;
  let taxFee = 0.08;

  for (let i = 0; i < symbol.length; i++){
    if (CountryCur[i] === x){
      selectedSymbol = symbol[i];
    }
  }
  
 
   if (counter === 0){
    $(".ItemInCart").html("<h5 id='empty'>Your Cart is empty</h5>");
    $("#checkOut").addClass('prevent-click');  
    cartItemsEl.innerHTML="";
    conFirmCart.innerHTML ="";
   } else {
    $("#checkOut").removeClass('prevent-click');
    $('#emptyCart').hide();
  cart.forEach((item) => {
    
    if (x === "cad"){
      totalPrice = item.price * numItem[item.id];
      totalItems += numItem[item.id];
      subtotalCart += totalPrice;
      test.push(item);
      cartItemsEl.innerHTML+=  `<div class ="cart-item"><button type="button" class=" remove btn-danger" onclick="removeItemFromCart(${item.id})">X</button><td>${item.title}`  +
       "</td><td>" +numItem[`${item.id}`] +"</td>"
       +`<td>`+selectedSymbol+`${item.price.toFixed(2)}</td> ` +"<td>" +selectedSymbol+totalPrice.toFixed(2) + "</td>" +` </div>`;
       subtotal.innerHTML = `<div>Subtotal: `+selectedSymbol+`${subtotalCart.toFixed(2)}</div>`;

       conFirmCart.innerHTML += `<div class ="cart-item"><td>${item.title}`  +
       "</td><td>" +numItem[`${item.id}`] +"</td>"
       +`</td><td>`+selectedSymbol+`${item.price}</td> ` +"<td>" +selectedSymbol+totalPrice.toFixed(2) + "</td>" +` </tr></div>`;
       subtotalC.innerHTML = `<div class="total"><b>Subtotal:</b> ${selectedSymbol}${subtotalCart.toFixed(2)}</div>`;
       shipping.innerHTML =`<div class="total><b>Shipping: </b> ${selectedSymbol+shippingFee.toFixed(2)}</div>`;
       let calTax = (subtotalCart * taxFee);
       tax.innerHTML= `<td><b>Tax:</b> ${ selectedSymbol+ calTax.toFixed(2)}</td>`;
       let total = (subtotalCart  + calTax + shippingFee);
        orderTotal.innerHTML= `<div id="lastTotal" value=${total.toFixed(2)}><b>Order Total:  </b>${selectedSymbol+ total.toFixed(2)}</div>`;
    } else if(x === "usd"){
      let temp = item.price * obj.usd;
      totalPrice = temp * numItem[item.id];
      totalItems += numItem[item.id];
      subtotalCart += totalPrice;
      
      cartItemsEl.innerHTML+= `<div class ="cart-item"><td><button type="button" class=" remove btn-danger" onclick="removeItemFromCart(${item.id})">X</button></td><td>${item.title}`  +
       "<td>" +numItem[`${item.id}`] +"</td>"
       +`</td><td>`+selectedSymbol+`${temp.toFixed(2)}</td> ` +"<td>" +selectedSymbol+totalPrice.toFixed(2) + "</td>" +` </div>`;
       subtotal.innerHTML = `Subtotal:              `+selectedSymbol+`${subtotalCart.toFixed(2)}`;

       conFirmCart.innerHTML += `<div class ="cart-item"></td><td>${item.title}`  +
       "<td>" +numItem[`${item.id}`] +"</td>"
       +`</td><td>`+selectedSymbol+`${temp.toFixed(2)}</td> ` +"<td>" +selectedSymbol+totalPrice.toFixed(2) + "</td>" +` </tr></div>`;
       subtotalC.innerHTML = `<div class="total"><p><b>Subtotal:</b> ${selectedSymbol}${subtotalCart.toFixed(2)}</p></div>`;
       shipping.innerHTML =`<div class="total" value=${total}><b>Shipping: </b> ${selectedSymbol+shippingFee.toFixed(2)}</div>`;
       let calTax = (subtotalCart * taxFee);
       tax.innerHTML= `<div class="total"<b>Tax:</b> ${selectedSymbol+ calTax.toFixed(2)}</div>`;
       let total = (subtotalCart  + calTax + shippingFee).toFixed(2);
       orderTotal.innerHTML= `<div id="lastTotal" value="${total}"><b>Order Total:  </b>${selectedSymbol + total}</div>`;
    } else if (x === "eur"){
      let temp = item.price * obj.eur;
      totalPrice = temp * numItem[item.id];
      totalItems += numItem[item.id];
      subtotalCart += totalPrice;
      
      cartItemsEl.innerHTML+= `<div class ="cart-item"><td><button type="button" class=" remove btn-danger" onclick="removeItemFromCart(${item.id})">X</button></td><td>${item.title}`  +
       "<td>" +numItem[`${item.id}`] +"</td>"
       +`</td><td>`+selectedSymbol+`${(temp).toFixed(2)}</td> ` +"<td>" +selectedSymbol+totalPrice.toFixed(2) + "</td>" +` </tr></div>`;
       subtotal.innerHTML = `Subtotal:              `+selectedSymbol+`${subtotalCart.toFixed(2)}`;

       conFirmCart.innerHTML += `<div class ="cart-item"></td><td>${item.title}`  +
       "<td>" +numItem[`${item.id}`] +"</td>"
       +`</td><td>`+selectedSymbol+`${temp.toFixed(2)}</td> ` +"<td>" +selectedSymbol+totalPrice.toFixed(2) + "</td>" +` </tr></div>`;
       subtotalC.innerHTML = `<div class="total"><p><b>Subtotal:</b> ${selectedSymbol}${subtotalCart.toFixed(2)}</p></div>`;
       shipping.innerHTML =`<div ="total"<b>Shipping: </b> ${selectedSymbol+shippingFee.toFixed(2)}</div>`;
       let calTax = (subtotalCart * taxFee);
       tax.innerHTML= `<div class="total"><b>Tax:</b> ${selectedSymbol+ calTax.toFixed(2)}</div>`;
       let total = (subtotalCart  + calTax + shippingFee).toFixed(2);
       orderTotal.innerHTML= `<div id="lastTotal" value="${total}"><b>Order Total:  </b>${selectedSymbol + total}</div>`;
    }
    
  });
}
}




if (counter === 0){
  $("#checkOut").addClass('prevent-click');
   $('#emptyCart').show();
}

//display states or province
$('#states').hide();
$('#BCountry').change(function(){
  if ($(this).val() == "US"){
   
    $('#canada').hide();
    $('#states').show();
  } else {
    $('#states').hide();
    $('#canada').show();
  }
});
$('#statesS').hide();
$('#S-Country').change(function(){
  if ($(this).val() == "US"){
   
    $('#canadaS').hide();
    $('#statesS').show();
  } else {
    $('#statesS').hide();
    $('#canadaS').show();
  }
});
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
  
  // ********** CREDIT CARD VALIDATION *************//
  // change  value currency of the page

  
 // ************** create submit object to hold user data *****************//
  var submitObj = {};
  var isValidated = false;
  $('span').hide();
  //validate card number
  $('#cardNumbers').change(function(){
    let temp = $(this).val().replace(/\s/g,'');
    cardNum = /^4[0-9]{15}$/;
    if (temp.length == 16 && !isNaN(temp) && temp.match(cardNum)){
      $('#cardNumErr').hide();
      isValidated = true;
  } else {
    $('#cardNumErr').show();
  }
});  

// validate year
$('#year').change(function(){
  const currentYear  = new Date().getFullYear();
  let tempYear = $(this).val()
  let month = $("#month").val()
  const d = new Date();
  let currentMonth = d.getMonth()+1;
  if (tempYear < currentYear){
    $('#dateErr').show();
  }else if (tempYear == currentYear){
    $('#dateErr').hide();
    if (month === "MM" || parseInt(month) > currentMonth){
      $('#dateErr').hide();
    }else{
      $('#dateErr').show();
      
    }
  }else if (tempYear > currentMonth){
    $('#dateErr').hide();
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
    $('#dateErr').hide();
  }else if (tempYear == currentYear){
    if (month < currentMonth){
      $('#dateErr').show();
    }else{
      $('#dateErr').hide();
    } 
  }else if (tempYear > currentYear){
    $('#dateErr').hide();
  }
})

$('#SecurityCode').change(function(){
  let code = $(this).val().length;
  if ((code === 3 || code === 4) && !isNaN($(this).val())){
    $('#codeErr').hide(); 
   } else 
   $('#codeErr').show();
})

//billing buttion clicked
$('#billingForm').hide();
$('#continue').click(function(){
  $('#billingForm').show();
  // $('#payment').hide();
});

// $('.paymentButton').click(function(){
//   if (isValidated == false ){
//     $(".paymentButton").addClass('prevent-click');
//     $("#paymentErr").show();

//   } else {
//     $(".paymentButton").removeClass('prevent-click');
//     $("#paymentErr").hide();
//   }
 
// })

// **************** billing validation   ****************

//REGEX

  var nameREGEX = /^[a-zA-Z]+$/;
  var  securityCodeREGEX = /(^\d{4}$)/;
  var emailREGEX =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	var phoneREGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
	var pcodeREGEX = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
  var pcodeUSREGEX =  /(^\d{5}$)/;
  var addressREGEX = /^\s*\S+(?:\s+\S+){2}/;
  var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
  var  cityREGEX =  /^[a-zA-Z]+$/;
  var isValidationSuccess = false;
  // var addressREGEX =\{1,5}\s\w.\s(\b\w*\b\s){1,2}\w*\.; WORK ON BILLINNG ADDress
  $('#firstName').change(function(){
    if ($(this).val() == undefined || $(this).val() == "") {
      $('#FnameErr').show();
    }
    else if(!nameREGEX.test($(this).val())){
      $('#FnameErr').show();
    }
    else{
      $('#FnameErr').hide();
    }
  });

  $('#lastName').change(function(){
    if ($(this).val() == undefined || $(this).val() == "") {
      $('#LnameErr').show();
    }
    else if(!nameREGEX.test($(this).val())){
      $('#LnameErr').show();
    }
    else{
      $('#LnameErr').hide();
    }
  });
  
  $('#BAddress').change(function(){
      
    if ($('#BAddress').val() == undefined || $('#BAddress').val() == "") {
      $('#address').show();
    }
    else if(!addressREGEX.test($('#BAddress').val())){
      
      $('#address').show();
    }
    else{
      
      $('#address').hide();
    }
  });

  $('#BAddress2').change(function(){
      
    if ($('#BAddress2').val() == undefined || $('#BAddress2').val() == "") {
      $('#address2').show();
    }
    else if(!addressREGEX.test($('#BAddress2').val())){
      
      $('#address2').show();
    }
    else{
      $('#address2').hide();
    }
  });

  $('#BCity').change(function(){
    if ($(this).val() == undefined || $(this).val() == "") {
      $('#city').show();
    }
    else if(!cityREGEX.test($(this).val())){
      $('#city').show();
    }
    else{
      $('#city').hide();
    }
  });

  $('#BProvince').change(function(){

    if ($(this).val() == ""){
      $('#province').show();
    } else {
      $('#province').hide();
    }
  });

  // $('#BCountry').change(function(){
  //   if ($(this).val() == ""){
  //     isValidationSuccess = false;
  //   } else {
  //     isValidationSuccess = true;
  //   }
  // });

  $('#BPostalCode').change(function(){
    if ($(this).val() == undefined || $(this).val() == "") {
      $('#postal').show();
    }else if(!pcodeREGEX.test($(this).val()) && !isValidZip.test($(this).val()) ){
      $('#postal').show();
    }else{
      $('#postal').hide();
    }
  });

  $('#BPhone').change(function(){
    let tempPhone = $(this).val().replace(/\-/g,'');
  if (tempPhone == undefined || tempPhone == "") {
		$('#phone').show();
	}
	else if(!phoneREGEX.test(tempPhone)){
		$('#phone').show();
	}
	else{
		$('#phone').hide();
	}
  });

  $('#BEmail').change(function(){
    if ($('#BEmail').val() == undefined || $('#BEmail').val() == "") {
      $('#email').show();
    }
    else if(!emailREGEX.test($('#BEmail').val())){
      $('#email').show();
    }
    else{
      $('#email').hide();
    }
  });
  
  $('#S-firstName').change(function(){
    if ($(this).val() == undefined || $(this).val() == "") {
      $('#FnameErrS').show();
    }else if(!nameREGEX.test($(this).val())){
      $('#FnameErrS').show();
    }
    else{
      $('#FnameErrS').hide();
    }
  });

  $('#S-lastName').change(function(){
    
    if ($(this).val() == undefined || $(this).val() == "") {
      $('#LnameErrS').show();
    }
    else if(!nameREGEX.test($(this).val())){
      $('#LnameErrS').show();
    }
    else{
      $('#LnameErrS').hide();
    }
  });
  
  $('#S-Address').change(function(){
      
    if ($(this).val() == undefined || $(this).val() == "") {
      $('#addressS').show();
    }
    else if(!addressREGEX.test($(this).val())){
      $('#addressS').show();
    }
    else{
      $('#addressS').hide();
    }
  });

  $('#S-Address2').change(function(){
      
    if ($(this).val() == undefined || $(this).val() == "") {
      $('#address2S').show();
    }
    else if(!addressREGEX.test($(this).val())){
      $('#address2S').show();
    }
    else{
      $('#address2S').hide();
    }
  });

  $('#S-City').change(function(){
    if ($(this).val() == undefined || $('#BCity').val() == "") {
      $('#cityS').show();
    }
    else if(!cityREGEX.test($(this).val())){
      $('#cityS').show();
    }
    else{
      $('#cityS').hide();
    }
  });

  $('#S-Province').change(function(){
    if ($(this).val() == ""){
      $('#provinceS').show();
    } else {
      $('#provinceS').hide();
    }
  });

  // $('#S-Country').change(function(){
  //   if ($(this).val() == ""){
  //    $('#provinceS').show();
  //   } else {
  //     $('#provinceS').hide();
  //   }
  // });

  $('#S-PostalCode').change(function(){
    if ($(this).val() == undefined || $(this).val() == "") {
      $('#postalS').show();
    }
    else if(!pcodeREGEX.test($(this).val()) && !isValidZip.test($(this).val()) ){
      $('#postalS').show();
    }
    else{
      $('#postalS').hide();
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
 if ($('#sameDetails').prop("checked") == true){
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

// ********************* ORDER CONFIRMATION **************************//

// **********************************  END CHECK OUT *******************************//
$('.confirmButton').click(function(){
  let orderTotal = parseFloat($('#lastTotal').attr('value'));
  let cardNum = $('#cardNumbers').val().replace(/\s/g,'');
  if ($('#sameDetails').prop("checked") == true){
    submitObj = {
    
      "card_number": cardNum,
      "expiry_month": $('#month').val(),
      "expiry_year": $('#year').val(),
      "security_code": $('#SecurityCode').val(),
      "amount": orderTotal,
      "currency": $('#currency').val(),
      "billing": {
          "first_name": $('#firstName').val(),
          "last_name": $('#lastName').val(),
          "address_1": $('#BAddress').val(),
          "address_2": $('#BAddress2').val(),
          "city": $('#BCity').val(),
          "province": $('#BProvince').val(),
          "country": $('#BCountry').val(),
          "postal": $('#BPostalCode').val(),
          "phone":$('#BPhone').val(),
          "email": $('#BEmail').val()
      },
      "shipping": {
          "first_name": $('#firstName').val(),
          "last_name": $('#lastName').val(),
          "address_1": $('#BAddress').val(),
          "address_2": $('#BAddress2').val(),
          "city": $('#BCity').val(),
          "province": $('#BProvince').val(),
          "country": $('#BCountry').val(),
          "postal": $('#BPostalCode').val()  
      }
  }
 } else {
  submitObj = {
    
      "card_number": $('#cardNumbers').val(),
      "expiry_month": $('#month').val(),
      "expiry_year": $('#year').val(),
      "security_code": $('#SecurityCode').val(),
      "amount": orderTotal,
      "currency": $('#currency').val(),
      "billing": {
          "first_name": $('#firstName').val(),
          "last_name": $('#lastName').val(),
          "address_1": $('#BAddress').val(),
          "address_2": $('#BAddress2').val(),
          "city": $('#BCity').val(),
          "province": $('#BProvince').val(),
          "country": $('#BCountry').val(),
          "postal": $('#BPostalCode').val(),
          "phone":$('#BPhone').val(),
          "email": $('#BEmail').val()
      },
      "shipping": {
          "first_name": $('#S-firstName').val(),
          "last_name": $('#S-lastName').val(),
          "address_1":$('#S-Address').val(),
          "address_2": $('#S-Address2').val(),
          "city": $('#S-City').val(),
          "province": $('#S-Province').val(),
          "country": $('#S-Country').val(),
          "postal": $('#S-PostalCode').val()  
      }
  }
  const URL = 'https://deepblue.camosun.ca/~c0180354/ics128/final-project/';
  const formData = new FormData();
  formData.append('submission', JSON.stringify(submitObj));
  const response =  fetch(URL,{
    method: "POST",
    headers: {
      'Conten-Type': 'application/json'
    },
    cache: "no-cache",
    body: formData,
  }).then(response => response.json())
  .then(submitObj => {
    console.log('Success:', submitObj);
  }).catch((error) =>{
    console.error('Error:', error);
  });
}

    console.log(JSON.stringify(submitObj));
  });