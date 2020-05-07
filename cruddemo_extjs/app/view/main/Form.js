/**
 * This view is a form
 */
Ext.define('cruddemo.view.main.Form', {
    extend: 'Ext.form.Panel',
    xtype: 'mainform',

    requires: [
        'cruddemo.view.main.FormController',
        'cruddemo.view.main.FormModel'
    ],

    controller: 'form',

    viewModel: {
        type: 'form'
    },

    addressObject: undefined,
    selIndex: -1,

    items: [
        {
            xtype: 'textfield',
            name: 'name',
            fieldLabel: 'Name',
            bind:{
                value:'{selAddressBook.name}'
            }
        },
        {
            xtype: 'textfield',
            name: 'location',
            fieldLabel: 'Location',
            bind:{
                value:'{selAddressBook.location}'
            }
        },
        {
            xtype: 'textfield',
            name: 'office',
            fieldLabel: 'Office',
            bind:{
                value:'{selAddressBook.office}'
            }
        },
        {
            xtype: 'textfield',
            name: 'officePhone',
            fieldLabel: 'Office Phone',
            bind:{
                value:'{selAddressBook.officePhone}'
            }
        },

        {
            xtype: 'textfield',
            name: 'cellPhone',
            fieldLabel: 'Cell Phone',
            bind:{
                value:'{selAddressBook.cellPhone}'
            }
        }
    ],

    buttons: [
        { xtype: "button", text: "Apply" ,listeners: {
            click: 'onApplyClick'
        }}
    ]
});
