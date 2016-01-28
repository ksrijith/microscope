Template.errors.helpers({
	errors: function() {
		return Errors.find();
	}
});

Template.error.helpers({
	message: function() {
		var message = this.message;
		return message;
	}
});