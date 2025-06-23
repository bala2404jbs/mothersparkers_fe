import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Card, 
  Table, 
  Button, 
  Select, 
  DatePicker, 
  Space, 
  Tag, 
  Typography, 
  Row, 
  Col, 
  Statistic, 
  Input,
  Checkbox,
  notification,
  Tooltip
} from "antd";
import { 
  DownloadOutlined, 
  FileTextOutlined, 
  ShoppingCartOutlined,
  CalendarOutlined,
  DollarOutlined,
  FilterOutlined,
  SearchOutlined
} from "@ant-design/icons";
import { PriceChart } from "@/components/charts/price-chart";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import { mockVolumeData } from "@/lib/mock-data";
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

export default function Purchases() {
  const [selectedSupplier, setSelectedSupplier] = useState("all");
  const [dateRange, setDateRange] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [purchaseTypes, setPurchaseTypes] = useState(["contract", "spot"]);

  const { data: suppliers } = useQuery({
    queryKey: ["suppliers"],
  });

  const { data: purchaseOrders } = useQuery({
    queryKey: ["purchase-orders"],
  });

  const handleExport = (format) => {
    notification.success({
      message: 'Export Started',
      description: `Exporting data as ${format.toUpperCase()}...`,
      placement: 'topRight',
    });
  };

  const formatAmount = (amount) => {
    return `$${parseInt(amount).toLocaleString()}`;
  };

  const totalOrders = purchaseOrders?.length || 0;
  const totalValue = purchaseOrders?.reduce((sum, order) => sum + parseInt(order.amount), 0) || 0;
  const avgOrderValue = totalOrders > 0 ? totalValue / totalOrders : 0;

  const columns = [
    {
      title: 'PO Number',
      dataIndex: 'poNumber',
      key: 'poNumber',
      render: (text) => (
        <Text strong style={{ color: 'var(--mp-blue)' }}>
          {text}
        </Text>
      ),
    },
    {
      title: 'Supplier',
      dataIndex: 'supplierId',
      key: 'supplier',
      render: (supplierId) => {
        const supplier = suppliers?.find(s => s.id === supplierId);
        return supplier?.name || "Unknown";
      },
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => (
        <Text strong>{formatAmount(amount)}</Text>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'orderDate',
      key: 'date',
      render: (date) => dayjs(date).format('MMM DD, YYYY'),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={type === 'contract' ? 'blue' : 'green'}>
          {type?.toUpperCase()}
        </Tag>
      ),
    },
  ];

  return (
    <div className="fade-in">
      <div className="mb-4">
        <Title level={2} className="text-dark mb-2">
          <ShoppingCartOutlined className="me-2" style={{ color: 'var(--mp-blue)' }} />
          Purchase Operations
        </Title>
        <Text type="secondary" className="fs-6">
          Tracking procurement for 11+ billion cups annually
        </Text>
      </div>

      <Row gutter={[16, 16]} className="mb-4">
        <Col xs={12} sm={6}>
          <Card size="small" className="text-center">
            <Statistic
              title="Total Orders"
              value={totalOrders}
              valueStyle={{ color: 'var(--mp-blue)' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small" className="text-center">
            <Statistic
              title="Total Value"
              value={totalValue}
              valueStyle={{ color: 'var(--mp-success)' }}
              formatter={(value) => `$${(Number(value) / 1000000).toFixed(1)}M`}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small" className="text-center">
            <Statistic
              title="Avg Order Value"
              value={avgOrderValue}
              valueStyle={{ color: 'var(--mp-warning)' }}
              formatter={(value) => `$${Number(value).toLocaleString()}`}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small" className="text-center">
            <Statistic
              title="Active Suppliers"
              value={suppliers?.length || 0}
              valueStyle={{ color: 'var(--mp-blue)' }}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Recent Purchase Orders">
        <Table
          columns={columns}
          dataSource={purchaseOrders}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          size="small"
        />
      </Card>
    </div>
  );
}
