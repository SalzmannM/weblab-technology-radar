export interface Technology {
    _id?: string;
    name: string;
    category: string;
    ring: string;
    description: string;
    classification: string;
    published: boolean;
}

export interface HistoryItem {
    _id?: string;
    technologyID: string;
    userID: string;
    type: string;
    dateTime: string;
}

export enum Category {
    Techniques = "Techniques",
    Tools = "Tools",
    Platforms = "Platforms",
    LanguagesFrameworks = "Languages & Frameworks"
}

export enum Ring {
    Assess = "Assess",
    Trial = "Trial",
    Adopt = "Adopt",
    Hold = "Hold"
}