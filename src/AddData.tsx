import { useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';

import type { FormParams } from './types';

interface PropsType {
  addData: (x: FormParams) => void;
}

const AddData = ({ addData }: PropsType): JSX.Element => {
  const [addForm] = Form.useForm();

  const onFinish = (values: FormParams) => {
    addData(values);
    setIsModalOpen(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
    addForm.resetFields();
  };

  const cancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type='primary' onClick={showModal}>
        添加
      </Button>
      <Modal title='添加' open={isModalOpen} footer={null} closeIcon={null}>
        <Form form={addForm} name='basic' onFinish={onFinish} autoComplete='off'>
          <Form.Item
            label='任务'
            name='content'
            rules={[
              {
                required: true,
                message: '必填',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={cancel}>取消</Button>
            <Button type='primary' style={{ marginLeft: '1rem' }} htmlType='submit'>
              确认
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddData;
