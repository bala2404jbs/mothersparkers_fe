import { Link, useLocation } from "wouter";
import { Menu, Badge } from "antd";
import type { MenuProps } from "antd";
import { 
  DashboardOutlined, 
  ShoppingCartOutlined, 
  LineChartOutlined, 
  BuildOutlined, 
  BulbOutlined, 
  BellOutlined 
} from "@ant-design/icons";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: DashboardOutlined, key: "dashboard" },
  { name: "AI Insights", href: "/insights", icon: BulbOutlined, key: "insights" },
  { name: 'Alert Intelligent', href: "/alerts", icon: BellOutlined, key: "alerts" },
  { name: "Purchase History", href: "/purchases", icon: ShoppingCartOutlined, key: "purchases" },
  { name: "Price Intelligence", href: "/prices", icon: LineChartOutlined, key: "prices" },
  { name: "Supplier Management", href: "/suppliers", icon: BuildOutlined, key: "suppliers" },
];

export function Sidebar() {
  const [location] = useLocation();

  const getCurrentKey = () => {
    const currentNav = navigation.find(item => item.href === location);
    return currentNav ? currentNav.key : 'dashboard';
  };

  const menuItems: MenuProps['items'] = navigation.map((item) => {
    const Icon = item.icon;
    
    return {
      key: item.key,
      icon: <Icon />,
      label: (
        <Link href={item.href} className="text-decoration-none">
          <div className="d-flex justify-content-between align-items-center w-100">
            <span>{item.name}</span>
          </div>
        </Link>
      ),
    };
  });

  return (
    <>
      <div 
        className="mp-gradient position-fixed shadow-lg"
        style={{ 
          width: '250px', 
          top: '90px',
          left: 0,
          bottom: 0,
          zIndex: 999,
          overflowY: 'auto',
          overflowX: 'hidden'
        }}
      >
        <div className="p-3">
          <Menu
            mode="inline"
            selectedKeys={[getCurrentKey()]}
            items={menuItems}
            style={{ 
              backgroundColor: 'transparent',
              border: 'none',
              color: 'white'
            }}
            theme="dark"
            className="custom-sidebar-menu"
          />
        </div>
      </div>
      
      <style>{`
        .custom-sidebar-menu .ant-menu-item-selected {
          background-color: rgba(255, 255, 255, 0.2) !important;
          color: white !important;
        }
        
        .custom-sidebar-menu .ant-menu-item:hover {
          background-color: rgba(255, 255, 255, 0.1) !important;
          color: white !important;
        }
        
        .custom-sidebar-menu .ant-menu-item {
          color: rgba(255, 255, 255, 0.9) !important;
          border-radius: 8px !important;
          margin: 4px 0 !important;
        }
        
        .custom-sidebar-menu .anticon {
          color: white !important;
        }
      `}</style>
    </>
  );
}
