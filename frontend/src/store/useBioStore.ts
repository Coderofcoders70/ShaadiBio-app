import { create } from 'zustand';
import type { BioData, User } from '../types';

interface BioState {
  user: User | null;
  bioData: BioData;
  setUser: (user: User | null) => void;
  updateBioData: <T extends keyof BioData>(section: T, data: any) => void;
  setProfilePhoto: (url: string) => void;
  resetBioData: () => void;
  activeTab: 'edit' | 'preview'; 
  setActiveTab: (tab: 'edit' | 'preview') => void;
  savedVersions: BioData[]; 
  setSavedVersions: (versions: BioData[]) => void;
  activeVersionId: string | null;
  setActiveVersionId: (id: string | null) => void;
}

const initialState: BioData = {
  personal: { fullName: '', gender: '', dob: '', age: 0, height: '', religion: '', caste: '', motherTongue: '', maritalStatus: '', nationality: '', phone: '', email: '' },
  family: { fatherName: '', fatherOccupation: '', motherName: '', motherOccupation: '', siblings: '', familyType: '', nativePlace: '' },
  education: { education: '', collegeName: '', profession: '', companyName: '', annualIncome: '' },
  privacy: { showIncome: true, showContact: true, showEmail: true },
  horoscope: { rashi: '', nakshatra: '', gothra: '', timeOfBirth: '', placeOfBirth: '' },
  templateId: 'modern',
  language: 'en',
  profilePhoto: '',
  pdfPassword: '',
  themeColor: '#db2777',
  fontStyle: 'font-sans'
};

export const useBioStore = create<BioState>((set) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  bioData: initialState,
  setUser: (user) => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
    set({ user });
  },
  savedVersions: [],
  setSavedVersions: (versions) => set({ savedVersions: versions }),
  activeVersionId: null,
  setActiveVersionId: (id) => set({ activeVersionId: id }),
  activeTab: 'edit',
  setActiveTab: (tab) => set({ activeTab: tab }),
  updateBioData: (section, data) =>
    set((state) => ({
      bioData: {
        ...state.bioData,
        [section]: typeof data === 'object' && data !== null
          ? { ...state.bioData[section] as object, ...data }
          : data
      }
    })),
  setProfilePhoto: (url) =>
    set((state) => ({ bioData: { ...state.bioData, profilePhoto: url } })),
  resetBioData: () => set({ bioData: initialState }),
}));