/*
 * AppDispatcher
 *
 * A singleton that operates as the central hub for application updates.
 */
(function () {
    var app = this;
    var dispatcher = new window.Dispatcher();

    this.TicketAppDispatcher = merge(dispatcher, {
        /**
         * @param {object} action The details of the action, including the action's
         * type and additional data coming from the server.
         */
        handleServerAction: function(action) {
            var payload = {
                source: app.PayloadSources.SERVER_ACTION,
                action: action
            };
            this.dispatch(payload);
        },

        handleViewAction: function(action) {
            var payload = {
                source: app.PayloadSources.VIEW_ACTION,
                action: action
            };
            this.dispatch(payload);
        }
    });
}).call(app);