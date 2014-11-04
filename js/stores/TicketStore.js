(function () {
    var app = this;
    var Backbone = window.Backbone;
    var eventEmitter = window.EventEmitter;
    var CHANGE_EVENT = 'TICKETS_CHANGE_EVENT';

    //item model
    app.Ticket = Backbone.Model.extend({
        defaults: {
            id: 0,
            name: "",
            price: 0,
            buyer: 'me',
            sold: false
        },

        sell: function () {
            this.save({sold: true});
        }
    });

    var Tickets = Backbone.Collection.extend({
        // Reference to this collection's model.
        model: app.Ticket,

        localStorage: new Backbone.LocalStorage('tickets-local'),

        // Filter down the list of all tickets that are free.
        free: function () {
            return this.where({price: 0});
        },

        // sequential order
        nextOrder: function () {
            return this.length ? this.last().get('order') + 1 : 1;
        },
        comparator: 'order'
    });


    //model
    var _tickets = new Tickets();


    //TicketStore public API//

    app.TicketStore = merge(eventEmitter.prototype, {

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

    app.TicketStore.dispatchToken = app.TicketAppDispatcher.register(function (payload) {
            var action = payload.action;

            switch (action.type) {

                case app.Actions.RECEIVE_RAW_TICKETS:
                    emitChange(function () {
                        addTickets(action.rawTickets);
                    });
                    break;

                case app.Actions.NEW_TICKET_CREATED:
                    emitChange(function () {
                        addNewTicket(action.ticketData);
                    });
                    break;

                default:
                // do nothing
            }

        }
    );

    //private methods section//

    var emitChange = function(eventHandler) {
        eventHandler();
        app.TicketStore.emit(CHANGE_EVENT);
    };

    var addNewTicket = function (ticket) {
        ticket.order = _tickets.nextOrder();
        ticket.id = new Date();
        _tickets.add(ticket);
    };

    var addTickets = function (tickets) {
        _tickets.add(tickets)
    };
} ).call(app);