import { memo } from 'react';
import { Form, Input, DatePicker, Select, Button, Row, Col } from 'antd';
import { FormFilterParams } from 'interface';
import style from './index.module.scss';
import { DATE_FORMAT } from 'utilities';
import { useDateValidation } from 'hooks/useDateValidation';

const { Option } = Select;

type EventFilterProps = {
  loading: boolean;
  onFilterChanged?: (params: FormFilterParams) => void;
};

export const EventFilter = memo(
  ({ loading, onFilterChanged }: EventFilterProps) => {
    const [form] = Form.useForm<FormFilterParams>();
    const { disabledEndDate, disabledStartDate } = useDateValidation(form);
    return (
      <Form form={form} onFinish={onFilterChanged} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Location" name="city">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Start Date" name="startDate">
              <DatePicker
                format={DATE_FORMAT}
                disabledDate={disabledStartDate}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="End Date" name="endDate">
              <DatePicker format={DATE_FORMAT} disabledDate={disabledEndDate} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Sort By" name="sortBy" initialValue="date">
              <Select>
                <Option value="date">Date</Option>
                <Option value="name">Name</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Direction" name="direction" initialValue="desc">
              <Select>
                <Option value="asc">Ascending</Option>
                <Option value="desc">Descending</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item>
              <Button
                className={style.button}
                type="primary"
                htmlType="submit"
                loading={loading}
              >
                Search
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  },
);

export default EventFilter;
