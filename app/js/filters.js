(function () {
	"use strict";

	/* Filters */

	angular.module('m.lunoe.filters', []).
		filter('interpolate', ['version', function(version) {
			return function(text) {
				return String(text).replace(/\%VERSION\%/mg, version);
			};
		}])

		.filter('linkify', function () {
			return function(text) {
				if (text === undefined) {
					return;
				}
				return String(text).replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+/, function(m) {
					return m.link(m);
				});
			};
		})
		.filter('atify', function () {
			return function(text) {
				if (text === undefined) {
					return;
				}
				return String(text).replace(/@[\w]+/g, function(m) {
						return "<a class='anchor' href='http://www.twitter.com/" + m.replace('@', '') + "'>" + m + "</a>";
				});
			};
		})


		.filter('relativeTime', function() {
			return function(parsed_date) {
				if (parsed_date === undefined) {
					return;
				}
				var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
				var delta = parseInt((relative_to.getTime() - parsed_date) / 1000, 10);
				delta = delta + (relative_to.getTimezoneOffset() * 60);

				var r = '';
				if (delta < 60) {
						r = 'a minute ago';
				} else if (delta < 120) {
						r = 'couple of minutes ago';
				} else if (delta < (45 * 60)) {
						r = (parseInt(delta / 60, 10))
								.toString() + ' minutes ago';
				} else if (delta < (90 * 60)) {
						r = 'an hour ago';
				} else if (delta < (24 * 60 * 60)) {
						r = '' + (parseInt(delta / 3600, 10))
								.toString() + ' hours ago';
				} else if (delta < (48 * 60 * 60)) {
						r = '1 day ago';
				} else {
						r = (parseInt(delta / 86400, 10))
								.toString() + ' days ago';
				}

				return r;
			};
		});
}());
