import React from 'react';

interface GridTextCardProps {
  title: string;
  description: string;
}

const GridTextCard: React.FC<GridTextCardProps> = ({ title, description }) => (
  <div className="rounded-xl bg-[#263049] xl:min-h-[400px] 2xl:min-h-[550px] flex flex-col justify-center p-8">
    <h3 className="text-white font-bold text-2xl mb-2" style={{ fontFamily: 'Chillax, sans-serif' }}>{title}</h3>
    <p className="text-white text-base font-light" style={{ fontFamily: 'Chillax, sans-serif' }}>{description}</p>
  </div>
);

export default GridTextCard;
