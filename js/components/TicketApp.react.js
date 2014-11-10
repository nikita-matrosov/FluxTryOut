/**
 * @jsx React.DOM
 */
(function () {
    var app = this;
    var React = window.React;
    var Backbone = window.Backbone;

    app.TicketApp = React.createClass({

        mixins: [app.BackboneStoreMixin],

        getBackboneStore: function () {
            return app.TicketStore;
        },

        render: function () {
            var shownTickets = this.state.showing == 'free'? app.TicketStore.freeTickets() : app.TicketStore.allTickets();
            var ticketItems = shownTickets.map(_getTicketItemView);
            return (
                <div className="container">
                    <div className="header">
                        <h1>Tickets</h1>
                        <input ref="name" id="ticketName"
                        placeholder="Ticket name"
                        autoFocus={true} />
                        <input ref="price" id="ticketPrice"
                        placeholder="Ticket price" />
                        <button type="button" className="btn" onClick={this.handleNewTicket}>Create ticket</button>
                    </div>
                    <table className="ticket-table">
                        <tbody>{ticketItems}</tbody>
                    </table>
                    <a href="#/free"> Free tickets (with price = 0)</a><br />
                    <a href="#"> All tickets</a>
                </div>
                );
        },

        componentDidMount: function () {
            var Router = Backbone.Router.extend({
                routes: {
                    '': 'all',
                    'free': 'free'
                }
            });
            var router = new Router();
            router.on('route:all', function () {
                this.setState({showing: 'all'});
            }.bind(this));
            router.on('route:free', function () {
                this.setState({showing: 'free'});
            }.bind(this));
            Backbone.history.start();
        },

        getInitialState: function () {
            //return a view model
            return _getTicketsState();
        },

        handleNewTicket: function (event) {
            var newTicketName = this.refs.name.getDOMNode().value.trim();
            var newTicketPrice = this.refs.price.getDOMNode().value.trim();
            if (newTicketName && newTicketPrice) {
                app.ActionCreator.newTicket({name: newTicketName, price: +newTicketPrice});

                this.refs.name.getDOMNode().value = '';
                this.refs.price.getDOMNode().value = '';
            }
            return false;
        }
    });

    //view model
    var _getTicketsState = function () {
        return {
            tickets: app.TicketStore.allTickets(),
            showing: 'all'
        }
    };

    var TicketItem = app.TicketItem;
    var _getTicketItemView = function (ticket) {
        return (
            <TicketItem key={ticket.id} ticket={ticket} />
            );
    };
}).call(app);
