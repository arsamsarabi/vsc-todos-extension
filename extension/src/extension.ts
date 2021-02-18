import * as vscode from 'vscode'

import { SidebarProvider } from './SidebarProvider'
import { authenticate } from './authenticate'
import { TokenManager } from './TokenManager'

export function activate(context: vscode.ExtensionContext) {
  TokenManager.globalState = context.globalState

  const sidebarProvider = new SidebarProvider(context.extensionUri)

  const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right)
  item.text = '$(beaker) Add TODO'
  item.command = 'vstodos.addTodo'
  item.show()

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider('vstodos-sidebar', sidebarProvider),
  )

  context.subscriptions.push(
    vscode.commands.registerCommand('vstodos.addTodo', () => {
      const { activeTextEditor } = vscode.window
      if (!activeTextEditor) {
        vscode.window.showInformationMessage('No active text editor!')
        return
      }

      const text = activeTextEditor.document.getText(activeTextEditor.selection)
      sidebarProvider._view?.webview.postMessage({ type: 'new-todo', value: text })
    }),
  )

  context.subscriptions.push(
    vscode.commands.registerCommand('vstodos.authenticate', () => {
      authenticate(() =>
        sidebarProvider._view?.webview.postMessage({
          type: 'token',
          value: TokenManager.getToken(),
        }),
      )
    }),
  )

  context.subscriptions.push(
    vscode.commands.registerCommand('vstodos.refresh', async () => {
      await vscode.commands.executeCommand('workbench.action.closeSidebar')
      await vscode.commands.executeCommand('workbench.view.extension.vstodos-sidebar-view')
    }),
  )

  context.subscriptions.push(
    vscode.commands.registerCommand('vstodos.askQuestion', async () => {
      const answer = await vscode.window.showInformationMessage('How was your day?', 'Good', 'Bad')
      if (answer === 'Bad') {
        vscode.window.showInformationMessage('Sorry to hear that')
      } else {
        console.log(answer)
      }
    }),
  )
}

export function deactivate() {}
