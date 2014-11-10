/**
 * @jsx React.DOM
 */
var TicketApp = app.TicketApp;

app.ActionCreator.receiveAll(app.TicketBack.getTickets());

React.renderComponent(
    <TicketApp />,
    document.getElementById('tickets')
);

//todo: consider using:  https://github.com/rackt/react-router
/* var routes = (
    <ReactRouter.Routes location="hash">
        <ReactRouter.Route handler={TodoApp}>
            <ReactRouter.Route name="All" path="/" handler={TodoMain} state="all" />
            <ReactRouter.Route name="Completed" path="/completed" handler={TodoMain} state="completed" />
            <ReactRouter.Route name="Active" path="/active" handler={TodoMain} state="active" />
        </ReactRouter.Route>
    </ReactRouter.Routes>
);

React.renderComponent(routes, document.getElementById('todoapp'));*/
