app.BackboneStoreMixin = {
    //todo: investigate whether it's normal to use forseUpdate()
    //how it differs from manual setState() and how it affects performance
    //http://stackoverflow.com/questions/21709905/can-i-avoid-forceupdate-when-using-react-with-backbone

    componentDidMount: function () {
        if (!this.getBackboneStore) {
            throw new Error("Component must provide 'getBackboneStore' method");
        }
        this.getBackboneStore().on("all", function () {
            this.forceUpdate();
        }.bind(this))
    },

    componentWillUnmount: function () {
        if (!this.getBackboneStore) {
            throw new Error("Component must provide 'getBackboneStore' method");
        }
        // Removes all callbacks.
        this.getBackboneStore().off(null, null, this)
    }

};