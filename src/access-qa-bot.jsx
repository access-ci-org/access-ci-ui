import { h, Component } from "preact";

export class AccessQABot extends Component {
  state = {
    QABot: null
  };

  componentDidMount() {
    // Dynamically import the QABot component only when needed
    import("@snf/access-qa-bot").then(module => {
      this.setState({ QABot: module.QABot });
    }).catch(error => {
      console.error("Error loading QA Bot:", error);
    });
  }

  render() {
    const { QABot } = this.state;
    const { welcome, prompt, isLoggedIn, isOpen, apiKey, embedded } = this.props;

    if (!QABot) {
      return <div className="qa-bot-loading"></div>;
    }

    return (
      <QABot
        welcome={welcome || "Welcome to ACCESS Q&A Bot!"}
        prompt={prompt || "Ask me anything..."}
        isLoggedIn={isLoggedIn !== false}
        isOpen={isOpen === true}
        embedded={embedded === true}
        apiKey={apiKey || "demo-key"}
      />
    );
  }
}
