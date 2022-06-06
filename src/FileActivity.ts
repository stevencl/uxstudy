import { FileRecord } from "./FileRecord";

export class FileActivity {
    // Hash table to keep track of the files that are currently open
    private openedFiles: Map<string, FileRecord> = new Map();

    private currentActiveFile: string = "";

    // Update map when a file becomes active
    public setActiveFile(fileName: string) {
        // Get current time and add to time in map
        if (this.currentActiveFile !== "") {
            
            let file = this.openedFiles.get(this.currentActiveFile);
            if (file) {
                file.setInactive();
            }
            let activeFile = this.openedFiles.get(fileName);
            if (activeFile) {
                activeFile.setActive();
            }
            else {
                let newFile = new FileRecord(fileName);
                newFile.setActive();
                this.openedFiles.set(fileName, newFile);
            }
        }
        else {
            let newFile = new FileRecord(fileName);
            newFile.setActive();
            this.openedFiles.set(fileName, newFile);
        }
        this.currentActiveFile = fileName;
    }

    public getActiveTime(fileName: string) {
        let file = this.openedFiles.get(fileName);
        if (file) {
            return file.getTotalTime();
        }
        return 0;
    }

    public getActiveCount(fileName: string) {
        let file = this.openedFiles.get(fileName);
        if (file) {
            return file.getActiveCount();
        }
        return 0;
    }

    public getStatistics() {
        let result = "";
        this.openedFiles.forEach((value, key) => {
            result += key + ": " + value.getTotalTime() + " milliseconds, " + value.getActiveCount() + " times\n";
        });
        return result;
    }

    public checkpointCurrentActiveFile() {
        if (this.currentActiveFile !== "") {
            let file = this.openedFiles.get(this.currentActiveFile);
            if (file) {
                file.updateTotalTime();
            }
        }
    }

}