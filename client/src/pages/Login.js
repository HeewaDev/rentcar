import React, { useState } from 'react' 
import { Row, Col, Form, Input, Button } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../redux/actions/userActions'
import AOS from 'aos'
import Spinner from '../components/Spinner'
import 'aos/dist/aos.css'

AOS.init()

function Login() {
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.alertsReducer)
    const [showPassword, setShowPassword] = useState(false)

    function onFinish(values) {
        dispatch(userLogin(values))
        console.log(values)
    }

    return (
        <div className='login'>
            {loading && <Spinner />}
            <Row gutter={16} className='d-flex align-items-center'>
                <Col lg={16} style={{ position: 'relative' }}>
                    <img 
                        className='w-100'
                        data-aos='slide-right'
                        data-aos-duration='1500'
                        src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80" alt="car"
                    />
                    <h1 className='login-logo'>Renter KRD</h1>
                </Col>

                <Col lg={8} className='text-left p-5'> 
                    <Form layout='vertical' className='login-form p-5' onFinish={onFinish}>
                        <h1>Login</h1>
                        <hr/>
                        <Form.Item name='username' label='Username' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name='password' label='Password' rules={[{ required: true }]}>
                            <Input type={showPassword ? 'text' : 'password'} />
                        </Form.Item>

                        <Button type="link" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? 'Hide' : 'Show'} Password
                        </Button>

                        <Button type="primary" htmlType="submit" className='mt-2 mb-3'>
                            Login
                        </Button>
                        <br/>
                        <Link to='/register'>Click Here To Register</Link>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default Login
