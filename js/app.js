/**
 * @jsx React.DOM
 */
var TicketApp = app.TicketApp;

app.ActionCreator.receiveAll(app.TicketBack.getTickets());

React.renderComponent(
    <TicketApp />,
    document.getElementById('tickets')
);

