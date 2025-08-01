import { useState } from "preact/hooks";
import { ErrorBoundary, lazy, LocationProvider, Router } from "preact-iso";

import { QABot } from "./qa-bot";
const ResourceGroupDetail = lazy(() => import("./resource-group-detail.jsx"));
const ResourceHome = lazy(() => import("./resource-home.jsx"));

export function ResourceCatalog({
  baseUri = "/resources",
  isLoggedIn,
  qaBotApiKey,
  showTitle = true,
  title = "Resources",
}) {
  const [botOpen, setBotOpen] = useState(false);

  return (
    <>
      <LocationProvider>
        <ErrorBoundary>
          <Router>
            <ResourceHome
              path={baseUri}
              baseUri={baseUri}
              title={title}
              setBotOpen={setBotOpen}
              showTitle={showTitle}
            />
            <ResourceGroupDetail
              path={`${baseUri}/:infoGroupId`}
              baseUri={baseUri}
            />
          </Router>
        </ErrorBoundary>
      </LocationProvider>
      <QABot
        apiKey={qaBotApiKey}
        embedded={false}
        isLoggedIn={isLoggedIn}
        onOpenChange={setBotOpen}
        open={botOpen}
        welcome="Welcome to the ACCESS Q&A Bot!"
      />
    </>
  );
}
