Errors = new Mongo.Collection(null);
throwError = function(message) {
	var errorId = Errors.insert({message: message});
};