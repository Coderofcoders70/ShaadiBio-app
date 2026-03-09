import { Schema, model } from 'mongoose';

const bioDataSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  profilePhoto: { type: String }, 
  versionName: { type: String, default: 'Primary Profile' }, 
  isPrimary: { type: Boolean, default: false },
  pdfPassword: { type: String, default: '' },
  language: { type: String, default: 'en' },
  personal: {
    fullName: String,
    gender: { type: String, enum: ['Male', 'Female', 'Other', ''], default: '' },
    dob: Date,
    age: Number,
    height: String,
    religion: String,
    caste: String,
    motherTongue: String,
    maritalStatus: String,
    nationality: String,
  },
  family: {
    fatherName: String,
    fatherOccupation: String,
    motherName: String,
    motherOccupation: String,
    siblings: String,
    familyType: String,
    nativePlace: String,
  },
  education: {
    education: String,
    collegeName: String,
    profession: String,
    companyName: String,
    annualIncome: String,
  },
  horoscope: {
    rashi: String,
    nakshatra: String,
    gothra: String,
    timeOfBirth: String,
    placeOfBirth: String,
  },
  templateId: { type: String, default: 'modern' },
  themeColor: { type: String, default: '#db2777' }, 
  fontStyle: { type: String, default: 'font-sans' },
}, { timestamps: true });

export const BioData = model('BioData', bioDataSchema);