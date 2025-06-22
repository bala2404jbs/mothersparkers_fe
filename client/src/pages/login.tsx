import { useState } from "react";
import { useLocation } from "wouter";
import { Form, Input, Button, Card, Typography, notification, Row, Col } from "antd";
import { UserOutlined, LockOutlined, CoffeeOutlined } from "@ant-design/icons";
import { useAuth } from "@/hooks/use-auth";
import { login as loginApi, STATIC_CREDENTIALS } from "@/lib/auth";

import motherParkersSVG from "@assets/mothers_parkers_img.svg";
import socialMediaBackground from "@assets/social-media-image-2020.jpg";

const { Title, Text } = Typography;

export default function Login() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const [form] = Form.useForm();

  const handleSubmit = async (values: { username: string; password: string }) => {
    setIsLoading(true);

    try {
      const response = await loginApi(values.username, values.password);
      login(response.user);
      notification.success({
        message: 'Login Successful',
        description: 'Welcome to Mother Parkers Procurement Intelligence',
        placement: 'topRight',
      });
      setLocation("/dashboard");
    } catch (error) {
      notification.error({
        message: 'Login Failed',
        description: error instanceof Error ? error.message : 'Invalid credentials',
        placement: 'topRight',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${socialMediaBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div className="text-center mb-4 fade-in">
          <Title level={2} className="text-white mb-1 text-center" style={{ textShadow: 'rgba(0, 0, 0, 0.5) 2px 2px 4px', fontWeight: 700, fontSize: '2.2rem', whiteSpace: 'nowrap' }}>
            Procurement Intelligence Platform
          </Title>
          <Title level={4} className="text-white mb-0 text-center" style={{ textShadow: 'rgba(0, 0, 0, 0.5) 1px 1px 2px', fontWeight: 500, fontSize: '1.3rem' }}>
            Mother Parkers
          </Title>
          <span className="text-white d-block fs-6 text-center" style={{ textShadow: 'rgba(0, 0, 0, 0.5) 1px 1px 2px', marginTop: '0.15rem', display: 'block' }}>
            Tea & Coffee Inc.
          </span>
        </div>
        <Card 
          className="shadow-lg border-0 fade-in"
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            maxWidth: 420,
            margin: '0 auto'
          }}
        >
          <div className="p-4 w-100">
            <Form
              form={form}
              name="login"
              onFinish={handleSubmit}
              layout="vertical"
              size="large"
            >
              <Form.Item
                label={<Text strong>Username</Text>}
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input
                  prefix={<UserOutlined style={{ color: 'var(--mp-blue)' }} />}
                  placeholder="Enter username"
                  className="rounded-pill"
                />
              </Form.Item>
              <Form.Item
                label={<Text strong>Password</Text>}
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ color: 'var(--mp-blue)' }} />}
                  placeholder="Enter password"
                  className="rounded-pill"
                />
              </Form.Item>
              <Form.Item className="mb-3">
                <Button 
                  type="primary" 
                  htmlType="submit"
                  loading={isLoading}
                  block
                  size="large"
                  className="rounded-pill fw-bold"
                  style={{ 
                    backgroundColor: 'var(--mp-blue)',
                    borderColor: 'var(--mp-blue)',
                    height: '48px'
                  }}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Card>
        <div className="text-center mt-4">
          <Text className="text-white-50 small">
            <b> 2025 Mother Parkers Tea & Coffee Inc. All rights reserved.</b>
          </Text>
        </div>
      </div>
    </div>
  );
}
