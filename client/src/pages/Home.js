import "./pages.css";
import "../index.css";
import { Avatar, Card, Skeleton, Switch, Cover, Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { getAllCars } from "../redux/actions/carsActions";
import { Button, Row, Col, DatePicker } from "antd";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import moment from "moment";
import { Flex } from 'antd';
const {RangePicker} = DatePicker
const { Meta } = Card;


function Home() {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalCars , setTotalcars] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const { Search } = Input;
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1677ff',
      }}
    />
  );
  const dispatch = useDispatch();
   const filteredCars = cars.filter(car =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Function to handle search input change
  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
  };

  // Function to handle date range picker change
  const handleDateRangeChange = (dates, dateStrings) => {
    // Implement your logic here
  };

  useEffect(() => {
    dispatch(getAllCars());
  }, []);

  function setFilter(values){

    var selectedFrom = moment(values[0] , 'MMM DD yyyy HH:mm')
    var selectedTo = moment(values[1] , 'MMM DD yyyy HH:mm')

    var temp=[]

    for(var car of cars){

          if(car.bookedTimeSlots.length === 0){
              temp.push(car)
          }
          else{

               for(var booking of car.bookedTimeSlots) {

                   if(selectedFrom.isBetween(booking.from , booking.to) ||
                   selectedTo.isBetween(booking.from , booking.to) || 
                   moment(booking.from).isBetween(selectedFrom , selectedTo) ||
                   moment(booking.to).isBetween(selectedFrom , selectedTo)
                   )
                   {

                   }
                   else{
                       temp.push(car)
                   }

               }

          }

    }


    setTotalcars(temp)


}
  return (
    <DefaultLayout>
      <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'end',flexDirection:'column'}}>  
<Search style={{width:'40%', padding: '10px' }}
      placeholder="Search by car name"
      value={searchTerm}
      onChange={handleSearchChange}
     
      size="medium"
      
    
    />
</div>
      <div>
        <Row className='mt-3' justify='center'>
          <Col lg={20} sm={24} className='d-flex justify-content-left'>
            {/* <RangePicker
              showTime={{format: 'HH:mm'}}
              format='MMM DD yyyy HH:mm'
              onChange={handleDateRangeChange}
            /> */}



          </Col>
        </Row>
  
        <Row justify="center" gutter={2} sm={4} className="mt-5" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          {/* Search input field */}
          
          {loading ? (
            <Spinner />
          ) : (
            filteredCars.map(car => (
<Col span={6} key={car._id} style={{ minWidth: '300px', maxWidth:'400px'}}>
                <Card title={car.name} bordered={true}>
                <div style={{ border:'1px', width: '100%', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderRadius: '7.5%' }}>
  <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
    <img alt={car.name} src={car.image} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius:'5px' }} />
  </div>
</div>
                  <Meta style={{marginTop:'5px'}}
                    avatar={<Avatar src={car.image} />}
                    title={car.name}
                    description={`Rent Per Hour : ${car.rentPerHour}$`}
                  />
                  <div style={{ marginTop: '10px', textAlign:'end', textDecoration:'none' }}> 
                    <Button type="primary" style={{ textDecoration: 'none' }}>
                      <Link to={`/booking/${car._id}`}>Book Now</Link>
                    </Button>
                  </div>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </div>
      </DefaultLayout>
    );

            }

export default Home;
