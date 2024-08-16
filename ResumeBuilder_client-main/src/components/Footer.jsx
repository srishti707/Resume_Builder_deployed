import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-violet-500 flex text-sm text-white justify-center items-center py-4 px-5 md:px-8">
      <div className="flex justify-between w-3/4 md:w-[50%] lg:w-[25%] items-center">
        © Designed by Srishti Bhatia
        <a href="https://www.linkedin.com/in/srishti-bhatia-837071231/" target="_blank">
          <FaLinkedinIn />
        </a>
        <a href="https://github.com/srishti707" target="_blank">
          <FaGithub />
        </a>
        <a href="https://www.instagram.com/srishti_7070?igsh=bjhkcW14MzF1ZmZp" target="_blank">
          <FaInstagram />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
