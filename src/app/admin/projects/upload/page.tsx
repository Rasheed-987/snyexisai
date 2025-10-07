 'use client';
import React from 'react'
import { useState } from 'react'

const ProjectUploadPage = () => {
  const [projectTitle, setProjectTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [banner, setBanner] = useState<string | null>(null);
  const [cards, setCards] = useState(
    Array(6).fill({ title: "", body: "" })
  );
  const [images, setImages] = useState<(string | null)[]>([null, null]);
  const [extraCards, setExtraCards] = useState(
    Array(3).fill({ title: "", body: "" })
  );

  // Handle image upload preview
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

  const handleCardChange = (section: "cards" | "extra", index: number, field: "title" | "body", value: string) => {
    const updater = section === "cards" ? [...cards] : [...extraCards];
    updater[index] = { ...updater[index], [field]: value };
    section === "cards" ? setCards(updater) : setExtraCards(updater);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      {/* Project Title */}
      <input
        type="text"
        placeholder="Project Title Here"
        className="border-2 border-dashed rounded-lg px-4 py-2 text-center text-lg font-semibold mb-4 w-1/2"
        value={projectTitle}
        onChange={(e) => setProjectTitle(e.target.value)}
      />

      {/* Project Banner */}
      <div className="border-2 border-dashed rounded-xl w-full max-w-4xl h-64 flex flex-col justify-center items-center mb-4">
        {banner ? (
          <img src={banner} alt="Banner" className="h-full w-full object-cover rounded-xl" />
        ) : (
          <>
            <p className="font-semibold text-lg">Project Banner</p>
            <input
              type="file"
              accept="image/*"
              className="mt-2"
              onChange={(e) => handleImageUpload(e)}
            />
          </>
        )}
      </div>

      {/* Tagline */}
      <input
        type="text"
        placeholder="Tagline"
        className="border-2 border-dashed rounded-full px-4 py-2 text-center mb-6 w-1/3"
        value={tagline}
        onChange={(e) => setTagline(e.target.value)}
      />

      {/* Section Title */}
      <input
        type="text"
        placeholder="Add Title"
        className="border-2 border-dashed rounded-lg px-4 py-2 text-center mb-4 w-1/2"
      />

      {/* Cards Grid */}
      <div className="grid grid-cols-3 gap-4 max-w-5xl w-full mb-6">
        {cards.map((card, i) => (
          <div key={i} className="border-2 border-dashed rounded-lg p-4">
            <input
              type="text"
              placeholder="Title here"
              className="w-full mb-2 font-semibold"
              value={card.title}
              onChange={(e) => handleCardChange("cards", i, "title", e.target.value)}
            />
            <textarea
              placeholder="Body text"
              className="w-full text-sm"
              value={card.body}
              onChange={(e) => handleCardChange("cards", i, "body", e.target.value)}
            />
          </div>
        ))}
      </div>

      {/* Image Upload Section */}
      <div className="grid grid-cols-2 gap-4 max-w-4xl w-full mb-6">
        {images.map((img, i) => (
          <div key={i} className="border-2 border-dashed rounded-lg h-64 flex flex-col justify-center items-center">
            {img ? (
              <img src={img} alt={`Uploaded ${i}`} className="h-full w-full object-cover rounded-lg" />
            ) : (
              <>
                <p className="font-semibold mb-2">Image Here</p>
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, i)} />
              </>
            )}
          </div>
        ))}
      </div>

      {/* Extra Info Section */}
      <div className="grid grid-cols-2 gap-4 max-w-4xl w-full mb-6">
        {extraCards.slice(0, 2).map((card, i) => (
          <div key={i} className="border-2 border-dashed rounded-lg p-4">
            <input
              type="text"
              placeholder="Title here"
              className="w-full mb-2 font-semibold"
              value={card.title}
              onChange={(e) => handleCardChange("extra", i, "title", e.target.value)}
            />
            <textarea
              placeholder="Body text"
              className="w-full text-sm"
              value={card.body}
              onChange={(e) => handleCardChange("extra", i, "body", e.target.value)}
            />
          </div>
        ))}
      </div>

      {/* Full-width Extra Card */}
      <div className="border-2 border-dashed rounded-lg p-4 max-w-4xl w-full mb-8">
        <input
          type="text"
          placeholder="Title here"
          className="w-full mb-2 font-semibold"
          value={extraCards[2].title}
          onChange={(e) => handleCardChange("extra", 2, "title", e.target.value)}
        />
        <textarea
          placeholder="Body text"
          className="w-full text-sm"
          value={extraCards[2].body}
          onChange={(e) => handleCardChange("extra", 2, "body", e.target.value)}
        />
      </div>

      {/* Footer Buttons */}
      <div className="flex gap-4">
        <button className="px-6 py-2 rounded-full bg-gray-200">Cancel</button>
        <button className="px-6 py-2 rounded-full bg-gray-300">Save</button>
        <button className="px-6 py-2 rounded-full bg-blue-600 text-white">Publish</button>
      </div>
    </div>
  );
};

export default ProjectUploadPage;