import { FaPhone } from 'react-icons/fa';
const TopBar = () => {
  return (
    <div className="w-full items-center justify-between text-sm px-4  flex md:px-16 bg-gray-100 py-2">
      <div>
        <a href="tel:+85517935151" className="flex gap-2">
          <span className="text-xs">
            <FaPhone />
          </span>
          <span className="font-medium"> (+855) 17935151</span>
        </a>
      </div>
      <div className="flex items-center gap-6">
        <p>USD $</p>
        <p>English</p>
      </div>
    </div>
  );
};

export default TopBar;
