var HomeView = function(store) {
    this.initialize = function () {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        console.log("binding");
        this.el.on('keyup', '.search-key', this.findByName);
        console.log("bound");
    };

    this.render = function () {
        console.log("rendered");
        this.el.html(HomeView.template());
        return this;
    };

    this.findByName = function () {
        console.log("findbyname");
        store.findByName($('.search-key').val(), function (employees) {
            console.log(employees)
            $('.employee-list').html(HomeView.liTemplate(employees));
        });

    };

    this.initialize();
};



HomeView.template = Handlebars.compile($("#home-tpl").html());
HomeView.liTemplate = Handlebars.compile($("#employee-li-tpl").html());