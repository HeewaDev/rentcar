import "./pages.css";
import "../index.css";
import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { DeleteCar, getAllCars } from "../redux/actions/carsActions";
import {
  Button,
  Row,
  Col,
  DatePicker,
  Checkbox,
  Edit,
  Popconfirm,
  Table,
  Space,
} from "antd";
import Spinner from "../components/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined, StarTwoTone } from "@ant-design/icons";

function Admin() {
  const navigate = useNavigate();
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, []);

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <img
          src={text}
          alt="car"
          height="60"
          width="60"
          style={{
            borderRadius: 5,
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
    },
    {
      title: "Fuel type",
      dataIndex: "fuelType",
      key: "fuelType",
    },
    {
      title: "Rent per hour",
      dataIndex: "rentPerHour",
      key: "rentPerHour",
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              navigate(`/editcar/${record._id}`);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title={`Are you sure to delete ${record.name}?`}
            onConfirm={() => {
              dispatch(DeleteCar({ carid: record._id }));
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <DefaultLayout>
      <Row justify="center" gutter={16} className="mt-2">
        <Col lg={20} sm={24}>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mt-1 mr-2">Admin Panel</h3>
            <button className="btn1">
              <a href="/addcar">ADD CAR</a>
            </button>
          </div>
        </Col>
      </Row>

      {loading ? <Spinner /> : <Table columns={columns} dataSource={cars} />}
    </DefaultLayout>
  );
}

export default Admin;
