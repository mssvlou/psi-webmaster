export interface Website {
    _id: string;
    websiteURL: string;
    addedDate: Date;
    lastRated?: Date;
    ratingStatus: RatingStatus;
    moniteredPages: Page[];
    commonErrors: string[];
    failedAAATotal: number;
    failedAATotal: number;
    failedATotal: number;
    failedAssertionsTotal: number;
    ratedTotal: number;
}

export enum RatingStatus {
    TO_BE_RATED = "to be rated",
    BEING_RATED = "being rated",
    RATED = "rated",
    ERROR = "error"
}

export enum RatingResult{
    NONE = "none",
    COMPLIANT = "compliant",
    NON_COMPLIANT = "non-compliant"
}
  
export interface Page {
    _id: string;
    websiteURL: string;
    pageURL: string;
    lastRated?: Date;
    rating: RatingResult;
    failedA?: boolean;
    failedAA?: boolean;
    failedAAA?: boolean;
    totalTests?: number;
    totalPassed?: number;
    totalWarning?: number;
    totalFailed?: number;
    totalNotApplicable?: number;
    assertions?: QWAssertion[]
}

export interface ErrorElement {
    rank: number;
    errorName: string;
}

export interface QWAssertion {
    // add pageURL, stuff later
    module: string;
    code: string;
    outcome: string;
    levels: string[];
    page: Page;
    description: string;
    elementsAffected: AffectedElement[]
}

export interface AffectedElement{
    verdict : string;
    elements: string[];
}
