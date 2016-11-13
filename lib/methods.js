Meteor.methods({

  // Adding in Shooping Collection
  addTasks: function(title, currentList, taskDate) {
    Tasks.insert({
      title: title,
      createdAt: new Date(),
      createdTask: taskDate,
      userId: Meteor.userId(),
      listId: currentList
    });
  },

  // Delete from Shooping Collection
  deleteTasks: function(id) {
    Tasks.remove(id);
  },

  // Update Shooping collection
  updateTasks: function(id, checked, taskDateUpdate) {
    var res = Tasks.findOne(id);
    Tasks.update(id, {$set: {checked: checked}});
    Tasks.update(id, {$set: {createdTask: taskDateUpdate}});
  },

  // Adding in Lists Collection
  addlist: function(listname, begun) {
    Lists.insert({
      listname: listname,
      createdAt: new Date(),
      createdList: begun,
      username: Meteor.user().username,
      userId: Meteor.userId()
    }, function(error, results) {
        Router.go('listpage', { _id: results })
    });
  },

  // Delete from Lists Collection
  deletelist: function(id) {
    Tasks.remove( { listId: id });
    Lists.remove(id);
  },

  // Set private List
  setPublic: function(id, checked) {
    var res = Lists.findOne(id);

    Lists.update(id, {$set: {checked: checked}});
  }
});
