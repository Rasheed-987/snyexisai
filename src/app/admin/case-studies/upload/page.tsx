'use client';
import React, { useState } from 'react';

const CaseStudiesUploadPage = () => {
  const [caseTitle, setCaseTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [banner, setBanner] = useState<string | null>(null);
  const [whatWeDid, setWhatWeDid] = useState("");
  const [addLine, setAddLine] = useState("");

  // Sectioned state for cards and images
  const [cards, setCards] = useState(Array(6).fill({ title: "", body: "" }));
  const [images, setImages] = useState<(string | null)[]>(Array(8).fill(null));
  const [bodyTexts, setBodyTexts] = useState(Array(3).fill(""));

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (typeof index === "number") {
        const newImgs = [...images];
        newImgs[index] = url;
        setImages(newImgs);
      } else {
        setBanner(url);
      }
    }
  };

  const handleCardChange = (index: number, field: "title" | "body", value: string) => {
    const newCards = [...cards];
    newCards[index] = { ...newCards[index], [field]: value };
    setCards(newCards);
  };

  const handleBodyChange = (index: number, value: string) => {
    const newTexts = [...bodyTexts];
    newTexts[index] = value;
    setBodyTexts(newTexts);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      {/* Case Title */}
      <input
        type="text"
        placeholder="Project Title Here"
        className="border-2 border-dashed rounded-lg px-4 py-2 text-center text-lg font-semibold mb-4 w-full max-w-lg"
        value={caseTitle}
        onChange={(e) => setCaseTitle(e.target.value)}
      />

      {/* Subtitle */}
      <input
        type="text"
        placeholder="Subtitle Here"
        className="border-2 border-dashed rounded-full px-4 py-2 text-center mb-6 w-full max-w-md"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
      />

      {/* Project Banner */}
      <div className="border-2 border-dashed rounded-xl w-full max-w-5xl h-64 flex flex-col justify-center items-center mb-4">
        {banner ? (
          <img src={banner} alt="Banner" className="h-full w-full object-cover rounded-xl" />
        ) : (
          <>
            <p className="font-semibold text-lg">Project Banner</p>
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e)} className="mt-2" />
          </>
        )}
      </div>

      {/* What We Did & Add Line */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <input
          type="text"
          placeholder="What we did"
          className="border-2 border-dashed rounded-full px-4 py-2 text-center w-48"
          value={whatWeDid}
          onChange={(e) => setWhatWeDid(e.target.value)}
        />
        <input
          type="text"
          placeholder="Add line"
          className="border-2 border-dashed rounded-full px-4 py-2 text-center w-48"
          value={addLine}
          onChange={(e) => setAddLine(e.target.value)}
        />
      </div>

      {/* Section 1 - Image */}
      <div className="border-2 border-dashed rounded-lg w-full max-w-4xl h-64 flex flex-col justify-center items-center mb-6">
        {images[0] ? (
          <img src={images[0]!} alt="Main" className="h-full w-full object-cover rounded-lg" />
        ) : (
          <>
            <p className="font-semibold mb-2">Image Here</p>
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 0)} />
          </>
        )}
      </div>

      {/* Section 2 - Two Images Side by Side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-4xl mb-6">
        {[1, 2].map((i) => (
          <div key={i} className="border-2 border-dashed rounded-lg h-64 flex flex-col justify-center items-center">
            {images[i] ? (
              <img src={images[i]!} alt={`Side ${i}`} className="h-full w-full object-cover rounded-lg" />
            ) : (
              <>
                <p className="font-semibold mb-2">Image Here</p>
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, i)} />
              </>
            )}
          </div>
        ))}
      </div>

      {/* Section 3 - Cards (Title + Body) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl w-full mb-6">
        {cards.map((card, i) => (
          <div key={i} className="border-2 border-dashed rounded-lg p-4">
            <input
              type="text"
              placeholder="Title here"
              className="w-full mb-2 font-semibold"
              value={card.title}
              onChange={(e) => handleCardChange(i, "title", e.target.value)}
            />
            <textarea
              placeholder="Body text"
              className="w-full text-sm"
              value={card.body}
              onChange={(e) => handleCardChange(i, "body", e.target.value)}
            />
          </div>
        ))}
      </div>

      {/* Section 4 - Additional Image */}
      <div className="border-2 border-dashed rounded-lg w-full max-w-4xl h-64 flex flex-col justify-center items-center mb-6">
        {images[3] ? (
          <img src={images[3]!} alt="Extra" className="h-full w-full object-cover rounded-lg" />
        ) : (
          <>
            <p className="font-semibold mb-2">Image Here</p>
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 3)} />
          </>
        )}
      </div>

      {/* Section 5 - Two Text Blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-4xl mb-6">
        {bodyTexts.slice(0, 2).map((text, i) => (
          <textarea
            key={i}
            placeholder="Body text"
            className="border-2 border-dashed rounded-lg p-4 w-full h-32 text-sm"
            value={text}
            onChange={(e) => handleBodyChange(i, e.target.value)}
          />
        ))}
      </div>

      {/* Section 6 - Two More Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-4xl mb-6">
        {[4, 5].map((i) => (
          <div key={i} className="border-2 border-dashed rounded-lg h-64 flex flex-col justify-center items-center">
            {images[i] ? (
              <img src={images[i]!} alt={`Bottom ${i}`} className="h-full w-full object-cover rounded-lg" />
            ) : (
              <>
                <p className="font-semibold mb-2">Image Here</p>
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, i)} />
              </>
            )}
          </div>
        ))}
      </div>

      {/* Section 7 - Large Body Text */}
      <textarea
        placeholder="Body text"
        className="border-2 border-dashed rounded-lg p-4 w-full max-w-4xl mb-6 h-32 text-sm"
        value={bodyTexts[2]}
        onChange={(e) => handleBodyChange(2, e.target.value)}
      />

      {/* Section 8 - Full-Width Image */}
      <div className="border-2 border-dashed rounded-lg w-full max-w-4xl h-64 flex flex-col justify-center items-center mb-6">
        {images[6] ? (
          <img src={images[6]!} alt="Full" className="h-full w-full object-cover rounded-lg" />
        ) : (
          <>
            <p className="font-semibold mb-2">Image Here</p>
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 6)} />
          </>
        )}
      </div>

      {/* Final Body Text */}
      <textarea
        placeholder="Body text"
        className="border-2 border-dashed rounded-lg p-4 w-full max-w-4xl mb-8 h-32 text-sm"
      />

      {/* Footer Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <button className="px-6 py-2 rounded-full bg-gray-200">Cancel</button>
        <button className="px-6 py-2 rounded-full bg-gray-300">Save</button>
        <button className="px-6 py-2 rounded-full bg-blue-600 text-white">Publish</button>
      </div>
    </div>
  );
};

export default CaseStudiesUploadPage;
