import * as _vscode from 'vscode'

declare global {
  const tsvscode: {
    postMessage: ({ type: string, value: any }) => void
  }
  const apiBaseUrl: string
  let userId: string
  const flairMap: Record<string, string>
}
