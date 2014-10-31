var TicketBack = (function () {

    //stubs for fetching data from server

    this.getTickets = function () {
        return [
            {id: 1, name: 'cloth', cost: 100},
            {id: 2, name: 'boots', cost: 200}
        ]
    };

    this.getTicket = function (id) {
        switch (id) {
            case 1: return {id: 1, name: 'cloth', cost: 100};
            case 2: return {id: 2, name: 'boots', cost: 200};
            default: return {id: 0, name: 'shit', cost: 0};
        }
    }

})();