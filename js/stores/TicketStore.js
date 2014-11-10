(function () {
    var app = this;
    var Backbone = window.Backbone;

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


    //TicketStore public API//
    //It is strongly recommended to use only methods provided from the store
    //even though lots of other methods are exposed


    var TicketManager = Backbone.Collection.extend({

        model: app.Ticket,
        localStorage: new Backbone.LocalStorage('tickets-local'),


        //public getters to fetch data from the store//

        // Filter down the list of all tickets that are free.
        freeTickets: function () {
            return this.where({price: 0});
        },

        allTickets: function () {
            return this.models;
        },


        //the only place to handle modifying the store according to the business logic//
        dispatchCallback: function (payload) {
            //here backbone events are used which is generated on every action with collections
            //React component render itself on this event via the help from BackboneStoreMixin

            //To customize behaviour on model event we can use events like: this.trigger("CUSTOM_EVENT");
            //and fulfill the react component with corresponding handling logic

            var action = payload.action;

            switch (action.type) {

                case app.Actions.RECEIVE_RAW_TICKETS:
                    this.add(action.rawTickets);
                    break;

                case app.Actions.NEW_TICKET_CREATED:
                    action.ticketData.id = this._nextOrder();
                    this.add(action.ticketData);
                    break;

                default:
                // do nothing
            }
        },
        initialize: function () {
            this.dispatchToken = app.TicketAppDispatcher.register(this.dispatchCallback.bind(this));
        },


        //helper methods section//

        // sequential order
        _nextOrder: function () {
            return this.length ? this.last().get('id') + 1 : 1;
        },
        comparator: 'id'
    });


    //export the store's singleton
    app.TicketStore = new TicketManager();

} ).call(app);