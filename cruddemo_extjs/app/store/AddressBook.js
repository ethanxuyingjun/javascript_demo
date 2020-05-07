Ext.define('cruddemo.store.AddressBook', {
    extend: 'Ext.data.Store',

    alias: 'store.addressBook',

    model: 'cruddemo.model.AddressBook',

    data: { items: [
        {
            "id": 501,
            "name":"Khali Zhang",
            "location":"Shanghai",
            "office":"C-103",
            "officePhone":"x55778",
            "cellPhone":"650-353-1239"
        },
        {
            "id": 502,
            "name":"Mike Li",
            "location":"Beijing",
            "office":"B-102",
            "officePhone":"x33778",
            "cellPhone":"320-353-1239"
        },
        {
            "id": 503,
            "name":"Michelle Wang",
            "location":"Cheng Du",
            "office":"C-303",
            "officePhone":"x66778",
            "cellPhone":"500-353-1239"
        }
    ]},

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});
