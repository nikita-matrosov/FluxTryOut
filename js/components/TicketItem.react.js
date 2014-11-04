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
                    <td>{ticket.get('id')}</td>
                    <td>{ticket.get('name')}</td>
                    <td>{ticket.get('price')}</td>
                    <td>{ticket.get('buyer')}</td>
                </tr>
                );
        }
    });
}).call(app);
