'use client';
import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import {UploadBox} from '@/components/upload/UploadBox';

const CaseStudiesUploadPage: React.FC = () => {
  const [caseTitle, setCaseTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [banner, setBanner] = useState<string | null>(null);
  // images[] will hold all image slots in the wireframe in order.
  // Increase size if you add more slots in future.
  const [images, setImages] = useState<(string | null)[]>(
    // slots index guide (for maintainability):
    // 0: big Image Here (after What we did)
    // 1,2: two square Image Here (pair)
    // 3: full-width Image Here (middle)
    // 4,5: two image squares (lower)
    // 6: full-width Image Here (lower)
    // 7,8: bottom two Image Here (near last)
    // 9: final full-width Image Here (near bottom)
    Array(10).fill(null)
  );

  // Text cards and small title/body boxes to match screenshot.
  const [leftTextBox, setLeftTextBox] = useState(''); // "Text here" small box
  const [whatWeDid, setWhatWeDid] = useState(''); // "What we did"
  const [addLine, setAddLine] = useState(''); // "+ Add line"

  // A central large title + body card
  const [largeCard, setLargeCard] = useState({ title: '', body: '' });

  // two small title/body cards (pair)
  const [smallCardsA, setSmallCardsA] = useState([
    { title: '', body: '' },
    { title: '', body: '' },
  ]);

  // two small title/body cards lower (another pair)
  const [smallCardsB, setSmallCardsB] = useState([
    { title: '', body: '' },
    { title: '', body: '' },
  ]);

  // two small title/body cards further down
  const [smallCardsC, setSmallCardsC] = useState([
    { title: '', body: '' },
    { title: '', body: '' },
  ]);

  // body text blocks
  const [bodyTextTop, setBodyTextTop] = useState('');
  const [bodyTextBottom, setBodyTextBottom] = useState('');

  // handle uploading and previewing images, index optional for images[] or banner
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    if (typeof index === 'number') {
      const newImgs = [...images];
      newImgs[index] = url;
      setImages(newImgs);
    } else {
      setBanner(url);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 flex flex-col items-center">
      {/* Project Title */}
      <input
        type="text"
        placeholder="Project Title Here"
        className="border-2 border-dashed rounded-full px-6 py-2 text-center text-lg font-semibold mb-4 w-full max-w-lg"
        value={caseTitle}
        onChange={(e) => setCaseTitle(e.target.value)}
      />

      {/* Subtitle */}
      <input
        type="text"
        placeholder="Sub Title Here"
        className="border-2 border-dashed rounded-full px-4 py-2 text-center mb-6 w-full max-w-md"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
      />

      {/* Project Banner (full width) */}
      <div className="w-full max-w-4xl mb-6 h-56">
        <UploadBox
          label="Project Banner"
          image={banner}
          onUpload={(e) => handleImageUpload(e)}
          className="w-full h-full"
        />
      </div>

      {/* Row under banner: left small text box and right "What we did" + "+ Add line" */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-4 mb-6">
        {/* left small text box */}
        <div className="w-full md:w-1/2 border-2 border-dashed rounded-lg p-4">
          <input
            type="text"
            placeholder="Text here"
            className="w-full text-sm"
            value={leftTextBox}
            onChange={(e) => setLeftTextBox(e.target.value)}
          />
        </div>

        {/* right column with "What we did" and "+ Add line" */}
        <div className="w-full md:w-1/2 flex flex-col gap-3 items-end">
          <input
            type="text"
            placeholder="What we did"
            className="border-2 border-dashed rounded-full px-4 py-2 w-40 text-sm text-center"
            value={whatWeDid}
            onChange={(e) => setWhatWeDid(e.target.value)}
          />
          <input
            type="text"
            placeholder="+ Add line"
            className="border-2 border-dashed rounded-full px-4 py-2 w-40 text-sm text-center"
            value={addLine}
            onChange={(e) => setAddLine(e.target.value)}
          />
        </div>
      </div>

      {/* Large Image Here (full width) */}
      <div className="w-full max-w-4xl h-56 mb-6">
        <UploadBox
          label="Image Here"
          image={images[0]}
          onUpload={(e) => handleImageUpload(e, 0)}
          className="w-full h-full"
        />
      </div>

      {/* Two square Image Here side-by-side */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="h-40">
          <UploadBox
            label="Image Here"
            image={images[1]}
            onUpload={(e) => handleImageUpload(e, 1)}
            className="w-full h-full"
          />
        </div>
        <div className="h-40">
          <UploadBox
            label="Image Here"
            image={images[2]}
            onUpload={(e) => handleImageUpload(e, 2)}
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Large Title + Body card */}
      <div className="w-full max-w-4xl border-2 border-dashed rounded-lg p-6 mb-6">
        <input
          type="text"
          placeholder="Title here"
          className="w-full mb-3 font-semibold text-lg"
          value={largeCard.title}
          onChange={(e) => setLargeCard({ ...largeCard, title: e.target.value })}
        />
        <textarea
          placeholder="Body text"
          className="w-full text-sm"
          value={largeCard.body}
          onChange={(e) => setLargeCard({ ...largeCard, body: e.target.value })}
        />
      </div>

      {/* Two small Title/Body boxes side-by-side */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {smallCardsA.map((c, i) => (
          <div key={i} className="border-2 border-dashed rounded-lg p-4">
            <input
              type="text"
              placeholder="Title here"
              className="w-full mb-2 font-semibold"
              value={c.title}
              onChange={(e) => {
                const copy = [...smallCardsA];
                copy[i] = { ...copy[i], title: e.target.value };
                setSmallCardsA(copy);
              }}
            />
            <textarea
              placeholder="Body text"
              className="w-full text-sm"
              value={c.body}
              onChange={(e) => {
                const copy = [...smallCardsA];
                copy[i] = { ...copy[i], body: e.target.value };
                setSmallCardsA(copy);
              }}
            />
          </div>
        ))}
      </div>

      {/* Two image squares */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="h-40">
          <UploadBox
            label="Image Here"
            image={images[3]}
            onUpload={(e) => handleImageUpload(e, 3)}
            className="w-full h-full"
          />
        </div>
        <div className="h-40">
          <UploadBox
            label="Image Here"
            image={images[4]}
            onUpload={(e) => handleImageUpload(e, 4)}
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Two more small Title/Body boxes */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {smallCardsB.map((c, i) => (
          <div key={i} className="border-2 border-dashed rounded-lg p-4">
            <input
              type="text"
              placeholder="Title here"
              className="w-full mb-2 font-semibold"
              value={c.title}
              onChange={(e) => {
                const copy = [...smallCardsB];
                copy[i] = { ...copy[i], title: e.target.value };
                setSmallCardsB(copy);
              }}
            />
            <textarea
              placeholder="Body text"
              className="w-full text-sm"
              value={c.body}
              onChange={(e) => {
                const copy = [...smallCardsB];
                copy[i] = { ...copy[i], body: e.target.value };
                setSmallCardsB(copy);
              }}
            />
          </div>
        ))}
      </div>

      {/* Full-width image (middle) */}
      <div className="w-full max-w-4xl h-56 mb-6">
        <UploadBox
          label="Image Here"
          image={images[5]}
          onUpload={(e) => handleImageUpload(e, 5)}
          className="w-full h-full"
        />
      </div>

      {/* Two square images (lower) */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="h-40">
          <UploadBox
            label="Image Here"
            image={images[6]}
            onUpload={(e) => handleImageUpload(e, 6)}
            className="w-full h-full"
          />
        </div>
        <div className="h-40">
          <UploadBox
            label="Image Here"
            image={images[7]}
            onUpload={(e) => handleImageUpload(e, 7)}
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Mid Body text */}
      <div className="w-full max-w-4xl mb-6">
        <textarea
          placeholder="Body text"
          className="border-2 border-dashed rounded-lg p-6 w-full h-28 text-sm"
          value={bodyTextTop}
          onChange={(e) => setBodyTextTop(e.target.value)}
        />
      </div>

      {/* A larger full-width image */}
      <div className="w-full max-w-4xl h-56 mb-6">
        <UploadBox
          label="Image Here"
          image={images[8]}
          onUpload={(e) => handleImageUpload(e, 8)}
          className="w-full h-full"
        />
      </div>

      {/* Bottom Body text */}
      <div className="w-full max-w-4xl mb-8">
        <textarea
          placeholder="Body text"
          className="border-2 border-dashed rounded-lg p-6 w-full h-24 text-sm"
          value={bodyTextBottom}
          onChange={(e) => setBodyTextBottom(e.target.value)}
        />
      </div>

      {/* Footer actions */}
      <div className="flex gap-4">
        <button className="px-6 py-2 rounded-full bg-gray-200">Cancel</button>
        <button className="px-6 py-2 rounded-full bg-gray-300">Save</button>
        <button className="px-6 py-2 rounded-full bg-blue-600 text-white">Publish</button>
      </div>
    </div>
  );
};

export default CaseStudiesUploadPage;
