import type { BioData } from '../types';
import { useBioStore } from '../store/useBioStore';
import { translations } from '../utils/translation';
import { User as UserIcon, Users, GraduationCap, Star, Phone } from 'lucide-react';

interface Props {
  data: BioData;
}

const BioDataTemplate = ({ data }: Props) => {
  const { user } = useBioStore();
  const isPremium = user?.isPremium || false;
  const isTraditional = data.templateId === 'traditional';
  const primaryColor = data.themeColor || (isTraditional ? '#c2410c' : '#db2777');
  const fontClass = data.fontStyle || (isTraditional ? 'font-serif' : 'font-sans');
  const lang = data.language || 'en';
  const t = translations[lang as keyof typeof translations];

  const { privacy } = data;

  const colors = {
    pinkPrimary: '#db2777',
    pinkLight: '#fdf2f8',
    orangePrimary: '#c2410c',
    orangeDark: '#9a3412',
    orangeLight: '#fff7ed',
    grayText: '#6b7280',
    darkText: '#1f2937',
  };

  return (
    <div className={`relative p-10 bg-white ${fontClass} min-h-[1000px]`}>

      {/* WATERMARK (FR-13): Visible only for Free Users */}
      {!isPremium && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <span
            /* Increased opacity from 0.03 to 0.08 for better visibility */
            className="text-[100px] md:text-[120px] font-black -rotate-45 uppercase opacity-[0.08] whitespace-nowrap tracking-tighter"
            style={{ color: '#000000' }}
          >
            ShaadiBio Free
          </span>
        </div>
      )}

      {/* Content wrapper with relative positioning and z-index to stay above watermark */}
      <div className="relative z-10">
        {/* Header Section */}
        <div className="text-center mb-10">
          {data.profilePhoto ? (
            <img
              src={data.profilePhoto}
              crossOrigin="anonymous"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
            />
          ) : (
            <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gray-100 border-4 border-white shadow-md flex items-center justify-center text-gray-400">
              <UserIcon size={48} />
            </div>
          )}
          <h1
            className="text-3xl text-center font-bold uppercase tracking-widest"
            style={{ color: primaryColor }}
          >
            {data.personal.fullName || (lang === 'en' ? "YOUR NAME" : "आपका नाम")}
          </h1>
          <div
            className="h-2 w-24 mx-auto mt-4"
            style={{ backgroundColor: primaryColor }}
          />
        </div>

        <div className="grid grid-cols-1 gap-8 text-left">
          {/* Section 1: Personal Details */}
          <section>
            <h3
              className="font-bold mb-3 uppercase border-b-2 pb-1 flex items-center gap-2"
              style={{ color: primaryColor, borderBottomColor: `${primaryColor}20` }} // 20 adds transparency for a 'light' version
            >
              <UserIcon size={18} /> {t.personalDetails}
            </h3>
            <div className="grid grid-cols-2 gap-y-2 text-base">
              <span style={{ color: colors.grayText }}>{t.birthDate}:</span>
              <span className="font-medium">{data.personal.dob?.split('T')[0] || '—'}</span>
              <span style={{ color: colors.grayText }}>{t.ageHeight}:</span>
              <span className="font-medium">{data.personal.age} Yrs, {data.personal.height || '—'}</span>
              <span style={{ color: colors.grayText }}>{t.religionCaste}:</span>
              <span className="font-medium">{data.personal.religion} ({data.personal.caste})</span>
            </div>
          </section>

          {/* Section 2: Contact Information */}
          {((privacy.showContact && data.personal.phone) || (privacy.showEmail && data.personal.email)) && (
            <section>
              <h3
                className="font-bold mb-3 uppercase border-b-2 pb-1 flex items-center gap-2"
                style={{ color: primaryColor, borderBottomColor: `${primaryColor}20` }} // 20 adds transparency for a 'light' version
              >
                <Phone size={18} /> {t.contactInfo}
              </h3>
              <div className="grid grid-cols-1 gap-y-2 text-base">
                {privacy.showContact && data.personal.phone && (
                  <div className="flex items-center gap-4">
                    <span style={{ color: colors.grayText }} className="w-32">{t.phone}:</span>
                    <span className="font-medium">{data.personal.phone}</span>
                  </div>
                )}
                {privacy.showEmail && data.personal.email && (
                  <div className="flex items-center gap-4">
                    <span style={{ color: colors.grayText }} className="w-32">{t.email}:</span>
                    <span className="font-medium">{data.personal.email}</span>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Section 3: Family Details */}
          <section>
            <h3
              className="font-bold mb-3 uppercase border-b-2 pb-1 flex items-center gap-2"
              style={{ color: primaryColor, borderBottomColor: `${primaryColor}20` }} // 20 adds transparency for a 'light' version
            >
              <Users size={18} /> {t.familyDetails}
            </h3>
            <div className="grid grid-cols-2 gap-y-2">
              <span style={{ color: colors.grayText }}>{t.father}:</span>
              <span className="font-medium">{data.family.fatherName || '—'}</span>
              <span style={{ color: colors.grayText }}>{t.native}:</span>
              <span className="font-medium">{data.family.nativePlace || '—'}</span>
            </div>
          </section>

          {/* Section 4: Education & Career */}
          <section>
            <h3
              className="font-bold mb-3 uppercase border-b-2 pb-1 flex items-center gap-2"
              style={{ color: primaryColor, borderBottomColor: `${primaryColor}20` }} // 20 adds transparency for a 'light' version
            >
              <GraduationCap size={18} /> {t.educationCareer}
            </h3>
            <div className="grid grid-cols-2 gap-y-2">
              <span style={{ color: colors.grayText }}>{t.education}:</span>
              <span className="font-medium">{data.education.education || '—'}</span>
              <span style={{ color: colors.grayText }}>{t.profession}:</span>
              <span className="font-medium">{data.education.profession || '—'}</span>
              {privacy.showIncome && (
                <>
                  <span style={{ color: colors.grayText }}>{t.income}:</span>
                  <span className="font-medium">{data.education.annualIncome || '—'}</span>
                </>
              )}
            </div>
          </section>

          {/* Horoscope Details */}
          <section>
            <h3
              className="font-bold mb-3 uppercase border-b-2 pb-1 flex items-center gap-2"
              style={{ color: primaryColor, borderBottomColor: `${primaryColor}20` }} // 20 adds transparency for a 'light' version
            >
              <Star size={18} /> {t.horoscope}
            </h3>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <span style={{ color: colors.grayText }}>{t.rashi || 'Rashi'}:</span>
              <span className="font-medium">{data.horoscope?.rashi || '—'}</span>
              <span style={{ color: colors.grayText }}>{t.gothra || 'Gothra'}:</span>
              <span className="font-medium">{data.horoscope?.gothra || '—'}</span>
              <span style={{ color: colors.grayText }}>{t.nakshatra || 'Nakshatra'}:</span>
              <span className="font-medium">{data.horoscope?.nakshatra || '—'}</span>
              <span style={{ color: colors.grayText }}>{t.birthTime || 'Birth Time'}:</span>
              <span className="font-medium">{data.horoscope?.timeOfBirth || '—'}</span>
              <span style={{ color: colors.grayText }}>{t.birthPlace || 'Birth Place'}:</span>
              <span className="font-medium">{data.horoscope?.placeOfBirth || '—'}</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BioDataTemplate;