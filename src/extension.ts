import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "vstodos" is now active!')

  context.subscriptions.push(
    vscode.commands.registerCommand('vstodos.helloWorld', () => {
      vscode.window.showInformationMessage('Hello World from Arsam!')
    }),
  )

  context.subscriptions.push(
    vscode.commands.registerCommand('vstodos.askQuestion', () => {
      vscode.window.showInformationMessage('How was your day?', 'Good', 'Bad')
    }),
  )
}

export function deactivate() {}
