import { songs } from '@/app/utils/data';
import Image from 'next/image';
import React, { useState } from 'react';
import {
  FaRandom,
  FaStepBackward,
  FaPause,
  FaPlay,
  FaStepForward,
  FaRedoAlt,
  FaVolumeUp,
} from 'react-icons/fa';

const MediaPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong] = useState(songs[0]);
  const [volume] = useState(80);
  const [progress] = useState(30);

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <>
      <div className="fixed left-4 right-4 bottom-12 lg:left-0 lg:right-0 lg:bottom-0 z-4 bg-indigo-900/90 backdrop-blur-lg border border-white/30 lg:border-t lg:border-white/10 shadow-xl shadow-purple-900/20 rounded-t-[38px] lg:rounded-none px-4  transition-all duration-300">
        <div className="kontener mx-auto px-4 py-1 ">
          <div className="flex items-center gap-4">
            {/* Song Info */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0 w-1/4">
              <Image
                src={currentSong.cover}
                alt={currentSong.title}
                width={20}
                height={20}
                className="rounded-md h-11 w-11"
              />
              <div className="hidden sm:block">
                <p className="font-medium truncate">{currentSong.title}</p>
                <p className="text-xs text-indigo-300">{currentSong.artist}</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex-1 flex flex-col items-center">
              <div className="flex items-center gap-4 mb-1">
                <button className="text-indigo-300 hover:text-white">
                  <FaRandom className="text-sm" />
                </button>
                <button className="text-indigo-300 hover:text-white">
                  <FaStepBackward />
                </button>
                <button
                  className=" text-indigo-300 rounded-full p-2 "
                  onClick={togglePlay}
                >
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <button className="text-indigo-300 hover:text-white">
                  <FaStepForward />
                </button>
                <button className="text-indigo-300 hover:text-white">
                  <FaRedoAlt className="text-sm" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="w-full hidden lg:flex items-center gap-2">
                <span className="text-xs text-indigo-300">1:25</span>
                <div className="flex-1 h-1 bg-indigo-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <span className="text-xs text-indigo-300">
                  {currentSong.duration}
                </span>
              </div>
            </div>

            {/* Volume */}
            <div className="hidden lg:flex items-center gap-2 w-1/4 justify-end">
              <FaVolumeUp className="text-indigo-300" />
              <div className="w-24 h-1 bg-indigo-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full"
                  style={{ width: `${volume}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-8 lg:hidden"></div>
      </div>
    </>
  );
};

export default MediaPlayer;
