window.registerExtension('jjoules/jjoules_page',funxtion(options){
	projectName = options.component.key.substring(options.component.key.indexOf(':')+1);

	options.el.textContent = "";
	Console.log("j'entre bien!!");

})