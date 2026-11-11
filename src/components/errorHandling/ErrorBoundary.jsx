import { Component } from "react";
import { useLocation } from "react-router-dom";
import usePageMetadata from "../../hooks/usePageMetadata";
import AppLayout from "../../layouts/AppLayout";
import StatusScreen from "./StatusScreen";

const ErrorScreen = () => {
  usePageMetadata({
    title: "Page Unavailable - UnicodeTech",
    bodyClass: "site site-design status-page-body",
  });

  return (
    <AppLayout>
      <StatusScreen isError />
    </AppLayout>
  );
};

class PageErrorBoundary extends Component {
  state = { failed: false, resetKey: this.props.resetKey };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.resetKey !== state.resetKey) {
      return { failed: false, resetKey: props.resetKey };
    }

    return null;
  }

  render() {
    if (this.state.failed) {
      return <ErrorScreen />;
    }

    return this.props.children;
  }
}

const ErrorBoundary = ({ children }) => {
  const { pathname } = useLocation();

  return <PageErrorBoundary resetKey={pathname}>{children}</PageErrorBoundary>;
};

export default ErrorBoundary;
