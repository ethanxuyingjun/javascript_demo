/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('cruddemo.view.main.FormController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.form',

    init: function () {
        this.getViewModel().set("selAddressBook",this.getView().addressObject.data);
    },

    onApplyClick: function () {
        var vmodel = this.getViewModel().get('selAddressBook'), items = Ext.getCmp('abGrid').getStore().data.items;
        items[this.getView().selIndex].data = vmodel;
        Ext.getCmp('abGrid').getStore().loadData(items);
        this.getView().up().close();
    }
});
