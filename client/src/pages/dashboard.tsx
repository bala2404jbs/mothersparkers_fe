import { useState, useEffect } from "react";
import { Card, Button, Badge, Tag, Empty, Typography, Row, Col, Timeline, List, Spin, notification } from "antd";
import { FileTextOutlined, LineChartOutlined, ClockCircleOutlined, LinkOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

// API Types
interface SummaryData {
  id: string;
  source: string;
}

interface SummariesResponse {
  summaries: string[];
  data: SummaryData[];
}

interface ArticleData {
  id: string;
  link: string;
  title: string;
  source: string;
  published: string;
  description: string;
}

interface DetailedArticle {
  id: number;
  article_data: ArticleData;
  fetch_date: { date: string };
  time_range_start: { date: string };
  time_range_end: { date: string };
}

// Fallback mock data
const mockSummariesData: SummariesResponse = {
    "summaries": [
      "FoodNavigator reports a fall in coffee prices following a sharp rise, which may impact procurement plans. It's advisable to monitor the situation and adjust procurement strategies accordingly.",
      "The Perfect Daily Grind article investigates where money goes amid high coffee prices. This could be crucial in understanding the supply chain and identifying potential risks or inefficiencies.",
      "Eurasia Review discusses Starbucks' presence in Vietnam amid coffee wars. This may influence strategic sourcing decisions and necessitate risk assessment in areas with geopolitical tensions.",
      "Star Tribune notes that high bean costs are impacting Brooklyn Center coffee brewery Bizzy. This indicates rising coffee prices, which might necessitate adjustments in procurement budget or sourcing strategy.",
      "TradingView's report on J M SMUCKER Co may contain useful insights for procurement, especially regarding supplier performance and market conditions."
    ],
    "data": [
      {
        "id": "7f6313ce-0e7f-4e6d-a007-77e43f308b8b",
        "source": "FoodNavigator.com"
      },
      {
        "id": "810fba81-f54b-45f6-962b-15c77da7e91e",
        "source": "Perfect Daily Grind"
      },
      {
        "id": "564e17c0-76f3-429b-bf7e-4076435b3a1d",
        "source": "Eurasia Review"
      },
      {
        "id": "c10719f4-8d9f-4a8a-b0a7-962f3b4e469e",
        "source": "Star Tribune"
      },
      {
        "id": "c73dd116-ba99-4f1f-915c-9f1444a43587",
        "source": "TradingView"
      }
    ]
  };

const mockDetailedData: DetailedArticle[] = [
  {
    "id": 209,
    "article_data": {
      "id": "79ef667e-e386-4803-afa9-33fb67a35383",
      "link": "https://news.google.com/rss/articles/CBMihAFBVV95cUxNZDdBZTFwcmhzVGRSRUdNc2RTR0xPQkEtbHVNWWhRb0lYUjVqekFNalFMNklFYmlJemVDemw4M3BGYkt0RE9HemlLaTB2Rlk0Y19BMFZGWkhEUy1acUZDQ1MwZjdQQnpjdVE1WWxhWER5Zjh3d0VfLUozMHZXWlh0c2FULWo?oc=5",
      "title": "High coffee prices: Where does the money actually go? - Perfect Daily Grind",
      "source": "Perfect Daily Grind",
      "published": "Wed, 18 Jun 2025 05:40:08 GMT",
      "description": "Analysis of coffee price distribution across the supply chain"
    },
    "fetch_date": {
      "date": "2025-06-21 17:09:02"
    },
    "time_range_start": {
      "date": "2025-06-11"
    },
    "time_range_end": {
      "date": "2025-06-21"
    }
  },
  {
    "id": 210,
    "article_data": {
      "id": "8e1adef7-d0b9-4446-b584-3fff4f1846a0",
      "link": "https://news.google.com/rss/articles/CBMinwFBVV95cUxOdEhQZnlrTl9oTTBlNHBXVHdfZjFsa18tQXJ1b2NGMFJMblpiUkYzYUQyem1PSzljVFN1RElhRUl1VGRET09YWVZMRHY3cC1uZ3RxQlJtM0g2Q2xNaDVCd20tVkl6ZlJaQWhiZ184Q194YXFlR1p0SE45ejRQbS1GVE82QWs5UHpUN09JSjJiUC1HSUg2VXc0ZHE5XzN5R1k?oc=5",
      "title": "Coffee prices fall following sharp rise - FoodNavigator.com",
      "source": "FoodNavigator.com",
      "published": "Tue, 17 Jun 2025 14:21:31 GMT",
      "description": "Market analysis of recent coffee price movements"
    },
    "fetch_date": {
      "date": "2025-06-21 17:09:02"
    },
    "time_range_start": {
      "date": "2025-06-11"
    },
    "time_range_end": {
      "date": "2025-06-21"
    }
  }
];

// API Functions with fallback
const fetchProcurementSummaries = async (): Promise<SummariesResponse> => {
  try {
    const response = await fetch('https://localhost:8000/api/procurement/procurement-news-analysis/');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.warn('API returned non-JSON response, using fallback data');
      return mockSummariesData;
    }
    
    return await response.json();
  } catch (error) {
    console.warn('Failed to fetch from API, using fallback data:', error);
    return mockSummariesData;
  }
};

const fetchCommodityNews = async (uuids: string[]): Promise<DetailedArticle[]> => {
  try {
    const response = await fetch('https://localhost:8000/api/procurement/commodity-news/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uuids }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.warn('API returned non-JSON response, using fallback data');
      return mockDetailedData;
    }
    
    return await response.json();
  } catch (error) {
    console.warn('Failed to fetch commodity news from API, using fallback data:', error);
    return mockDetailedData;
  }
};

export default function Dashboard() {
  return (
    <div className="fade-in">
      <div className="mb-4">
        <Title level={2} className="text-dark mb-2">
          Procurement Intelligence Dashboard
        </Title>
        <Text type="secondary" className="fs-6">
          Managing procurement for 11+ billion cups annually - Over 100 years of tea & coffee excellence
        </Text>
      </div>

      {/* Market Intelligence Containers */}
      <MarketIntelligenceContainers />
    </div>
  );
}

// Market Intelligence Component with real API integration
function MarketIntelligenceContainers() {
  // Always show details for all summaries
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [summariesData, setSummariesData] = useState<SummariesResponse | null>(null);
  const [detailedData, setDetailedData] = useState<DetailedArticle[]>([]);
  const [loadingSummaries, setLoadingSummaries] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);

  // Fetch summaries and details for all on component mount
  useEffect(() => {
    const loadSummariesAndDetails = async () => {
      try {
        setLoadingSummaries(true);
        const data = await fetchProcurementSummaries();
        setSummariesData(data);
        if (data && data.data && data.data.length > 0) {
          const ids = data.data.map(d => d.id).filter(Boolean);
          setSelectedIds(ids);
          setLoadingDetails(true);
          const details = await fetchCommodityNews(ids);
          setDetailedData(details);
        }
      } catch (error) {
        // Fallback data is handled in the API function, so just log the error
        console.error('Error fetching summaries or details:', error);
        setSummariesData(mockSummariesData);
        setDetailedData(mockDetailedData);
      } finally {
        setLoadingSummaries(false);
        setLoadingDetails(false);
      }
    };
    loadSummariesAndDetails();
  }, []);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Less than 1 hour ago";
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Row gutter={[24, 24]}>
      {/* Container 1: Market Summaries */}
      <Col xs={24} lg={16}>
        <Card
          title={
            <div className="d-flex align-items-center">
              <FileTextOutlined className="me-2" style={{ color: 'var(--mp-blue)' }} />
              <span>Market Intelligence Summaries</span>
            </div>
          }
          extra={
            <Badge 
              count={summariesData ? `${summariesData.summaries.length} Reports` : '0 Reports'}
              style={{ backgroundColor: '#e3f2fd', color: '#1976d2' }}
            />
          }
          className="h-100"
        >
          {loadingSummaries ? (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
              <Spin size="large" />
      </div>
          ) : summariesData ? (
            <div className="d-flex flex-column gap-3">
              {summariesData.summaries.map((summary, index) => {
                const dataItem = summariesData.data[index];
              return (
                  <div key={index} className="alert-low p-3 rounded">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div className="d-flex align-items-center gap-2">
                        <Tag color="blue" className="mb-0">
                          {dataItem?.source || 'Unknown Source'}
                        </Tag>
                        <Text type="secondary" className="small">
                          <ClockCircleOutlined className="me-1" />
                          Recent
                        </Text>
                    </div>
        
                  </div>
                    <Paragraph className="mb-0" style={{ lineHeight: '1.5', fontSize: '1.1rem' }}>
                      {summary}
                    </Paragraph>
                </div>
              );
            })}
              
              <div className="pt-3 border-top">
    
            </div>
            </div>
          ) : (
            <Empty description="No summaries available" />
          )}
        </Card>
      </Col>

        {/* Container 2: Detailed Information */}
      <Col xs={24} lg={8}>
        <Card
          title={
            <div className="d-flex align-items-center">
              <LineChartOutlined className="me-2" style={{ color: 'var(--mp-success)' }} />
              <span>Detailed Analysis</span>
            </div>
          }
          className="h-100"
        >
            {loadingDetails ? (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
              <Spin size="large" />
              </div>
          ) : detailedData.length > 0 ? (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Title level={5} className="mb-0">Analysis Details</Title>

                </div>
                
              <div className="d-flex flex-column gap-3">
                {detailedData.map((article) => (
                  <div key={article.id} className="border rounded p-3">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <Tag color="green" className="mb-0">
                        {article.article_data.source}
                      </Tag>
                      <Text type="secondary" className="small">
                        {formatDate(article.article_data.published)}
                      </Text>
                    </div>
                    
                    <Title level={5} className="mb-2">
                      {article.article_data.title}
                    </Title>
                    
                    <Paragraph className="mb-2 small text-muted">
                      Fetched: {formatDate(article.fetch_date.date)}
                    </Paragraph>
                    
                    <Paragraph className="mb-2 small text-muted">
                      Analysis Period: {formatDate(article.time_range_start.date)} to {formatDate(article.time_range_end.date)}
                    </Paragraph>
                    
                    <div className="d-flex justify-content-end">
                      <Button 
                        size="small" 
                        type="link" 
                        icon={<LinkOutlined />}
                        href={article.article_data.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Read Full Article
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Empty description="No detailed data available for selected reports" />
            )}
        </Card>
      </Col>
    </Row>
  );
}




