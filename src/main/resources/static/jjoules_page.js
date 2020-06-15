window.registerExtension('jjoules/jjoules_page',function(options){
	projectName = options.component.key.substring(options.component.key.indexOf(':')+1);

	options.el.textContent = "";
	console.log("j'entre bien!!");

});