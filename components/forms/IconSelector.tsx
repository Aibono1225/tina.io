import { useState } from 'react';
import { AiOutlineUser, AiOutlineUsergroupAdd } from 'react-icons/ai';
import { BiBadge, BiSupport } from 'react-icons/bi';
import { CgCrown } from 'react-icons/cg';
import {
  FaAngleDown,
  FaAngleUp,
  FaClock,
  FaCloudDownloadAlt,
  FaCodeBranch,
  FaDatabase,
  FaDesktop,
  FaFileAlt,
  FaGithub,
  FaHandPointer,
  FaLockOpen,
  FaMarkdown,
  FaPuzzlePiece,
  FaRegStar,
  FaShare,
  FaUnlock,
} from 'react-icons/fa';
import { GoPeople } from 'react-icons/go';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { ImCross } from 'react-icons/im';
import { IoMdBook } from 'react-icons/io';
import { SlLock } from 'react-icons/sl';
import { TbPlugConnected } from 'react-icons/tb';

const icons = {
  FaClock,
  FaUnlock,
  FaCodeBranch,
  FaCloudDownloadAlt,
  FaPuzzlePiece,
  FaMarkdown,
  FaGithub,
  FaFileAlt,
  AiOutlineUser,
  BiBadge,
  BiSupport,
  AiOutlineUsergroupAdd,
  CgCrown,
  HiOutlineSparkles,
  TbPlugConnected,
  SlLock,
  FaDatabase,
  FaShare,
  FaDesktop,
  FaLockOpen,
  FaHandPointer,
  FaRegStar,
  IoMdBook,
  GoPeople,
};

const IconSelector = ({ input }) => {
  const iconKeys = Object.keys(icons);
  const [selectedIcon, setSelectedIcon] = useState(input.value || '');
  const [isMinimized, setIsMinimized] = useState(true);

  const handleIconChange = (iconKey) => {
    setSelectedIcon(iconKey);
    input.onChange(iconKey);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const TinaButtonClasses =
    'text-sm mb-2 shadow focus:shadow-outline focus:border-blue-500 w-full border border-gray-100 hover:border-gray-200 text-gray-500 hover:text-blue-400 focus:text-blue-500 rounded-md';

  return (
    <div>
      <button
        type="button"
        onClick={toggleMinimize}
        className={`${TinaButtonClasses} bg-white hover:bg-gray-50`}
      >
        <span className="inline-flex items-center m-2">
          {isMinimized ? (
            <>
              Show icons <FaAngleDown className="m-1" />
            </>
          ) : (
            <>
              Hide icons <FaAngleUp className="m-1" />
            </>
          )}
        </span>
      </button>
      {!isMinimized && (
        <div className="grid grid-cols-2 gap-2">
          <div
            onClick={() => handleIconChange('')}
            className={`${TinaButtonClasses} flex items-center cursor-pointer p-2 ${
              selectedIcon === '' ? 'bg-blue-200' : 'bg-white'
            }`}
          >
            <ImCross className="mr-2" />{' '}
            <span className="text-xs">No Icon</span>
          </div>
          {iconKeys.map((key) => {
            const IconComponent = icons[key];
            const trimmedKey = key.slice(2);
            return (
              <div
                key={key}
                onClick={() => handleIconChange(key)}
                className={`${TinaButtonClasses} flex items-center cursor-pointer p-2 ${
                  selectedIcon === key ? 'bg-blue-200' : 'bg-white'
                }`}
              >
                <IconComponent
                  color={selectedIcon === key ? 'blue' : 'black'}
                  size={16}
                  className="mr-2"
                />
                <span className="text-xs">{trimmedKey}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default IconSelector;
