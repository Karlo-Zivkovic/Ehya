import { useContext } from 'react';
import {
  AiFillHeart,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
  AiOutlineWhatsApp,
} from 'react-icons/ai';
import { BsTelegram } from 'react-icons/bs';
import { FaFacebook, FaReddit } from 'react-icons/fa';
import { AppContext } from '../context/context';

function AppFooter() {
  const { toggleMenu } = useContext(AppContext);
  return (
    <div className="md:flex md:flex-col md:gap-6 bg-blue-950 text-slate-400 p-6">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="grid grid-cols-2 gap-y-6 md:order-2 md:flex-1 lg:grid-cols-4">
          <div>
            <h2 className="text-slate-400 text-xl font-semibold">Product</h2>
            <div className="flex flex-col gap-3 mt-4">
              <p>Features</p>
              <p>Documentation</p>
              <p>Referral Program</p>
              <p>Pricing</p>
            </div>
          </div>
          <div>
            <h2 className="text-slate-400 text-xl font-semibold">Services</h2>
            <div className="flex flex-col gap-3 mt-4 text-sm">
              <p>Design</p>
              <p>Themes</p>
              <p>Illustrations</p>
              <p>Ui Kit</p>
            </div>
          </div>
          <div>
            <h2 className="text-slate-400 text-xl font-semibold">Company</h2>
            <div className="flex flex-col gap-3 mt-4 text-sm">
              <p>About</p>
              <p>Terms</p>
              <p>Privacy Policy</p>
              <p>Careers</p>
            </div>
          </div>
          <div>
            <h2 className="text-slate-400 text-xl font-semibold">More</h2>
            <div className="flex flex-col gap-3 mt-4 text-sm">
              <p>Documentation</p>
              <p>License</p>
              <p>Changelog</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:order-1 md:place-self-start  justify-center items-center gap-4 md:place-items-start md:pt-4">
          {!toggleMenu && (
            <img
              src="/Logo.svg"
              alt="logo"
              className="w-28 brightness-0  invert"
            />
          )}
          <p className="text-xs">
            Build a modern and creative webiste with crealand
          </p>
          <div className="flex gap-3">
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://twitter.com/intent/tweet?url=${encodeURI(
                window.location.href,
              )}`}
            >
              <AiOutlineTwitter className="w-6 h-auto" />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href={`http://www.reddit.com/submit?url=${encodeURI(
                window.location.href,
              )}}`}
            >
              <FaReddit className="w-6 h-auto" />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://api.whatsapp.com/send/?text=${encodeURI(
                window.location.href,
              )}`}
            >
              <AiOutlineWhatsApp className="w-6 h-auto" />
            </a>

            <a
              target="_blank"
              rel="noreferrer"
              href={`https://www.facebook.com/dialog/share?app_id=1180206992856877&display=popup&href=${encodeURI(
                window.location.href,
              )}}`}
            >
              <FaFacebook className="w-6 h-auto" />
            </a>
          </div>
        </div>
      </div>
      <div className="hidden md:flex flex-col items-center space-y-4 md:col-span-12 lg:col-span-10">
        <div className="bg-blue-400 text-white p-3 rounded-full">
          <AiFillHeart className="w-7 h-auto" />
        </div>
        <p className="font-bold italic text-dark-light">
          Copyright © 2023. Crafted with love.
        </p>
      </div>
    </div>
  );
}

export default AppFooter;

