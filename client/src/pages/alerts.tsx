import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

// Fetch summaries directly from the procurement summaries API
async function fetchSummaries() {
  const response = await fetch('https://h6q97gt0-8000.inc1.devtunnels.ms/api/procurement/procurement-news-analysis/');
  let data;
  try {
    data = await response.json();
  } catch (e) {
    // If not JSON, fallback
    return { summaries: ["Failed to parse API response."] };
  }
  // If error and raw_response present, surface it as a summary
  if (data && data.error && data.raw_response) {
    return { summaries: [data.raw_response] };
  }
  return data;
}

import { 
  Card, 
  Button, 
  Badge, 
  Typography, 
  Row, 
  Col, 
  Select,
  Space,
  List,
  Avatar,
  Tooltip,
  Switch,
  Table,
  Tag,
  Modal
} from "antd";
import { 
  BellOutlined, 
  AlertOutlined, 
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  SettingOutlined,
  FilterOutlined
} from "@ant-design/icons";
import { AlertItem } from "@/components/alert-item";

const { Title, Text } = Typography;
const { Option } = Select;

function getRandomRisk() {
  const risks = ["High", "Medium", "Low"];
  return risks[Math.floor(Math.random() * risks.length)];
}

function SummariesAlerts() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchSummaries().then(data => {
      if (data?.summaries?.length && data?.data?.length) {
        // Map summary and source by index
        const maxLen = Math.max(data.summaries.length, data.data.length);
        const mapped = Array.from({ length: maxLen }).map((_, idx) => ({
          source: data.data[idx]?.source || '-',
          summary: data.summaries[idx] || '-',
          published: '-',
          risk: getRandomRisk(),
        }));
        setAlerts(mapped);
      } else if (data?.summaries?.length) {
        setAlerts(data.summaries.map((summary: string) => ({
          source: '-',
          summary,
          published: '-',
          risk: getRandomRisk(),
        })));
      } else {
        setAlerts([]);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const columns = [
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "Summary",
      dataIndex: "summary",
      key: "summary",
      render: (text: string) => <span style={{ fontSize: '1.05rem' }}>{text}</span>,
    },

    {
      title: "Risk",
      dataIndex: "risk",
      key: "risk",
      render: (risk: string) => {
        let color = risk === 'High' ? 'red' : risk === 'Medium' ? 'orange' : 'green';
        return <Tag color={color}>{risk}</Tag>;
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={alerts.map((row: any, idx: number) => ({ ...row, key: idx }))}
      loading={loading}
      pagination={false}
      bordered
    />
  );
}


export default function Alerts() {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState("all");
  const alertTypeOptions = [
    { value: "commodity_price_fluctuation", label: "Commodity Price Fluctuation" },
    { value: "geopolitical_tensions", label: "Geopolitical Tensions" },
    { value: "logistics_delays", label: "Logistics Delays" },
    { value: "shipping_costs", label: "Shipping Costs" },
    { value: "freight_rates", label: "Freight Rates" },
    { value: "natural_disasters", label: "Natural Disasters" },
    { value: "labor_strikes", label: "Labor Strikes" },
    { value: "market_shortage", label: "Market Shortage" },
    { value: "procurement_fraud", label: "Procurement Fraud" },
    { value: "supplier_risk", label: "Supplier Risk" },
    { value: "global_demand_shift", label: "Global Demand Shift" },
    { value: "manufacturing_slowdown", label: "Manufacturing Slowdown" },
    { value: "regulatory_changes", label: "Regulatory Changes" },
  ];
  const ALL_TYPE_VALUE = "__all__";
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleTypeChange = (values: string[]) => {
    if (values.includes(ALL_TYPE_VALUE)) {
      // If Select All is checked, select all types
      if (selectedTypes.length === alertTypeOptions.length) {
        setSelectedTypes([]);
      } else {
        setSelectedTypes(alertTypeOptions.map(opt => opt.value));
      }
    } else {
      setSelectedTypes(values);
    }
  };

  const [showResolved, setShowResolved] = useState(false);

  const { data: alerts } = useQuery({
    queryKey: ["/api/alerts"],
  });

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <ExclamationCircleOutlined style={{ color: 'var(--mp-error)' }} />;
      case 'medium':
        return <AlertOutlined style={{ color: 'var(--mp-warning)' }} />;
      case 'low':
        return <InfoCircleOutlined style={{ color: 'var(--mp-blue)' }} />;
      default:
        return <InfoCircleOutlined />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'processing';
      default:
        return 'default';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'market_intelligence':
        return 'var(--mp-blue)';
      case 'supplier_risk':
        return 'var(--mp-error)';
      case 'price_volatility':
        return 'var(--mp-warning)';
      case 'contract_renewal':
        return 'var(--mp-success)';
      default:
        return 'var(--mp-blue)';
    }
  };

  const alertStats = [
    { title: "Active Alerts", value: 12, color: "var(--mp-error)" },
    { title: "Medium Priority", value: 8, color: "var(--mp-warning)" },
    { title: "Resolved Today", value: 5, color: "var(--mp-success)" },
    { title: "Monitoring", value: 23, color: "var(--mp-blue)" }
  ];

  const filteredAlerts = (alerts as any[])?.filter((alert: any) => {
    if (selectedPriority !== "all" && alert.priority !== selectedPriority) return false;
    if (selectedTypes.length > 0 && !selectedTypes.includes(alert.type)) return false;
    return true;
  }) || [];


  return (
    <div className="fade-in">
      {/* Header */}
      <div className="mb-4">
        <Title level={2} className="text-dark mb-2">
          <BellOutlined className="me-2" style={{ color: 'var(--mp-blue)' }} />
          Alert Intelligent
        </Title>
        <Text type="secondary" className="fs-6">
          Real-time monitoring and alerts for your global tea & coffee supply chain
        </Text>
      </div>

      {/* Filter Icon Button and Modal */}
      <div style={{ position: 'absolute', top: 24, right: 32, zIndex: 10 }}>
        <Button
          icon={<FilterOutlined />}
          shape="circle"
          size="large"
          onClick={() => setFilterModalVisible(true)}
          aria-label="Show Filters"
        />
      </div>
      <Modal
        title="Alert Filters"
        open={filterModalVisible}
        onCancel={() => setFilterModalVisible(false)}
        footer={null}
      >
        <Space direction="vertical" size="middle" className="w-100">
          <div>
            <Text strong className="d-block mb-2">Priority Level</Text>
            <Select
              value={selectedPriority}
              onChange={setSelectedPriority}
              className="w-100"
              placeholder="Select Priority"
            >
              <Option value="all">All Priorities</Option>
              <Option value="high">High Priority</Option>
              <Option value="medium">Medium Priority</Option>
              <Option value="low">Low Priority</Option>
            </Select>
          </div>

          <div>
            <Text strong className="d-block mb-2">Alert Type</Text>
            <Select
              mode="multiple"
              value={selectedTypes.length === alertTypeOptions.length ? [ALL_TYPE_VALUE, ...selectedTypes] : selectedTypes}
              onChange={handleTypeChange}
              className="w-100"
              placeholder="Select Type(s)"
              dropdownRender={menu => (
                <>
                  <Option value={ALL_TYPE_VALUE} style={{ fontWeight: 600, background: '#f5f5f5', borderBottom: '1px solid #e9e9e9', marginBottom: 2 }}>
                    {selectedTypes.length === alertTypeOptions.length ? "Deselect All" : "Select All"}
                  </Option>
                  <div style={{ borderBottom: '1px solid #e9e9e9', margin: '2px 0' }} />
                  {menu}
                </>
              )}
            >
              {/* Empty children, options handled in dropdownRender */}
              {alertTypeOptions.map(opt => (
                <Option key={opt.value} value={opt.value}>{opt.label}</Option>
              ))}
            </Select>
          </div>

          <Button type="primary" className="w-100 mt-2" onClick={() => setFilterModalVisible(false)}>
            Alert Settings
          </Button>
        </Space>
      </Modal>

      <Card className="h-100">
        <SummariesAlerts />
      </Card>
    </div>
  );
}