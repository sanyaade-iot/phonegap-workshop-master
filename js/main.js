var app = {

    findByName: function() {
        console.log('findByName');
        var self = this;
        this.store.findByName($('.search-key').val(), function(employees) {
            $('.employee-list').html(self.employeeLiTpl(employees));
        });
    },

    initialize: function() {
        var self = this;
        self.homeTpl = Handlebars.compile($("#home-tpl").html());
        self.employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html());
        self.store = new LocalStorageStore(function() {
            self.renderHomeView()});

        $('.search-key').on('keyup', $.proxy(this.findByName, this));
    },

    showAlert: function (message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    },

    renderHomeView: function() {
        $('body').html(this.homeTpl());
        $('.search-key').on('keyup', $.proxy(this.findByName, this));
    }

};

app.initialize();

