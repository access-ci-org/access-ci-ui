import { BrowserRouter, Routes, Route } from "react-router";
import { lazy, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { QABot } from "./qa-bot.jsx";
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
      <BrowserRouter>
        <ErrorBoundary>
          <Routes>
            <Route
              path={baseUri}
              element={
                <ResourceHome
                  baseUri={baseUri}
                  title={title}
                  setBotOpen={setBotOpen}
                  showTitle={showTitle}
                />
              }
            />
            <Route
              path={`${baseUri}/:infoGroupId`}
              element={<ResourceGroupDetail baseUri={baseUri} />}
            />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
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
