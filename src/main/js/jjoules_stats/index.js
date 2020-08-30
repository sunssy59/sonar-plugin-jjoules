import "../style.css";

import {displayPageStats} from "./utils/requestApi";

window.registerExtension("jjoules/jjoules_stats",options =>{

	let key = options.component.key;
	displayPageStats(key,options.el);
	
    return function() {
		options.el.textContente = "";
	};
});