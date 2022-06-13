// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { FileActivity } from './FileActivity';
import * as fs from 'node:fs';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "uxstudy" is now active!');

	let fileActivity = new FileActivity();
	let pptName = "";
	let totalTimeOnTask = 0;
	let startedTask1 = false;
	let startedTask2 = false;

	let disposable = vscode.commands.registerCommand('uxstudy.startTask1', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		if ((!startedTask1) && (!startedTask2)) {
			vscode.window.showInformationMessage('Starting task 1');
			// Close all open tabs in the editor
			vscode.commands.executeCommand('workbench.action.closeAllEditors');

			// Clear recent files
			vscode.commands.executeCommand('workbench.action.clearRecentFiles');

			vscode.commands.executeCommand('workbench.action.clearEditorHistory');

			vscode.commands.executeCommand('workbench.action.clearCommandHistory');

			// Ask the user for the participant name
			vscode.window.showInputBox({
				placeHolder: "Enter participant name"
			}).then(participantName => {
				if (participantName) {
					pptName = participantName;
				}
			});

			totalTimeOnTask = Date.now();
			startedTask1 = true;

			vscode.window.onDidChangeActiveTextEditor(editor => {
				if (editor) {
					console.log("Active editor changed: " + editor.document.fileName);
					fileActivity.setActiveFile(editor.document.fileName);
				}
			});


		}
	context.subscriptions.push(disposable);
	});

	let command2 = vscode.commands.registerCommand('uxstudy.showStats', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Outputting stats');
		fileActivity.checkpointCurrentActiveFile();
		console.log(fileActivity.getStatistics());
	

	context.subscriptions.push(command2);
	});

	let command3 = vscode.commands.registerCommand('uxstudy.writeStats', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Writing stats');
		fileActivity.checkpointCurrentActiveFile();
		let stats = fileActivity.getStatistics();

		// Ask the user for a path to a file
		vscode.window.showSaveDialog({
			defaultUri: vscode.Uri.file("C:/uxstudy" + "/" + pptName + ".txt"),
			filters: {
				'Text files': ['txt'],
				'All files': ['*']
			}
		}).then(uri => {
			if (uri) {
				// Write the file to disk
				vscode.workspace.fs.writeFile(uri, Buffer.from(stats, "utf8")).then(() => {
					vscode.window.showInformationMessage('Stats written to ' + uri.fsPath);
				}, err => {
					vscode.window.showErrorMessage('Failed to write file: ' + err.toString());
				});
			}
		});
	
	context.subscriptions.push(command3);
	});

	let command4 = vscode.commands.registerCommand('uxstudy.stopTask1', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		if (startedTask1) {
			vscode.window.showInformationMessage('Stopping task 1');
			totalTimeOnTask = Date.now() - totalTimeOnTask;

			fileActivity.checkpointCurrentActiveFile();
			let stats = fileActivity.getStatistics();
			stats = stats + "\nTotal time on task: " + totalTimeOnTask + "ms";
			stats = stats + "\nTask 1 completed" + "\n";
			// Write today's date to stats in readable format
			

			// Ask the user for a path to a file
			vscode.window.showSaveDialog({
				defaultUri: vscode.Uri.file("C:/uxstudy" + "/" + pptName + ".txt"),
				filters: {
					'Text files': ['txt'],
					'All files': ['*']
				}
			}).then(uri => {
				if (uri) {
					// Write the file to disk
					vscode.workspace.fs.writeFile(uri, Buffer.from(stats, "utf8")).then(() => {
						vscode.window.showInformationMessage('Stats written to ' + uri.fsPath);
					}, err => {
						vscode.window.showErrorMessage('Failed to write file: ' + err.toString());
					});
				}
			});
		}
		startedTask1 = false;
	context.subscriptions.push(command4);
	});

	let command5 = vscode.commands.registerCommand('uxstudy.startTask2', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		if ((!startedTask1) && (!startedTask2)) {
			vscode.window.showInformationMessage('Starting task 2');
			// Close all open tabs in the editor
			vscode.commands.executeCommand('workbench.action.closeAllEditors');

			// Clear recent files
			vscode.commands.executeCommand('workbench.action.clearRecentFiles');

			vscode.commands.executeCommand('workbench.action.clearEditorHistory');

			vscode.commands.executeCommand('workbench.action.clearCommandHistory');

			totalTimeOnTask = Date.now();
			startedTask2 = true;

			fileActivity = new FileActivity();
		}

	context.subscriptions.push(command5);
	});

	let command6 = vscode.commands.registerCommand('uxstudy.stopTask2', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		if (startedTask2) {
			vscode.window.showInformationMessage('Stopping task 2');
			totalTimeOnTask = Date.now() - totalTimeOnTask;

			fileActivity.checkpointCurrentActiveFile();
			let stats = fileActivity.getStatistics();
			stats = stats + "\nTotal time on task: " + totalTimeOnTask + "ms";
			stats = stats + "\nTask 2 completed" + "\n";
			// Write today's date to stats in readable format
			

			// Ask the user for a path to a file
			vscode.window.showSaveDialog({
				defaultUri: vscode.Uri.file("C:/uxstudy" + "/" + pptName + ".txt"),
				filters: {
					'Text files': ['txt'],
					'All files': ['*']
				}
			}).then(uri => {
				if (uri) {
					// Write the file to disk
					vscode.workspace.fs.writeFile(uri, Buffer.from(stats, "utf8")).then(() => {
						vscode.window.showInformationMessage('Stats written to ' + uri.fsPath);
					}, err => {
						vscode.window.showErrorMessage('Failed to write file: ' + err.toString());
					});
				}
			});
		}
		startedTask2 = false;

	context.subscriptions.push(command6);
	});

}

// this method is called when your extension is deactivated
export function deactivate() {}
