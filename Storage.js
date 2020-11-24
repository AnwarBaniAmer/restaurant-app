/*
LTUC Hiring Task

author: Anwar Bani Amer
created date:24-11-2020

*/

//add new key=>value to the HTML5 local storage
// Constructor function for Order objects
function Order(item, quantity) {
  this.item = item;
  this.quantity = quantity;
}


function SubmitItem() {
		
	var item = document.forms.OrderList.name.value;
	var quantity = document.forms.OrderList.data.value;
	
	// Create an Order object
    var myOrder = new Order(item, quantity);

	if(myOrder.item != "" && myOrder.quantity != ""){
	localStorage.setItem(myOrder.item, myOrder.quantity);
	    document.getElementById("hint").innerHTML = ""; 
	ShowOrderList();
	}
	else{
	// Display message
    document.getElementById("hint").innerHTML = "Please Insert Item and Quantity."; 
	}
}
//ShowOrderList to populate the table with food order list items dynamically 
function ShowOrderList() {
	if (CheckBrowser()) {
	var myOrder = new Order("",0);
		var key = "";
		var list = " <thead><tr><th>Item</th><th>Quantity</th></tr>  </thead><tbody>";
		var totalQuantity = 0;
		var i = 0;
		
		
		for (i = 0; i <= localStorage.length-1; i++) {
			myOrder.item = localStorage.key(i);
			myOrder.quantity = localStorage.getItem(myOrder.item);
			list += "<tr><td>" + myOrder.item + "</td>\n<td>" + myOrder.quantity+ "</td></tr>\n";
			totalQuantity+=parseInt(myOrder.quantity);
		}
		
		list += "<tbody><tfoot><tr><td>" + "Total Quantity" + "</td>\n<td>"
					+ totalQuantity + "</td></tr></tfoot>";
		
		
		if (list == "<tr><th>Item</th><th>Quantity</th></tr>\n") {
			list += "<tr><td><i>empty</i></td>\n<td><i>empty</i></td></tr>\n";
		}
		//bind the order data to html table
		document.getElementById('list').innerHTML = list;
	} else {
		alert('Cannot save order list as your browser does not support HTML 5');
	}
}

//delete the last added item  key=>value from the HTML storage
function RemoveItem() {
	var name = document.forms.OrderList.name.value;
	document.forms.OrderList.data.value = localStorage.removeItem(name);
	document.forms.OrderList.name.value = localStorage.removeItem(name);
	ShowOrderList();
}

// Check the browser support
function CheckBrowser() {
	if ('localStorage' in window && window['localStorage'] !== null) {
		// we can use localStorage object to store data
		return true;
	} else {
			return false;
	}
}

//restart the local storage
function ClearAll() {
	var name = document.forms.OrderList.name.value;
	document.forms.OrderList.data.value = localStorage.removeItem(name);
	document.forms.OrderList.name.value = localStorage.removeItem(name);
	localStorage.clear();
	ShowOrderList();
}
