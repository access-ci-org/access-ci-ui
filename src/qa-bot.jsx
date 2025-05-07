import { Component } from "preact";
import { ErrorBoundary, lazy } from "preact-iso";

const LazyQABot = lazy(() =>
  import("@snf/access-qa-bot").then(module => ({
    default: module.QABot
  }))
);

export class QABot extends Component {
  render() {
    const { welcome, prompt, isLoggedIn, isOpen, apiKey, embedded } = this.props;

    // Support environment variable if apiKey is not provided via props
    const botApiKey = apiKey || import.meta.env.VITE_QA_BOT_API_KEY || null;

    if (!botApiKey) {
      console.error("QA Bot: No valid API key provided");
      return null;
    }

    return (
      <ErrorBoundary>
        <LazyQABot
          welcome={welcome || "Welcome to ACCESS Q&A Bot!"}
          prompt={prompt || "Ask me anything..."}
          isLoggedIn={isLoggedIn}
          isOpen={isOpen === true}
          embedded={embedded === true}
          apiKey={botApiKey}
        />
      </ErrorBoundary>
    );
  }
}
