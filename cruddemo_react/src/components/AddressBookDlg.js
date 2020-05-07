import { Component } from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

class AddressBookModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModalHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { id, name, location, office, officePhone, cellPhone } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <span>
        <span onClick={this.showModalHandler}>
          { children }
        </span>
        <Modal
          title="Edit User"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form horizontal="true" onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="Name"
            >
              {
                getFieldDecorator('name', {
                  initialValue: name,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Location"
            >
              {
                getFieldDecorator('location', {
                  initialValue: location,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Office"
            >
              {
                getFieldDecorator('office', {
                  initialValue: office,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Office Phone"
            >
              {
                getFieldDecorator('officePhone', {
                  initialValue: officePhone,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Cell Phone"
            >
              {
                getFieldDecorator('cellPhone', {
                  initialValue: cellPhone,
                })(<Input />)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(AddressBookModal);