import * as vscode from 'vscode'
import { HelloWorldPanel } from './HelloWorldPanel'

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "vstodos" is now active!')

  context.subscriptions.push(
    vscode.commands.registerCommand('vstodos.helloWorld', () => {
      vscode.window.showInformationMessage('Hello World from Arsam!')
      HelloWorldPanel.createOrShow(context.extensionUri)
    }),
  )
  context.subscriptions.push(
    vscode.commands.registerCommand('vstodos.refresh', () => {
      HelloWorldPanel.kill()
      HelloWorldPanel.createOrShow(context.extensionUri)

      setTimeout(() => {
        vscode.commands.executeCommand('workbench.action.webview.openDeveloperTools')
      }, 500)
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
