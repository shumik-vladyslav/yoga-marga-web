export class SetiingsModel {
    defaultAudioIdx: number = 0;
    exerciseDuration: number = 0;
    intervals: Array<any> = [];
    metronomeFlag: boolean = false;
    multiReminder: boolean = false;
    practiceDuration: number = 3600000;
    reminderInterval: number = 60000;
    singleReminder: boolean = false;
    spentTime: number = 0;
    spentTimeGoal:number = 0;
}
