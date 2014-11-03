(function () {
    var app = this;
    //stubs for fetching data from server

    this.TicketBack = {
        getTickets: function () {
            return [
                new app.Ticket(1, 'cloth', 100),
                new app.Ticket(2, 'boots', 200)
            ]
        },
        getTicket: function (id) {
            switch (id) {
                case 1:
                    new app.Ticket(1, 'cloth', 100, 'AuthorisedUser');
                    break;
                case 2:
                    new app.Ticket(2, 'boots', 200, 'AuthorisedUser');
                    break;
                default:
                    new app.Ticket(0, 'crap', 0, 'AuthorisedUser',
                        'Literally priceless crap. Cause who said there is nothing free in this world. Take it, it\'s free');
            }
        }
    }

}).call(app);