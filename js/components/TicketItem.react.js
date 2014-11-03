/**
 * @jsx React.DOM
 */
(function () {
    var React = window.React;

    this.TicketItem = React.createClass({

        propTypes: {
            ticket: React.PropTypes.object
        },

        render: function () {
            var ticket = this.props.ticket;
            return (
                <tr className="ticket-row">
                    <td>{ticket.id}</td>
                    <td>{ticket.name}</td>
                    <td>{ticket.price}</td>
                    <td>{ticket.buyer}</td>
                    <td>{ticket.description}</td>
                </tr>
                );
        }
    });
}).call(app);
