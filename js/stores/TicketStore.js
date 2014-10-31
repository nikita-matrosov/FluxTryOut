var TicketStore = (function () {

    var _tickets = [];



    return {

        getTickets: function() {
            return _tickets;
        }
    }
})();