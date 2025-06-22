import { Switch, Route, Redirect } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, Spin, notification } from "antd";
import { queryClient } from "./lib/queryClient";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import { MainLayout } from "@/components/layout/main-layout";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import Purchases from "@/pages/purchases";
import Prices from "@/pages/prices";
import Suppliers from "@/pages/suppliers";
import Insights from "@/pages/insights";
import Alerts from "@/pages/alerts";
import NotFound from "@/pages/not-found";

// Configure Ant Design notification globally
notification.config({
  placement: 'topRight',
  duration: 4.5,
  rtl: false,
});

// Ant Design theme configuration
const antdTheme = {
  token: {
    colorPrimary: '#1e3a8a',
    colorSuccess: '#10b981',
    colorWarning: '#f59e0b',
    colorError: '#ef4444',
    borderRadius: 8,
    wireframe: false,
  },
  components: {
    Button: {
      colorPrimary: '#1e3a8a',
      colorPrimaryHover: '#3b82f6',
    },
    Card: {
      borderRadiusLG: 12,
      boxShadowTertiary: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    },
    Layout: {
      colorBgContainer: '#ffffff',
      colorBgLayout: '#f8fafc',
    },
    Menu: {
      colorPrimary: '#1e3a8a',
      colorBgContainer: 'transparent',
    },
  }
};

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <Spin size="large" />
          <p className="mt-3 text-muted">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return <MainLayout>{children}</MainLayout>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <Spin size="large" />
          <p className="mt-3 text-muted">Loading...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return <>{children}</>;
}

function Router() {
  return (
    <Switch>
      <Route path="/">
        <PublicRoute>
          <Login />
        </PublicRoute>
      </Route>
      
      <Route path="/dashboard">
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </Route>
      
      <Route path="/purchases">
        <ProtectedRoute>
          <Purchases />
        </ProtectedRoute>
      </Route>
      
      <Route path="/prices">
        <ProtectedRoute>
          <Prices />
        </ProtectedRoute>
      </Route>
      
      <Route path="/suppliers">
        <ProtectedRoute>
          <Suppliers />
        </ProtectedRoute>
      </Route>
      
      <Route path="/insights">
        <ProtectedRoute>
          <Insights />
        </ProtectedRoute>
      </Route>
      
      <Route path="/alerts">
        <ProtectedRoute>
          <Alerts />
        </ProtectedRoute>
      </Route>
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ConfigProvider theme={antdTheme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
