/**
 * @jsx React.DOM
 */
(function () {
    var app = this;
    var React = window.React;

    this.TicketApp = React.createClass({

        getInitialState: function () {
            //return a view model
            return _getTicketsState();
        },

        componentDidMount: function () {
            app.TicketStore.addChangeListener(this._onChange);
        },
        componentWillUnmount: function () {
            app.TicketStore.removeChangeListener(this._onChange);
        },

        render: function () {
            var ticketItems = this.state.tickets.map(_getTicketItemView);
            return (
                <table className="ticket-table">
                    {ticketItems}
                </table>
                );
        }
    });

    //view model
    var _getTicketsState = function () {
        return {
            tickets: app.TicketStore.getAll()
        }
    };

    var TicketItem = app.TicketItem;
    var _getTicketItemView = function (ticket) {
        return (
            <TicketItem ticket={ticket} />
            );
    };

    /**
     * Event handler for 'change' events coming from the TicketStore
     */
    var _onChange = function () {
        this.setState(_getTicketsState());
    }
}).call(app);
