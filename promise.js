// Promise Demo

var promise = new Promise(function(resolve, reject) {
	// ...
	return function(error, data) {
		if (data) {
			resolve(data)
		}
		else {
			reject(error)
		}
	}
})

promise()(error, data).then(
	// resolve
	(data)=> {
		// ...
	}, 
	// reject
	(error)=> {

	}
)