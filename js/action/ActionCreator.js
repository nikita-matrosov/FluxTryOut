(function () {
    var app = this;

    this.ActionCreator = {
        receiveAll: function(rawTickets) {
            app.TicketAppDispatcher.handleServerAction({
                type: app.Actions.RECEIVE_RAW_TICKETS,
                rawTickets: rawTickets
            });
        }
    }
}).call(app);