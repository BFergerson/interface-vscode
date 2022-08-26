// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import EventBus = require("@vertx/eventbus-bridge-client.js");
import {SourceMarker} from "./sourcemarker";
import {Uri} from "vscode";

const workspaces = new Map<Uri, SourceMarker>();

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    vscode.workspace.onDidChangeConfiguration((e) => {
        if (!e.affectsConfiguration("sourceplusplus"))
            return;

        let workspaceUri = vscode.workspace.workspaceFile!;
        let config = vscode.workspace.getConfiguration("sourceplusplus");

        if (workspaces.has(workspaceUri)) {
            workspaces.get(workspaceUri)!.init(config);
        } else {
            let sourceMarker = new SourceMarker();
            sourceMarker.init(config);
            workspaces.set(workspaceUri, sourceMarker);
        }
    });

    console.log(vscode.workspace.workspaceFile)

    if (vscode.workspace.workspaceFile) {
        let workspaceUri = vscode.workspace.workspaceFile!;
        let config = vscode.workspace.getConfiguration("sourceplusplus");

        if (workspaces.has(workspaceUri)) {
            workspaces.get(workspaceUri)!.init(config);
        } else {
            let sourceMarker = new SourceMarker();
            sourceMarker.init(config);
            workspaces.set(workspaceUri, sourceMarker);
        }
    }

    const testCommandId = "sourceplusplus.statusClick";

    let statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, -10000000);
    statusBarItem.command = testCommandId;
    statusBarItem.text = "$(statusbar-enabled)S";
    statusBarItem.tooltip = "Click to disable Source++";
    statusBarItem.show();

    vscode.commands.registerCommand(testCommandId, () => {
        console.log("Status bar pressed!");
    });

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "sourceplusplus" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('sourceplusplus.addBreakpoint', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('Breakpoint added!');
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}
