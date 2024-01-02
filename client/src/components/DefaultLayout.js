import { Menu, Dropdown, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';

function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    try {
      localStorage.removeItem('user');
      window.location.href = '/login';
    } catch (error) {
      console.error('Error during logout:', error);
      // Additional error handling if needed
    }
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <a href="/">Home</a>
      </Menu.Item>
      <Menu.Item>
        <a href="/userbookings">Bookings</a>
      </Menu.Item>
      <Menu.Item>
        <a href="/admin">Admin</a>
      </Menu.Item>
      <Menu.Item onClick={handleLogout}>
        <span style={{ color: 'blue' }}>Logout</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <div className="header bs1">
        <Row gutter={16} justify="center">
          <Col lg={20} sm={24} xs={24}>
            <div className="d-flex justify-content-between">
              <h1>
                <b>
                  <Link to="/" style={{ color: 'blue', textDecoration: 'none' }}>
                    RenterKRD
                  </Link>
                </b>
              </h1>

              <Dropdown overlay={menu} placement="bottomCenter">
                <Button style={{ color: 'blue' }}>{user?.username}</Button>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </div>

      <div className="content">{props.children}</div>

      <div className="footer text-center">
        <hr />
        {/* Your footer content */}
      </div>
    </div>
  );
}

export default DefaultLayout;
