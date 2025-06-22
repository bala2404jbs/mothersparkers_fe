import { CoffeeOutlined, UserOutlined, SafetyOutlined, LogoutOutlined } from "@ant-design/icons";
import { Button, Badge, Avatar, Dropdown, Space, type MenuProps } from "antd";
import { useAuth } from "@/hooks/use-auth";

import Mother_Parkers_Original_Logo_No_Tag_transparent from "@assets/Mother-Parkers-Original-Logo-No-Tag-transparent.png";
import Mother_Parkers_scaled_e1642693163670 from "@assets/Mother-Parkers-scaled-e1642693163670.jpg";

export function Header() {
  const { user, logout } = useAuth();

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: (
        <div className="d-flex align-items-center">
          <UserOutlined className="me-2" />
          Profile Settings
        </div>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: (
        <div className="d-flex align-items-center text-danger">
          <LogoutOutlined className="me-2" />
          Logout
        </div>
      ),
      onClick: logout,
    },
  ];

  return (
    <nav 
      className="navbar navbar-expand-lg navbar-light bg-white shadow-sm border-bottom position-fixed w-100"
      style={{ 
        top: 0, 
        left: 0, 
        zIndex: 1000,
        height: '90px',
        overflow: 'hidden'
      }}
    >
      <div className="container-fluid px-4" style={{ height: '90px', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div className="d-flex justify-content-between align-items-center w-100" style={{ minWidth: 0 }}>
          {/* Logo and Brand */}
          <div className="d-flex align-items-center" style={{ flex: '1 1 auto', minWidth: 0 }}>
            <div className="me-3 flex-shrink-0">
              <img 
                src={Mother_Parkers_scaled_e1642693163670} 
                alt="Mother Parkers Logo" 
                className="img-fluid"
                style={{ height: '36px', width: 'auto' }}
              />
            </div>
            <div style={{ minWidth: 0 }}>
              <h1 className="h4 fw-bold text-dark mb-0 text-truncate">Mother Parkers Tea & Coffee</h1>
              <small className="text-muted d-none d-md-block">Procurement Intelligence Platform</small>
            </div>
          </div>

          {/* User Actions */}
          <div className="d-flex align-items-center flex-shrink-0" style={{ marginLeft: '16px' }}>
            <Space size="small" wrap={false}>
              <div className="d-flex align-items-center">
                <SafetyOutlined className="text-success me-1" style={{ fontSize: '14px' }} />
                <span 
                  className="badge rounded-pill d-none d-lg-inline-block"
                  style={{ 
                    backgroundColor: '#10b981', 
                    fontSize: '10px',
                    padding: '4px 8px',
                    fontWeight: '500'
                  }}
                >
                  Procurement Manager
                </span>
                <span 
                  className="badge rounded-pill d-lg-none"
                  style={{ 
                    backgroundColor: '#10b981', 
                    fontSize: '10px',
                    padding: '4px 6px',
                    fontWeight: '500'
                  }}
                >
                  PM
                </span>
              </div>
              
              <Dropdown 
                menu={{ items: userMenuItems }} 
                placement="bottomRight"
                trigger={['click']}
                getPopupContainer={() => document.body}
              >
                <Button 
                  type="text" 
                  className="d-flex align-items-center"
                  style={{ 
                    height: '36px', 
                    padding: '4px 8px',
                    borderRadius: '6px'
                  }}
                >
                  <Avatar 
                    size={24}
                    icon={<UserOutlined />} 
                    className="me-2"
                    style={{ backgroundColor: '#f0f0f0', color: '#666' }}
                  />
                  <span className="text-dark d-none d-sm-inline">
                    {user?.username || "admin"}
                  </span>
                </Button>
              </Dropdown>
            </Space>
          </div>
        </div>
      </div>
    </nav>
  );
}
