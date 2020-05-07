/**
 * This view is an example list of people.
 */
Ext.define('cruddemo.view.main.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'mainlist',

    requires: [
        'cruddemo.store.AddressBook'
    ],

    controller: 'list',

    id: 'abGrid',

    title: 'Address Book',

    store: {
        type: 'addressBook'
    },

    striped: true,

    selModel: {
        injectCheckbox: 'first',
        mode: 'SIMPLE'
    },

    selType: 'checkboxmodel',

    plugins: [{
        ptype: 'cellediting',
        autoCancel: false,
        clicksToEdit: 1
    }],

    columns: [
        {
            text: 'ID',
            dataIndex: 'id',
            width: 50,
            cell: {
                userCls: 'bold'
            }
        },
        {
            text: 'Name',
            dataIndex: 'name',
            minWidth: 200,
            cell: {
                userCls: 'bold'
            }
        }, {
            text: 'Location',
            dataIndex: 'location',
            flex: 1
        }, {
            text: 'Office',
            dataIndex: 'office',
            flex: 1
        },
        {
            text: 'Phone',
            flex: 1,
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'officePhone',
                    text: 'Office',
                    flex: 1
                }, {
                    text: 'Cell',
                    dataIndex: 'cellPhone',
                    flex: 1,
                    editor: {
                        xtype: 'textfield'
                    }
                }
            ]
        }
    ],

    buttons: [{
        text: 'Delete',
        listeners: {
            click: 'onDeleteClick'
        }
    }, {
        text: 'Update',
        listeners: {
            click: 'onUpdateClick'
        }
    }, {
        text: 'Add',
        listeners: {
            click: 'onAddClick'
        }
    }]
});
