Template.postEdit.events({
	'submit form': function(e) {
		e.preventDefault();
		var currentPostId = this._id;
		var postProperties = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val()
		}
		Meteor.call('postUpdate', currentPostId, postProperties, function(error, result) {
			if (error)
				return throwError(error.reason);
			if (result.urlChanged)
				throwError('The URL Cannot be changed!!!');
			else {
				Router.go('postPage', {_id: currentPostId});
			}
		});
	},
	'click .delete': function(e) {
		e.preventDefault();
		if (confirm("Delete this post?")) {
			var currentPostId = this._id;
			Posts.remove(currentPostId);
			Router.go('postsList');
		}
	}
});
