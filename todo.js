
if (Meteor.isClient) {

  Meteor.subscribe("tasks");
  Meteor.subscribe("lists");

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

  Template.home.events({
    'click .btn': function(event) {
      Router.go('main');
    }
  });

  Template.lists.helpers({
    'list': function() {
      return Lists.find({});
    },
    isOwner() {
      return this.userId === Meteor.userId();
    },
  });

  Template.listpage.helpers({
    'list': function() {
      return Lists.find({});
    }
  });

  Template.listpage.events({
    'submit .new-list': function(event) {
      var listname = event.target.title.value;

      var date = new Date()
      var begun = moment(date).format("YY/MM/DD");

      if (listname) {
        Meteor.call("addlist", listname, begun);
      }

      event.target.title.value = "";

      return false;
    },
  });

  Template.lists.events({
    'click .deletelist': function() {
      Meteor.call("deletelist", this._id);
    },
    'click .toggle-private': function() {
      Meteor.call("setPublic", this._id, !this.checked);
    }
  });


  Template.taskList.events({
    'click .deleteTask': function() {
      Meteor.call("deleteTasks", this._id);
    },
    'click .toggle-checked': function() {
      var date = new Date()
      var taskUpdate = moment(date).format("YY/MM/DD HH:mm");
      Meteor.call("updateTasks", this._id, !this.checked, taskUpdate);
    },

  });

  Template.task.helpers({
    tasks: function() {
      var currentList = this._id;
      return Tasks.find({ listId: currentList }, {sort: {createdAt: -1}});
    },
    isOwner() {
      return this.userId === Meteor.userId();
    },
  });

  Template.task.events({
    'submit .new-task': function(event) {
      var title = event.target.title.value;
      var currentList = this._id;

      var date = new Date()
      var taskDate = moment(date).format("YY/MM/DD HH:mm");

      if (currentList) {
        if (title) {
          Meteor.call("addTasks", title, currentList, taskDate);
        }
      }

      event.target.title.value = "";
      return false;
    }
  });

  Template.totalCount.helpers({
    'totalTodos': function() {
      var currentList = this._id;
      return Tasks.find({ listId: currentList }).count();
    }
  });

}

if (Meteor.isServer) {

  Meteor.publish("tasks", function() {
    return Tasks.find();
  });

  Meteor.publish("lists", function() {
    return Lists.find({
      $or: [
        { checked: {$eq: true} },
        { userId: this.userId }
      ]
     });
  });

}
