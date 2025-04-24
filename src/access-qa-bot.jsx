import { h, Component } from "preact";
import { QABot } from "@snf/access-qa-bot";

export class AccessQABot extends Component {
  containerRef = null;
  cleanup = null;

  componentDidMount() {
    this.initializeQABot();
  }

  initializeQABot() {
    if (this.containerRef && window.accessQABot?.qAndATool) {
      const { welcome, prompt, isLoggedIn, embedded, isOpen, apiKey } = this.props;

      try {
        this.cleanup = window.accessQABot.qAndATool({
          target: this.containerRef,
          welcome: welcome || "Welcome to ACCESS Q&A Bot!",
          prompt: prompt || "Ask me anything...",
          isLoggedIn: isLoggedIn !== false,
          embedded: embedded === true,
          isOpen: isOpen === true,
          apiKey: apiKey || "demo-key"
        });
      } catch (err) {
        console.error("<AccessQABot> Error initializing QA Bot", err);
      }
    } else {
      console.error("<AccessQABot> Missing dependencies", {
        containerRef: !!this.containerRef,
        accessQABot: !!window.accessQABot,
        qAndATool: !!(window.accessQABot?.qAndATool)
      });
    }
  }

  componentWillUnmount() {
    if (this.cleanup && typeof this.cleanup === 'function') {
      this.cleanup();
    }
  }

  render() {
    const isEmbedded = this.props.embedded === true;

    const containerStyle = isEmbedded ? {
      width: '100%',
      height: '500px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      overflow: 'hidden',
      position: 'relative',
      margin: '10px 0'
    } : {
      position: 'fixed',
      bottom: '0',
      right: '0',
      width: '60px',
      height: '60px',
      zIndex: 1000,
      overflow: 'visible'
    };

    return (
      <div
        ref={ref => this.containerRef = ref}
        style={containerStyle}
        className={isEmbedded ? "qa-bot-embedded" : "qa-bot-floating"}
      />
    );
  }
}
