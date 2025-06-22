import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Card, 
  Button, 
  Badge, 
  Typography, 
  Row, 
  Col, 
  Statistic, 
  Progress,
  Space,
  Empty,
  List,
  Avatar,
  Tooltip
} from "antd";
import { 
  PlusOutlined, 
  EditOutlined, 
  FileTextOutlined,
  BuildOutlined,
  StarOutlined,
  EnvironmentOutlined,
  TrophyOutlined,
  SafetyOutlined
} from "@ant-design/icons";

const { Title, Text } = Typography;

export default function Suppliers() {
  const [selectedSupplierId, setSelectedSupplierId] = useState<number | null>(null);

  const { data: suppliersRaw } = useQuery({
    queryKey: ["/api/suppliers"],
  });
  const suppliers: any[] = Array.isArray(suppliersRaw) ? suppliersRaw : [];

  // Auto-select first supplier when loaded
  React.useEffect(() => {
    if (!selectedSupplierId && suppliers.length > 0) {
      setSelectedSupplierId(suppliers[0].id);
    }
  }, [suppliers, selectedSupplierId]);

  const selectedSupplier = suppliers.find((s: any) => s.id === selectedSupplierId);

  const getPerformanceMetrics = (supplier: any) => [
    { name: "Quality Score", value: 96, color: "var(--mp-success)" },
    { name: "Cost Efficiency", value: 92, color: "var(--mp-blue)" },
    { name: "Reliability", value: 98, color: "var(--mp-success)" },
  ];

  const getRiskAssessment = (supplier: any) => [
    { name: "Financial Risk", level: "Low", color: "success" as const },
    { name: "Geographic Risk", level: "Medium", color: "warning" as const },
    { name: "Supply Chain Risk", level: "Low", color: "success" as const },
    { name: "Compliance Risk", level: "Low", color: "success" as const },
  ];

  const formatCurrency = (amount: string) => {
    return `$${(parseFloat(amount) / 1000000).toFixed(1)}M`;
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'success' as const : 'warning' as const;
  };

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="mb-4">
        <Title level={2} className="text-dark mb-2">
          <BuildOutlined className="me-2" style={{ color: 'var(--mp-blue)' }} />
          Global Supplier Network
        </Title>
        <Text type="secondary" className="fs-6">
          Managing relationships with premium tea & coffee suppliers worldwide - Family-owned since 1912
        </Text>
      </div>

      <Row gutter={[24, 24]}>
        {/* Supplier List */}
        <Col xs={24} lg={8}>
          <Card
            title={
              <div className="d-flex justify-content-between align-items-center w-100">
                <span>Supplier Directory</span>
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  size="small"
                  style={{ backgroundColor: 'var(--mp-blue)', borderColor: 'var(--mp-blue)' }}
                >
                  Add New
                </Button>
              </div>
            }
            className="h-100"
          >
            <List
              dataSource={suppliers as any[]}
              renderItem={(supplier: any) => (
                <List.Item
                  className={`supplier-card ${selectedSupplierId === supplier.id ? 'supplier-card-active' : ''}`}
                  onClick={() => setSelectedSupplierId(supplier.id)}
                  style={{ cursor: 'pointer', padding: '12px', marginBottom: '8px' }}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar 
                        size="large" 
                        style={{ 
                          backgroundColor: 'var(--mp-blue)',
                          fontSize: '16px'
                        }}
                      >
                        {supplier.name.charAt(0)}
                      </Avatar>
                    }
                    title={
                      <div className="d-flex justify-content-between align-items-center">
                        <Text strong>{supplier.name}</Text>
                        <Badge 
                          status={getStatusColor(supplier.status)} 
                          text={supplier.status === 'active' ? 'Active' : 'At Risk'}
                        />
                      </div>
                    }
                    description={
                      <Space direction="vertical" size={2}>
                        <Text type="secondary" className="small">{supplier.category}</Text>
                        <div className="d-flex align-items-center gap-1">
                          <EnvironmentOutlined style={{ fontSize: '12px' }} />
                          <Text type="secondary" className="small">{supplier.location}</Text>
                        </div>
                        <div className="d-flex align-items-center gap-1">
                          <StarOutlined style={{ fontSize: '12px', color: 'var(--mp-warning)' }} />
                          <Text strong className="small">{supplier.performanceScore}</Text>
                        </div>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Supplier Details */}
        <Col xs={24} lg={16}>
          {selectedSupplier ? (
            <Card className="h-100">
              <div className="p-3">
                {/* Header Section */}
                <div className="d-flex justify-content-between align-items-start mb-4">
                  <div>
                    <Title level={3} className="mb-1">{selectedSupplier.name}</Title>
                    <Text type="secondary" className="d-block mb-2">{selectedSupplier.category}</Text>
                    <Space size="middle">
                      <Badge 
                        status={getStatusColor(selectedSupplier.status)}
                        text={`${selectedSupplier.status === 'active' ? 'Active' : 'At Risk'} Since 2018`}
                      />
                      <div className="d-flex align-items-center gap-1">
                        <EnvironmentOutlined />
                        <Text>{selectedSupplier.location}</Text>
                      </div>
                    </Space>
                  </div>
                  <div className="text-center">
                    <Statistic
                      title="Performance Score"
                      value={selectedSupplier.performanceScore}
                      valueStyle={{ color: 'var(--mp-success)', fontSize: '2rem' }}
                      suffix={<TrophyOutlined style={{ color: 'var(--mp-warning)' }} />}
                    />
                  </div>
                </div>

                {/* Key Metrics */}
                <Row gutter={[16, 16]} className="mb-4">
                  <Col xs={12} sm={6}>
                    <Card size="small" className="text-center">
                      <Statistic
                        title="Total Spend"
                        value={formatCurrency(selectedSupplier.totalSpend)}
                        valueStyle={{ color: 'var(--mp-blue)' }}
                      />
                    </Card>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Card size="small" className="text-center">
                      <Statistic
                        title="On-Time Delivery"
                        value={selectedSupplier.onTimeDelivery}
                        suffix="%"
                        valueStyle={{ color: 'var(--mp-success)' }}
                      />
                    </Card>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Card size="small" className="text-center">
                      <Statistic
                        title="Quality Rating"
                        value={selectedSupplier.qualityRating}
                        valueStyle={{ color: 'var(--mp-blue)' }}
                      />
                    </Card>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Card size="small" className="text-center">
                      <Statistic
                        title="Active Orders"
                        value={selectedSupplier.activeOrders}
                        valueStyle={{ color: 'var(--mp-warning)' }}
                      />
                    </Card>
                  </Col>
                </Row>

                <Row gutter={[24, 24]}>
                  {/* Performance Metrics */}
                  <Col xs={24} lg={12}>
                    <Card 
                      size="small" 
                      title={
                        <div className="d-flex align-items-center">
                          <TrophyOutlined className="me-2" style={{ color: 'var(--mp-success)' }} />
                          <span>Performance Metrics</span>
                        </div>
                      }
                    >
                      <Space direction="vertical" size="middle" className="w-100">
                        {getPerformanceMetrics(selectedSupplier).map((metric) => (
                          <div key={metric.name}>
                            <div className="d-flex justify-content-between align-items-center mb-1">
                              <Text className="small">{metric.name}</Text>
                              <Text strong className="small" style={{ color: metric.color }}>
                                {metric.value}%
                              </Text>
                            </div>
                            <Progress 
                              percent={metric.value} 
                              strokeColor={metric.color}
                              showInfo={false}
                              size="small"
                            />
                          </div>
                        ))}
                      </Space>
                    </Card>
                  </Col>

                  {/* Risk Assessment */}
                  <Col xs={24} lg={12}>
                    <Card 
                      size="small" 
                      title={
                        <div className="d-flex align-items-center">
                          <SafetyOutlined className="me-2" style={{ color: 'var(--mp-warning)' }} />
                          <span>Risk Assessment</span>
                        </div>
                      }
                    >
                      <Space direction="vertical" size="middle" className="w-100">
                        {getRiskAssessment(selectedSupplier).map((risk) => (
                          <div key={risk.name} className="d-flex justify-content-between align-items-center">
                            <Text className="small">{risk.name}</Text>
                            <Badge status={risk.color} text={risk.level} />
                          </div>
                        ))}
                      </Space>
                    </Card>
                  </Col>
                </Row>

                {/* Action Buttons */}
                <div className="d-flex justify-content-end gap-2 mt-4">
                  <Tooltip title="Edit supplier profile">
                    <Button icon={<EditOutlined />}>
                      Edit Profile
                    </Button>
                  </Tooltip>
                  <Tooltip title="View supplier contracts">
                    <Button 
                      type="primary" 
                      icon={<FileTextOutlined />}
                      style={{ backgroundColor: 'var(--mp-blue)', borderColor: 'var(--mp-blue)' }}
                    >
                      View Contracts
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="h-100">
              <div className="d-flex align-items-center justify-content-center h-100" style={{ minHeight: '400px' }}>
                <Empty
                  description={
                    <Text type="secondary">Select a supplier to view details</Text>
                  }
                />
              </div>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
}
