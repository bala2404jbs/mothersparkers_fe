import { ReactNode } from "react";
import { Layout } from "antd";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

const { Content } = Layout;

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <Layout style={{ minHeight: '100vh', overflow: 'hidden' }}>
      <Header />
      <Layout style={{ marginTop: '90px', height: 'calc(100vh - 90px)' }}>
        <Sidebar />
        <Content 
          style={{ 
            marginLeft: '250px',
            backgroundColor: '#f8fafc',
            height: '100%',
            overflowY: 'auto',
            overflowX: 'hidden',
            position: 'relative'
          }}
        >
          <div className="container-fluid p-4" style={{ minHeight: '100%' }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
