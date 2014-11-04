(function () {
    var app = this;

    app.ActionCreator = {
        receiveAll: function(rawTickets) {
            app.TicketAppDispatcher.handleServerAction({
                type: app.Actions.RECEIVE_RAW_TICKETS,
                rawTickets: rawTickets
            });
        },

        newTicket: function(ticket) {
            app.TicketAppDispatcher.handleViewAction({
                type: app.Actions.NEW_TICKET_CREATED,
                ticketData: ticket
            })
        }
    }
}).call(app);