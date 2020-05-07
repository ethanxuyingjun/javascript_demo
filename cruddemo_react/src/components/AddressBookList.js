import React , { useState } from 'react';
import { connect } from 'dva';
import { Row, Select, Col, Table, Button, Tooltip, Input } from 'antd';
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import AddressBookDlg from './AddressBookDlg';
import styles from './AddressBookList.css';
import { formatMessage, setLocale, getLocale, FormattedMessage } from 'umi/locale'

const { Option } = Select;

const AddressBookList = ({ dispatch, list: dataSource }) => {

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRow, setSelectedRow] = useState({});
    const [clickedRowkey, setClickedRowKey] = useState('');

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
           setSelectedRowKeys(selectedRowKeys);
           if (selectedRows[0]) {
             setSelectedRow(selectedRows[0]);
           }
      },
    };

    function handleChange(value) {
        setLocale(value);
    }

    function deleteHandler() {
        dispatch({
          type: 'addressbooks/remove',
          payload: selectedRowKeys,
        });
        setSelectedRowKeys([]);
    }

    function editHandler(id, values) {
        dispatch({
          type: 'addressbooks/update',
          payload: { id, values },
        });
    }

    function createHandler() {
        dispatch({
          type: 'addressbooks/add',
        });
     }

    function compareByAlph (a, b) { 
       if (a > b) { return -1; } 
       else if (a < b) { return 1;} 
       else {return 0}
    }

    function onCellPhoneClicked(record){   
        setClickedRowKey(record.id);

    }

    function handleEnter(e, record){
        if (e.keyCode === 13 && e.target.value) {
          setClickedRowKey('');
          record.cellPhone = e.target.value;
        }
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: "id",
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.id - b.id
        },
        {
            title: formatMessage({id: 'addressbook.name'}),
            dataIndex: 'name',
            key: "name",
            defaultSortOrder: 'descend',
            sorter: (a, b) => compareByAlph(a.name, b.name)
        },
        {
            title: formatMessage({id: 'addressbook.location'}),
            dataIndex: 'location',
            key: "location",
            defaultSortOrder: 'descend',
            sorter: (a, b) => compareByAlph(a.location, b.location)
        },
        {
            title: formatMessage({id: 'addressbook.office'}),
            dataIndex: 'office',
            key: "office",
            defaultSortOrder: 'descend',
            sorter: (a, b) => compareByAlph(a.office, b.office)
        },
        {
            title: formatMessage({id: 'addressbook.phone'}),
            children: [
                {
                    title: formatMessage({id: 'addressbook.officePhone'}),
                    dataIndex: 'officePhone',
                    key: "officePhone",
                    defaultSortOrder: 'descend',
                    sorter: (a, b) => compareByAlph(a.officePhone, b.officePhone)
                },
                {
                    title: formatMessage({id: 'addressbook.cellPhone'}),
                    dataIndex: 'cellPhone',
                    key: "cellPhone",
                    defaultSortOrder: 'descend',
                    sorter: (a, b) => compareByAlph(a.cellPhone, b.cellPhone),
                    render(text, record) {
                    if (clickedRowkey !== record.id) return (<span onDoubleClick={(e) => onCellPhoneClicked(record)}>{text}</span>);
                    return <Input defaultValue={text} onKeyUp ={(e) => handleEnter(e, record)}/>
                  },
                }
            ]
        }
    ];

  return (
    <div className={styles.normal}>

        <Row justify="space-between">
        <Col span={4} className={styles.operation}> 
            <Select defaultValue={getLocale()} style={{ width: 120 }} onChange={handleChange}>
            <Option value="zh-CN">CN</Option>
            <Option value="en-US">EN</Option>
          </Select>
        </Col>   
        </Row>
        <Table
            bordered
            columns={columns}
            dataSource={dataSource}
            rowKey={record => record.id}
            rowSelection={{
              type: 'checkbox',
              ...rowSelection,
            }}
            pagination={false}
          />
        <Row justify="space-between">
          <Col span={4} style={{ textAlign: "left" }}> 
              <Tooltip title="Delete">
                  <Button type="danger" shape="circle" className={styles.btn} disabled={selectedRowKeys.length===0} onClick={deleteHandler} >
                    <DeleteOutlined />
                  </Button>
              </Tooltip>
           </Col>
           <Col span={16} /> 
           <Col span={4}  style={{ textAlign: "right" }}>
                <AddressBookDlg record={selectedRow} onOk={editHandler.bind(null, selectedRow.id)}>
                     <Button className={styles.btn} disabled={selectedRowKeys.length!==1} >Update</Button>
                </AddressBookDlg>
                 <Button className={styles.btn} type="primary" onClick={createHandler} >Add</Button>
          </Col>
        </Row>
    </div>
  );
};

function mapStateToProps(state) {
  const { list } = state.addressbooks;
  return {
    list,
  };
}

export default connect(mapStateToProps)(AddressBookList);