var app = {

    initialize: function () {
        var self = this;
        self.store = new LocalStorageStore(function () {
            self.route();
        });
        self.registerEvents();
        this.detailsURL = /^#employees\/(\d{1,})/;

    },

    registerEvents: function() {
        var self = this;
        // Check of browser supports touch events...
        var body = $('body');
        if (document.documentElement.hasOwnProperty('ontouchstart')) {
            // ... if yes: register touch event listener to change the "selected" state of the item
            body.on('touchstart', 'a', function(event) {
                $(event.target).addClass('tappable-active');
            });
            body.on('touchend', 'a', function(event) {
                $(event.target).removeClass('tappable-active');
            });
        } else {
            // ... if not: register mouse events instead
            body.on('mousedown', 'a', function(event) {
                console.log("mousedown");
                $(event.target).addClass('tappable-active');
            });
            body.on('mouseup', 'a', function(event) {
                console.log("mouseup");
                $(event.target).removeClass('tappable-active');
            });
            body.on('mouseup', '', function(event) {
                console.log("mouseup2");
                $('.tappable-active').removeClass('tappable-active');
            })
        }

        $(window).on('hashchange', $.proxy(this.route, this));
    },

    route: function() {
        var hash = window.location.hash;
        if (!hash) {
            $('body').html(new HomeView(this.store).render().el);
            return;
        }

        var match = hash.match(app.detailsURL);
        if (match) {
            this.store.findById(Number(match[1]), function(employee) {
                $('body').html(new EmployeeView(employee).render().el);
            });
        }
    },

    showAlert: function (message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    }


};

app.initialize();

