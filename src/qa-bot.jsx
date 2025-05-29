import { Component } from "preact";
import { ErrorBoundary, lazy } from "preact-iso";

const LazyQABot = lazy(() =>
  import("@snf/access-qa-bot").then(module => ({
    default: module.QABot
  }))
);

export class QABot extends Component {
  render() {
    const { isLoggedIn, defaultOpen, apiKey, embedded } = this.props;

    // Support environment variable if apiKey is not provided via props
    const botApiKey = apiKey || import.meta.env.VITE_QA_BOT_API_KEY || null;

    if (!botApiKey) {
      console.error("QA Bot: No valid API key provided");
      return null;
    }

    return (
      <ErrorBoundary>
        <LazyQABot
          isLoggedIn={isLoggedIn}
          defaultOpen={defaultOpen === true}
          embedded={embedded === true}
          apiKey={botApiKey}
        />
      </ErrorBoundary>
    );
  }
}
