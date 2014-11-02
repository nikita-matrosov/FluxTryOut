(function () {
    var app = this;
    var eventEmitter = window.EventEmitter;
    var CHANGE_EVENT = 'TICKETS_CHANGE_EVENT';

    //model
    var _tickets = [];


    //TicketStore public API//

    this.TicketStore = merge(eventEmitter.prototype, {

        get: function (id) {
            return _tickets[id];
        },
        getAll: function () {
            return _tickets;
        },

        addChangeListener: function (callback) {
            this.on(CHANGE_EVENT, callback);
        },
        removeChangeListener: function (callback) {
            this.removeListener(CHANGE_EVENT, callback);
        }
    });

    this.TicketStore.dispatchToken = app.TicketAppDispatcher.register(function (payload) {
            var action = payload.action;

            switch (action.type) {

                case app.Actions.RECEIVE_RAW_TICKETS:
                    _addTickets(action.rawTickets);
                    app.TicketStore.emit(CHANGE_EVENT);
                    break;

                default:
                // do nothing
            }

        }
    );

    //private methods section//

    var _addTickets = function (tickets) {
        tickets.forEach(function (ticket) {
            if (!_tickets[ticket.id]) {
                _tickets[ticket.id] = ticket;
            }
        });
    };
} ).call(app);