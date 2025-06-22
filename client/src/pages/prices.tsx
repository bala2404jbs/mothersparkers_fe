import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Card, 
  Select, 
  Checkbox, 
  Typography, 
  Row, 
  Col, 
  Statistic, 
  Space,
  Tag,
  Timeline,
  Badge
} from "antd";
import { 
  LineChartOutlined, 
  DollarOutlined, 
  ArrowUpOutlined,
  ArrowDownOutlined,
  FilterOutlined,
  GlobalOutlined,
  FileTextOutlined
} from "@ant-design/icons";
import { MarketChart } from "@/components/charts/market-chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { mockFXData, mockNewsData } from "@/lib/mock-data";

const { Title, Text } = Typography;
const { Option } = Select;

export default function Prices() {
  const [selectedCommodity, setSelectedCommodity] = useState("all");
  const [selectedSource, setSelectedSource] = useState("all");
  const [dataSources, setDataSources] = useState(["ice", "api"]);

  const { data: commodities } = useQuery({
    queryKey: ["/api/commodities"],
  });

  const marketStats = [
    {
      title: "Current Price",
      value: 315.05,
      prefix: "$",
      suffix: "",
      change: -2.25,
      color: "var(--mp-error)"
    },
    {
      title: "Volume",
      value: 18800,
      prefix: "",
      suffix: "",
      change: null,
      color: "var(--mp-blue)"
    },
    {
      title: "AI Confidence",
      value: 82,
      prefix: "",
      suffix: "%",
      change: null,
      color: "var(--mp-success)"
    },
    {
      title: "Monthly Trend",
      value: -8.2,
      prefix: "",
      suffix: "%",
      change: null,
      color: "var(--mp-warning)"
    }
  ];

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="mb-4">
        <Title level={2} className="text-dark mb-2">
          <LineChartOutlined className="me-2" style={{ color: 'var(--mp-blue)' }} />
          Global Market Intelligence
        </Title>
        <Text type="secondary" className="fs-6">
          Real-time pricing for tea & coffee commodities - Supporting 11+ billion cups with 100+ years expertise
        </Text>
      </div>

      <Row gutter={[24, 24]}>
        {/* Market Filters */}
        <Col xs={24} lg={6}>
          <Card 
            title={
              <div className="d-flex align-items-center">
                <FilterOutlined className="me-2" />
                <span>Market Filters</span>
              </div>
            }
            className="h-100"
          >
            <Space direction="vertical" size="middle" className="w-100">
              <div>
                <Text strong className="d-block mb-2">Commodity</Text>
                <Select
                  value={selectedCommodity}
                  onChange={setSelectedCommodity}
                  className="w-100"
                  placeholder="Select Commodity"
                >
                  <Option value="all">All Commodities</Option>
                  <Option value="coffee">Coffee</Option>
                  <Option value="tea">Tea</Option>
                  <Option value="sugar">Sugar</Option>
                  <Option value="cocoa">Cocoa</Option>
                </Select>
              </div>

              <div>
                <Text strong className="d-block mb-2">Date Range</Text>
                <Select
                  defaultValue="30d"
                  className="w-100"
                  placeholder="Select Date Range"
                >
                  <Option value="30d">Last 30 Days</Option>
                  <Option value="90d">Last 90 Days</Option>
                  <Option value="6m">Last 6 Months</Option>
                  <Option value="1y">Last Year</Option>
                </Select>
              </div>

              <div>
                <Text strong className="d-block mb-2">Data Source</Text>
                <Checkbox.Group
                  value={dataSources}
                  onChange={setDataSources}
                  className="w-100"
                >
                  <div className="d-flex flex-column gap-2">
                    <Checkbox value="ice">ICE Futures</Checkbox>
                    <Checkbox value="api">Market API</Checkbox>
                  </div>
                </Checkbox.Group>
              </div>
            </Space>
          </Card>
        </Col>

        {/* Main Content */}
        <Col xs={24} lg={18}>
          <Space direction="vertical" size="large" className="w-100">
            {/* Market Statistics */}
            <Row gutter={[16, 16]}>
              {marketStats.map((stat, index) => (
                <Col xs={12} lg={6} key={index}>
                  <Card className="text-center">
                    <Statistic
                      title={stat.title}
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      valueStyle={{ color: stat.color }}
                      formatter={(value) => {
                        if (stat.title === "Volume") {
                          return `${(Number(value) / 1000).toFixed(1)}K`;
                        }
                        return value;
                      }}
                    />
                    {stat.change !== null && (
                      <div className="mt-2">
                        <Tag color={stat.change > 0 ? 'green' : 'red'}>
                          {stat.change > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                          {Math.abs(stat.change)}%
                        </Tag>
                      </div>
                    )}
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Price Trends Chart */}
            <Card
              title={
                <div className="d-flex justify-content-between align-items-center w-100">
                  <span>Coffee Market Analysis - Real Data</span>
                  <div className="d-flex gap-3">
                    <div className="d-flex align-items-center gap-2">
                      <div 
                        className="rounded-circle" 
                        style={{ width: '12px', height: '12px', backgroundColor: 'var(--mp-blue)' }}
                      ></div>
                      <Text className="small">Historical Prices</Text>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <div 
                        className="rounded-circle" 
                        style={{ width: '12px', height: '12px', backgroundColor: 'var(--mp-success)' }}
                      ></div>
                      <Text className="small">AI Predictions</Text>
                    </div>
                  </div>
                </div>
              }
            >
              <div style={{ height: '400px' }}>
                <MarketChart />
              </div>
              <div className="text-center mt-3">
                <Text type="secondary" className="small">
                  Mother Parkers Market Intelligence • Real-time data from global coffee exchanges
                </Text>
              </div>
            </Card>

            <Row gutter={[24, 24]}>
              {/* FX Trends */}
              <Col xs={24} lg={12}>
                <Card
                  title={
                    <div className="d-flex align-items-center">
                      <GlobalOutlined className="me-2" style={{ color: 'var(--mp-warning)' }} />
                      <span>Currency Exchange Trends</span>
                    </div>
                  }
                  className="h-100"
                >
                  <div style={{ height: '250px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mockFXData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={['dataMin - 0.1', 'dataMax + 0.1']} />
                        <Tooltip formatter={(value: number) => [`${value}`, "USD/BRL"]} />
                        <Line 
                          type="monotone" 
                          dataKey="rate" 
                          stroke="var(--mp-warning)" 
                          strokeWidth={2}
                          name="USD/BRL"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </Col>

              {/* Market News */}
              <Col xs={24} lg={12}>
                <Card
                  title={
                    <div className="d-flex align-items-center">
                      <FileTextOutlined className="me-2" style={{ color: 'var(--mp-blue)' }} />
                      <span>Market News Feed</span>
                    </div>
                  }
                  className="h-100"
                >
                  <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    <Timeline
                      items={mockNewsData.map((news) => ({
                        color: news.priority === 'high' ? 'red' : 
                               news.priority === 'medium' ? 'blue' : 'green',
                        children: (
                          <div className="pb-3">
                            <Title level={5} className="mb-1 cursor-pointer" style={{ 
                              color: 'var(--mp-blue)',
                              fontSize: '14px',
                              lineHeight: '1.4'
                            }}>
                              {news.headline}
                            </Title>
                            <Text className="small d-block mb-2" style={{ color: '#666' }}>
                              {news.summary}
                            </Text>
                            <div className="d-flex justify-content-between align-items-center">
                              <Badge 
                                count={news.priority.toUpperCase()} 
                                style={{ 
                                  backgroundColor: news.priority === 'high' ? 'var(--mp-error)' : 
                                                   news.priority === 'medium' ? 'var(--mp-blue)' : 'var(--mp-success)',
                                  fontSize: '10px'
                                }}
                              />
                              <div className="d-flex gap-2">
                                <Text type="secondary" className="small">{news.source}</Text>
                                <Text type="secondary" className="small">{news.time}</Text>
                              </div>
                            </div>
                          </div>
                        )
                      }))}
                    />
                  </div>
                </Card>
              </Col>
            </Row>
          </Space>
        </Col>
      </Row>
    </div>
  );
}
