var EmployeeView = function(employee) {
    this.initialize = function(employee) {
        console.log("creating employee view");
        console.log(employee);
        this.el = $('<div/>');
        this.employee = employee;
    };

    this.render = function() {
        console.log("starting employee view render");
        console.log(this);
        console.log(employee);
        this.el.html(EmployeeView.template(this.employee));
        return this;
    };

    this.initialize(employee);

};



EmployeeView.template = Handlebars.compile($("#employee-tpl").html());