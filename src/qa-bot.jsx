import { Component } from "preact";
import { QABot as AccessQABot } from "@snf/access-qa-bot";

export class QABot extends Component {
  render() {
    const {
      welcome,
      isLoggedIn,
      open,
      onOpenChange,
      apiKey,
      embedded,
      loginUrl
    } = this.props;

    // Support environment variable if apiKey is not provided via props
    const botApiKey = apiKey || import.meta.env.VITE_QA_BOT_API_KEY || null;

    if (!botApiKey) {
      console.error("QA Bot: No valid API key provided");
      return null;
    }

    // Detect login state if not provided via props
    const loggedIn = isLoggedIn !== undefined
      ? isLoggedIn
      : document.cookie.split("; ").includes("SESSaccesscisso=1");

    return (
      <AccessQABot
        welcome={welcome || "Welcome to ACCESS Q&A Bot!"}
        isLoggedIn={loggedIn}
        open={open}
        onOpenChange={onOpenChange}
        embedded={embedded === true}
        apiKey={botApiKey}
        loginUrl={loginUrl}
      />
    );
  }
}
