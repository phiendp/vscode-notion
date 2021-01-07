import { BlockMapType, NotionRenderer } from 'react-notion'
import React from 'react'

declare global {
  interface Window {
    data: Record<string, unknown>
    vscode: {
      postMessage: (message: any) => void
    }
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const App: React.FC = () => {
  return (
    <NotionRenderer
      fullPage
      hideHeader
      blockMap={window.data as BlockMapType}
      customBlockComponents={{
        page: ({ blockValue, renderComponent }) => (
          <span
            onClick={() =>
              window.vscode.postMessage({
                command: 'open',
                text: blockValue.id,
              })
            }
          >
            {renderComponent()}
          </span>
        ),
      }}
    />
  )
}

export default App
