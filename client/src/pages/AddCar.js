import { Col, Row, Form, Input } from "antd";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { addCar } from "../redux/actions/carsActions";
import Spinner from "../components/Spinner";

function AddCar() {
  const alertsSate = useSelector((state) => state.alertsReducer);
  const dispatch = useDispatch();
  function onFinish(values) {
    values.bookedTimeSlots = [];
    dispatch(addCar(values));
  }
  return (
    <DefaultLayout>
      {alertsSate?.loading && <Spinner />}
      <Row justify="center mt-2">
        <Col lg={12} sm={24}>
          <Form className="bs1 p-2" layout="vertical" onFinish={onFinish}>
            <hr />

            <h3> Add New Car</h3>

            <hr />
            <Form.Item
              name="name"
              label="Car Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="image"
              label="Image URL"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="rentPerHour"
              label="Rent Per Hour"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="capacity"
              label="Capacity"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="fuelType"
              label="Fuel Type"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <div className="text-right">
              <button>Add Car</button>
            </div>
          </Form>
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default AddCar;
