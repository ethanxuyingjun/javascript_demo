/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('cruddemo.view.main.ListController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.list',

    requires: [
        'cruddemo.view.main.Form'
    ],

    onAddClick: function () {
        var newId, newAddresBook, sortedArray, items = Ext.getCmp('abGrid').getStore().data.items;
        sortedArray = Ext.Array.sort(items, function (a, b) {
            return b.id - a.id;
        });
        newId = sortedArray[0].id + 1;
        newAddresBook = Ext.create(cruddemo.model.AddressBook, {
            id: newId
        });
        Ext.getCmp('abGrid').getStore().add(newAddresBook);
    },

    onUpdateClick: function () {
        //Ext.getCmp('abGrid').getSelectionModel().deselectAll();
        var selIndex, selection = Ext.getCmp('abGrid').getSelection();
        if (selection.length === 1) {
            selIndex = Ext.getCmp('abGrid').getStore().indexOf(selection[0]);
            Ext.create('Ext.window.Window', {
                title: 'Update ' + selection[0].get("name"),
                height: 300,
                width: 400,
                padding: 5,
                items: [{
                    xtype: 'mainform',
                    addressObject: selection[0],
                    selIndex: selIndex
                }]
            }).show();
        }
    },

    onDeleteClick: function () {
        var selection = Ext.getCmp('abGrid').getSelection();
        if (selection.length > 0) {
            selection.forEach(function(record) {
                Ext.getCmp('abGrid').getStore().remove(record);
            });
        }
    }
});
