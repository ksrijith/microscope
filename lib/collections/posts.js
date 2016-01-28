Posts = new Mongo.Collection('posts');
Posts.allow({
	remove: function(userId, post) { return ownsDocument(userId, post); },
});


Meteor.methods({
	postInsert: function(postAttributes) {
		check(Meteor.userId(), String);
		check(postAttributes, {
			title: String,
			url: String
		});
		var postWithSameLink = Posts.findOne({url: postAttributes.url});
		if (postWithSameLink) {
			return {
				postExists: true,
				_id: postWithSameLink._id
			}
		}

		var user = Meteor.user();
		var post = _.extend(postAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date()
		});
		var postId = Posts.insert(post);
		return {
			_id: postId
		};
	},
	postUpdate: function(currentPostId, postAttributes) {
		check(postAttributes, {
			title: String,
			url: String
		});
		check(currentPostId, String);
		var post = Posts.findOne(currentPostId);
		if (post.url===postAttributes.url){
			console.log(post);
			var postId = Posts.update(post, {$set: {title:postAttributes.title}});
			return {
				_id: postId
			};
		} else {
			return {
				urlChanged: true,
				_id: post._id
			}
		}
	}
});
