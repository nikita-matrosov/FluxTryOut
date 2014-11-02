/**
 * @jsx React.DOM
 */
(function () {
    var React = window.React;
    var app = this;

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
            return (
                <div>
                    {this.state.tickets}
                </div>
                );
        }
    });

    //view model
    var _getTicketsState = function () {
        return {
            tickets: app.TicketStore.getAll()
        }
    };

    /**
     * Event handler for 'change' events coming from the TicketStore
     */
    var _onChange = function () {
        this.setState(_getTicketsState());
    }
}).call(app);
