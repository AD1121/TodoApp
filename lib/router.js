Router.route('/', {
  template: 'home'
});

Router.route('/main', {
  template: 'main'
});

Router.route('/list/:_id', {
  name: 'listpage',
  template: 'listpage',
  data: function() {
    var currentList = this.params._id;
    return Lists.findOne({ _id: currentList });
  }
});
