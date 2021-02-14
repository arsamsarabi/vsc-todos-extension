import * as vscode from 'vscode'

import { HelloWorldPanel } from './HelloWorldPanel'
import { SidebarProvider } from './SidebarProvider'

export function activate(context: vscode.ExtensionContext) {
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
    vscode.commands.registerCommand('vstodos.refresh', async () => {
      // HelloWorldPanel.kill()
      // HelloWorldPanel.createOrShow(context.extensionUri)

      await vscode.commands.executeCommand('workbench.action.closeSidebar')
      await vscode.commands.executeCommand('workbench.view.extension.vstodos-sidebar-view')

      // setTimeout(() => {
      //   vscode.commands.executeCommand('workbench.action.webview.openDeveloperTools')
      // }, 500)
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
