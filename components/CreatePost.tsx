import React, { useState, useRef } from 'react';
import { Camera, Image as ImageIcon, X, Wand2, RefreshCw, Send, Type, Music2, ChevronRight } from 'lucide-react';
import { generateCaptionFromImage } from '../services/geminiService';
import { User, Song } from '../types';
import { MOCK_SONGS } from '../constants';

interface CreatePostProps {
  currentUser: User;
}

const CreatePost: React.FC<CreatePostProps> = ({ currentUser }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [showMusicPicker, setShowMusicPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateCaption = async () => {
    if (!selectedImage) return;
    setIsGenerating(true);
    
    // Extract MIME type and Base64 data
    const matches = selectedImage.match(/^data:(.+);base64,(.+)$/);
    if (matches) {
        const mimeType = matches[1];
        const base64Data = matches[2];
        const aiCaption = await generateCaptionFromImage(base64Data, mimeType);
        setCaption(aiCaption);
    }
    
    setIsGenerating(false);
  };

  const clearImage = () => {
    setSelectedImage(null);
    setCaption('');
    setSelectedSong(null);
  };

  if (showMusicPicker) {
      return (
          <div className="h-screen w-full bg-black text-white flex flex-col pb-20 animate-in slide-in-from-bottom">
              <div className="flex items-center p-4 border-b border-zinc-900">
                  <X size={24} className="cursor-pointer" onClick={() => setShowMusicPicker(false)} />
                  <span className="flex-1 text-center font-bold">Select Audio</span>
                  <div className="w-6"></div>
              </div>
              <div className="p-4 space-y-2 overflow-y-auto">
                  {MOCK_SONGS.map(song => (
                      <div 
                        key={song.id} 
                        className="flex items-center p-2 hover:bg-zinc-900 rounded-lg cursor-pointer"
                        onClick={() => {
                            setSelectedSong(song);
                            setShowMusicPicker(false);
                        }}
                      >
                          <img src={song.coverUrl} className="w-12 h-12 rounded bg-zinc-800" alt={song.title} />
                          <div className="ml-3 flex-1">
                              <p className="font-bold text-sm">{song.title}</p>
                              <p className="text-zinc-500 text-xs">{song.artist}</p>
                          </div>
                          {selectedSong?.id === song.id && (
                              <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
                          )}
                      </div>
                  ))}
              </div>
          </div>
      )
  }

  return (
    <div className="h-screen w-full bg-black text-white flex flex-col pb-20">
      {/* Header */}
      <div className="flex justify-between items-center p-4 z-10 bg-black/95">
        <X size={28} className="cursor-pointer" onClick={clearImage} />
        <span className="font-bold text-lg">New Post</span>
        <button className="text-emerald-400 font-bold text-lg disabled:opacity-50" disabled={!selectedImage}>
            Post
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative bg-zinc-900 overflow-hidden rounded-t-3xl">
        {!selectedImage ? (
          /* Empty State - Camera/Gallery Prompt */
          <div className="flex flex-col items-center space-y-8 animate-in fade-in zoom-in duration-300">
            <div 
                className="w-32 h-32 rounded-full bg-zinc-800 flex items-center justify-center border-4 border-emerald-500/30 cursor-pointer hover:bg-zinc-700 transition"
                onClick={() => fileInputRef.current?.click()}
            >
              <Camera size={48} className="text-emerald-400" />
            </div>
            <p className="text-zinc-400 font-medium">Tap to capture or upload</p>
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*" 
            />
            
            <div className="flex space-x-4 mt-8">
               <button className="flex items-center space-x-2 bg-zinc-800 px-4 py-2 rounded-full">
                  <ImageIcon size={18} />
                  <span>Gallery</span>
               </button>
               <button className="flex items-center space-x-2 bg-zinc-800 px-4 py-2 rounded-full">
                  <Type size={18} />
                  <span>Text</span>
               </button>
            </div>
          </div>
        ) : (
          /* Image Preview & Editor */
          <div className="w-full h-full flex flex-col relative">
            <div className="flex-1 relative bg-black flex items-center justify-center">
                <img src={selectedImage} alt="Preview" className="max-h-full max-w-full object-contain" />
                
                {/* AI Tools Overlay */}
                <div className="absolute bottom-4 right-4">
                    <button 
                        onClick={handleGenerateCaption}
                        disabled={isGenerating}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isGenerating ? <RefreshCw className="animate-spin" size={18} /> : <Wand2 size={18} />}
                        <span>AI Caption</span>
                    </button>
                </div>
            </div>

            {/* Caption Input */}
            <div className="bg-zinc-900 p-4 pb-24 rounded-t-2xl border-t border-zinc-800">
                <div className="flex items-start space-x-3">
                    <img src={currentUser.avatar} className="w-10 h-10 rounded-full object-cover" alt="Me" />
                    <div className="flex-1">
                        <textarea
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="Write a caption..."
                            className="w-full bg-transparent text-white placeholder-zinc-500 resize-none outline-none text-sm min-h-[80px]"
                        />
                    </div>
                </div>
                
                {/* Music Selector Row */}
                <div 
                    className="flex justify-between items-center mt-2 py-3 border-t border-zinc-800 cursor-pointer hover:bg-zinc-800/50 -mx-4 px-4 transition-colors"
                    onClick={() => setShowMusicPicker(true)}
                >
                   <div className="flex items-center text-sm text-white">
                       <Music2 size={18} className="mr-2" />
                       <span className={selectedSong ? 'text-emerald-400 font-medium' : ''}>
                           {selectedSong ? `${selectedSong.title} • ${selectedSong.artist}` : 'Add Music'}
                       </span>
                   </div>
                   <ChevronRight size={16} className="text-zinc-500" />
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-zinc-800/50 text-zinc-400 text-sm">
                   <span>Add Location</span>
                   <span>Tag People</span>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePost;