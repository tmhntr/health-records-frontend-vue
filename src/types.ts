type HealthRecordType =
    | "medication"
    | "lab"
    | "hospitalization"
    | "allergy"
    | "referral"
    | "problem"
    | "office visit note"
    | "immunization"
    | "consultation";

export const healthRecordTypes: HealthRecordType[] = [
    "medication",
    "lab",
    "hospitalization",
    "allergy",
    "referral",
    "problem",
    "office visit note",
    "immunization",
    "consultation",
];

type HealthRecord = {
    id: number;
    date: string;
    record_type: HealthRecordType;
    description: string;
};

type MedicationRecord = HealthRecord & {
    type: "medication";
    start_date: string;
    end_date?: string;
    dose: number;
    dose_unit: string;
    problem?: number;
    instructions: string;
};

type LabRecord = HealthRecord & {
    type: "lab";
    value: number;
    value_unit: string;
};

type HospitalizationRecord = HealthRecord & {
    type: "hospitalization";
    start_date: string;
    end_date?: string;
    problem?: number;
};

type AllergyRecord = HealthRecord & {
    type: "allergy";
    reaction: string;
    start_date: string;
    end_date?: string;
    severity: string;
};

type ReferralRecord = HealthRecord & {
    type: "referral";
    referral_to: string;
    referral_reason: string;
};

type ProblemRecord = HealthRecord & {
    type: "problem";
    start_date: string;
    end_date?: string;
};

type OfficeVisitNoteRecord = HealthRecord & {
    type: "office visit note";
    problem?: number;
    note: string;
};

type ImmunizationRecord = HealthRecord & {
    type: "immunization";
};

type ConsultationRecord = HealthRecord & {
    type: "consultation";
    problem?: number;
    consultation_reason: string;
};

type UserData = {
    id: number;
    email: string;
};

export {
    HealthRecordType,
    HealthRecord,
    MedicationRecord,
    LabRecord,
    HospitalizationRecord,
    AllergyRecord,
    ReferralRecord,
    ProblemRecord,
    OfficeVisitNoteRecord,
    ImmunizationRecord,
    ConsultationRecord,
    UserData,
};
