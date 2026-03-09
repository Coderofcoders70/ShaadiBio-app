export interface BioData {
  _id?: string;
  profilePhoto?: string;
  personal: {
    fullName: string;
    gender: 'Male' | 'Female' | 'Other' | '';
    dob: string;
    age: number;
    height: string;
    religion: string;
    caste: string;
    motherTongue: string;
    maritalStatus: string;
    nationality: string;
    phone: string; 
    email: string;
  };
  family: {
    fatherName: string;
    fatherOccupation: string;
    motherName: string;
    motherOccupation: string;
    siblings: string;
    familyType: string;
    nativePlace: string;
  };
  education: {
    education: string;
    collegeName: string;
    profession: string;
    companyName: string;
    annualIncome: string;
  };
  privacy: {
    showIncome: boolean;
    showContact: boolean;
    showEmail: boolean;
  };
  horoscope?: {
    rashi: string;
    nakshatra: string;
    gothra: string;
    timeOfBirth: string;
    placeOfBirth: string;
  };
  templateId: 'modern' | 'traditional';
  themeColor: string;
  fontStyle: string;
  language: 'en' | 'hi';
  pdfPassword?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
  isAdmin: boolean;
  isPremium: boolean;
}