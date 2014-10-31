var ActionCreator = (function () {

    this.receiveAll = function(rawMessages) {
        TicketAppDispatcher.handleServerAction({
            type: ActionTypes.RECEIVE_RAW_MESSAGES,
            rawMessages: rawMessages
        });
    }
})();