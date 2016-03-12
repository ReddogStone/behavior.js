var BehaviorSystem = function() {
	var pool = {};
	var nextId = 0;

	return {
		add: function(behavior) {
			var id = nextId++;
			pool[id] = behavior;
			return function() {
				delete pool[id];
			};
		},
		update: function(event) {
			Object.keys(pool).forEach(function(id) {
				var result = pool[id](event);
				if (result.done) {
					delete pool[id];
				}
			});
		}
	};
};