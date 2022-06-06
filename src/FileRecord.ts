export class FileRecord {

    // File name
    private fileName: string = "";

    // Total time active
    private totalTime: number = 0;

    // Active since
    private activeSince: number = 0;

    // Number of times made active
    private activeCount: number = 0;

    constructor(fileName: string) {
        this.fileName = fileName;
    }

    setActive() {
        this.activeSince = Date.now();
        this.activeCount++;
    }

    setInactive() {
        this.totalTime = this.totalTime + (Date.now() - this.activeSince);
    }

    updateTotalTime() {
        this.totalTime = this.totalTime + (Date.now() - this.activeSince);
        this.activeSince = Date.now();
    }

    getActiveCount() {
        return this.activeCount;
    }

    getTotalTime() {
        return this.totalTime;
    }

    getFileName() {
        return this.fileName;
    }

}