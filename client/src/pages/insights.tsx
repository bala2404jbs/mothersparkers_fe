import { 
  Card, 
  Button, 
  Typography, 
  Row, 
  Col, 
  Progress,
  Space,
  Badge,
  Statistic
} from "antd";
import { 
  BulbOutlined, 
  AlertOutlined, 
  LineChartOutlined,
  RobotOutlined,
  ThunderboltOutlined
} from "@ant-design/icons";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { mockAITrendsData } from "@/lib/mock-data";

const { Title, Text } = Typography;

export default function Insights() {
  const recommendations = [
    {
      id: 1,
      type: "optimization",
      icon: <BulbOutlined style={{ color: 'var(--mp-blue)' }} />,
      title: "Colombian Coffee Volume Consolidation",
      description: "Consolidate Colombian Arabica orders to achieve 12% volume discount. Potential annual savings: $380,000 across 11+ billion cups",
      confidence: 89,
      color: "var(--mp-blue)",
      bgColor: "rgba(30, 58, 138, 0.1)"
    },
    {
      id: 2,
      type: "risk",
      icon: <AlertOutlined style={{ color: 'var(--mp-warning)' }} />,
      title: "Ceylon Tea Supply Chain Alert",
      description: "Monsoon patterns may affect Sri Lankan tea exports. Consider increasing Ceylon tea inventory by 20% to protect 2.5M daily cups",
      riskLevel: "Medium",
      color: "var(--mp-warning)",
      bgColor: "rgba(245, 158, 11, 0.1)"
    },
    {
      id: 3,
      type: "timing",
      icon: <LineChartOutlined style={{ color: 'var(--mp-success)' }} />,
      title: "Market Timing Opportunity",
      description: "Sugar prices predicted to drop 12% in next 30 days. Consider deferring planned sugar purchases to capture savings",
      savings: "$23,000",
      color: "var(--mp-success)",
      bgColor: "rgba(34, 197, 94, 0.1)"
    }
  ];

  const modelPerformance = [
    { name: "Price Forecasting", accuracy: 91, color: "var(--mp-success)" },
    { name: "Risk Assessment", accuracy: 84, color: "var(--mp-blue)" },
    { name: "Demand Planning", accuracy: 78, color: "var(--mp-warning)" },
  ];

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="mb-4">
        <Title level={2} className="text-dark mb-2">
          <RobotOutlined className="me-2" style={{ color: 'var(--mp-blue)' }} />
          AI-Powered Market Intelligence
        </Title>
        <Text type="secondary" className="fs-6">
          100+ years of tea & coffee expertise enhanced by AI for 11+ billion cups annually
        </Text>
      </div>

      <Row gutter={[24, 24]}>
        {/* AI Recommendations */}
        <Col xs={24} lg={16}>
          <Card
            title={
              <div className="d-flex align-items-center">
                <ThunderboltOutlined className="me-2" style={{ color: 'var(--mp-warning)' }} />
                <span>AI-Powered Recommendations</span>
              </div>
            }
          >
            <Space direction="vertical" size="large" className="w-100">
              {recommendations.map((rec) => (
                <Card 
                  key={rec.id} 
                  size="small"
                  style={{ 
                    backgroundColor: rec.bgColor,
                    border: `1px solid ${rec.color}33`
                  }}
                >
                  <div className="d-flex align-items-start gap-3">
                    <div 
                      className="d-flex align-items-center justify-content-center rounded-circle bg-white"
                      style={{ width: '40px', height: '40px', minWidth: '40px' }}
                    >
                      {rec.icon}
                    </div>
                    <div className="flex-grow-1">
                      <Title level={5} className="mb-2" style={{ color: rec.color }}>
                        {rec.title}
                      </Title>
                      <Text className="d-block mb-3" style={{ color: rec.color, opacity: 0.9 }}>
                        {rec.description}
                      </Text>
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                        <Space size="middle">
                          {rec.confidence && (
                            <Badge 
                              count={`${rec.confidence}% Confidence`} 
                              style={{ backgroundColor: rec.color, fontSize: '11px' }}
                            />
                          )}
                          {rec.riskLevel && (
                            <Badge 
                              count={`${rec.riskLevel} Risk`} 
                              style={{ backgroundColor: rec.color, fontSize: '11px' }}
                            />
                          )}
                          {rec.savings && (
                            <Badge 
                              count={`${rec.savings} Savings`} 
                              style={{ backgroundColor: rec.color, fontSize: '11px' }}
                            />
                          )}
                        </Space>
                        <Space size="small">
                          <Button 
                            type="primary" 
                            size="small"
                            style={{ backgroundColor: rec.color, borderColor: rec.color }}
                          >
                            {rec.type === "optimization" ? "Implement" : 
                             rec.type === "risk" ? "Take Action" : "Schedule Purchase"}
                          </Button>
                          <Button 
                            type="link" 
                            size="small"
                            style={{ color: rec.color }}
                          >
                            {rec.type === "risk" ? "Monitor" : "View Details"}
                          </Button>
                        </Space>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </Space>
          </Card>
        </Col>

        {/* AI Performance Metrics */}
        <Col xs={24} lg={8}>
          <Card
            title={
              <div className="d-flex align-items-center">
                <RobotOutlined className="me-2" style={{ color: 'var(--mp-blue)' }} />
                <span>AI Model Performance</span>
              </div>
            }
            className="h-100"
          >
            <div className="text-center mb-4">
              <Progress
                type="circle"
                percent={87}
                size={120}
                strokeColor="var(--mp-blue)"
                format={(percent) => (
                  <div>
                    <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--mp-blue)' }}>
                      {percent}%
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      Accuracy
                    </div>
                  </div>
                )}
              />
            </div>
            
            <Space direction="vertical" size="middle" className="w-100">
              {modelPerformance.map((metric) => (
                <div key={metric.name} className="d-flex justify-content-between align-items-center">
                  <Text className="small">{metric.name}</Text>
                  <div className="d-flex align-items-center gap-2">
                    <Progress 
                      percent={metric.accuracy} 
                      strokeColor={metric.color}
                      showInfo={false}
                      size="small"
                      style={{ width: '60px' }}
                    />
                    <Text strong className="small" style={{ color: metric.color, minWidth: '35px' }}>
                      {metric.accuracy}%
                    </Text>
                  </div>
                </div>
              ))}
            </Space>
            
            <div className="border-top pt-3 mt-4">
              <Text type="secondary" className="small d-block">Last updated: 2 hours ago</Text>
              <Text type="secondary" className="small d-block">Training data: 5 years</Text>
            </div>
          </Card>
        </Col>

        {/* Trend Analysis */}
        <Col xs={24}>
          <Card
            title={
              <div className="d-flex align-items-center">
                <LineChartOutlined className="me-2" style={{ color: 'var(--mp-success)' }} />
                <span>AI-Generated Market Trends Analysis</span>
              </div>
            }
          >
            <div style={{ height: '350px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockAITrendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="optimization"
                    stroke="var(--mp-success)"
                    strokeWidth={3}
                    name="Spend Optimization (%)"
                  />
                  <Line
                    type="monotone"
                    dataKey="riskReduction"
                    stroke="var(--mp-blue)"
                    strokeWidth={3}
                    name="Risk Reduction (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-3">
              <Text type="secondary" className="small">
                Mother Parkers AI Intelligence • Optimizing 11+ billion cups annually
              </Text>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
