	} else if (obj && obj.node && ("logicVar" == obj.node)) {
		return `${walk (obj.children[0], depth+1, fn)}`;
	} else if (obj && obj.node && ("Keyword" == obj.node)) {
     	     return `${walk (obj.children[0].children[0], depth+1, fn)}`;
	} else if (obj && obj.node && ("Primary" == obj.node)) {
		return `${walk (obj.children[0], depth+1, fn)}`;
