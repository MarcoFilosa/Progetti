(function chiamaMessaggio(){


	var interval = setInterval(function(){
		var ob = new Date();
		var oB_1 = ob.getSeconds();
		var oB_2 = ob.getMinutes();
		document.body.innerHTML = '';
		document.write("Ora: " oB_2 + "." + oB_1);
	}, 1000);

})();

