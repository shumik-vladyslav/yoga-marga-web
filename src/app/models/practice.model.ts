import { PracticeSettings } from '../PracticesSetting.model';
export class Practice {
    isBm?: boolean;
    id: string;
    img?: string;
    name: string;
    shortDescription: string;
    audio?: string | any;
    text?: string | any;
    exercises: any[];
    settings?: PracticeSettings;
    detailedInformation?: string;
    hasMetronome: boolean;
    
    isMaxAchievement: boolean; // for backward compatibility
    hasMaxAchievement: boolean;
    
    isAmountCounter: boolean; // for backward compatibility
    hasAmountCounter: boolean;
}