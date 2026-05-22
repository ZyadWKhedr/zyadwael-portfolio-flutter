import { ReactNode } from 'react';

interface PhoneFrameProps {
  children: ReactNode;
  accent?: 'blue' | 'teal' | 'purple';
  label?: string;
}

const accents = {
  blue: 'from-flutter-blue/30 via-transparent to-flutter-light-blue/20 shadow-flutter-blue/30',
  teal: 'from-flutter-teal/30 via-transparent to-flutter-light-blue/20 shadow-flutter-teal/30',
  purple: 'from-flutter-purple/30 via-transparent to-flutter-teal/20 shadow-flutter-purple/30',
};

const PhoneFrame = ({ children, accent = 'blue', label }: PhoneFrameProps) => {
  const glow = accents[accent];
  return (
    <div className="relative">
      <div className={`relative w-[260px] h-[540px] rounded-[2.8rem] bg-gradient-to-b from-gray-800 to-gray-900 p-3 shadow-2xl ${glow.split(' ').pop()} border border-white/10`}>
        <div className="relative w-full h-full rounded-[2.1rem] bg-gradient-to-b from-flutter-dark-blue via-[#0a1628] to-flutter-dark-blue overflow-hidden border border-white/5">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-900 rounded-b-2xl z-10" />
          {/* App content */}
          <div className="pt-9 pb-5 px-3 h-full flex flex-col justify-center">
            {children}
          </div>
        </div>
      </div>
      {/* Glow */}
      <div className={`absolute -inset-4 bg-gradient-to-tr ${glow} rounded-[3.5rem] blur-2xl -z-10`} />
      {label && (
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-flutter-gradient text-white text-[10px] font-bold uppercase tracking-widest shadow-lg">
          {label}
        </div>
      )}
    </div>
  );
};

export default PhoneFrame;
