// import Image from "next/image";
// import Facebook from "../../../../public/assets/icons/Facebook.svg";
// import Instagram from "../../../../public/assets/icons/Insta.svg";
// import Tiktok from "../../../../public/assets/icons/tiktok-round-white-icon.svg";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

const Socials: React.FC = () => {
  return (
    // <ul className="flex justify-center items-center space-x-6">
    //   <li className="text-center">
    //     <a
    //       href="https://www.instagram.com/slackerevents"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         src={Instagram}
    //         alt="Instagram"
    //         width={32}
    //         height={32}
    //         className="mx-auto"
    //       />
    //     </a>
    //   </li>

    //   <li className="text-center">
    //     <a
    //       href="https://www.facebook.com/slackerevents/"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         src={Facebook}
    //         alt="Facebook"
    //         width={32}
    //         height={32}
    //         className="mx-auto"
    //       />
    //     </a>
    //   </li>

    //   <li className="text-center">
    //     <a
    //       href="https://www.tiktok.com/"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         src={Tiktok}
    //         alt="tiktok"
    //         width={32}
    //         height={32}
    //         className="mx-auto"
    //       />
    //     </a>
    //   </li>
    // </ul>
    <div
      className="flex gap-6 justify-center items-center w-full"
      style={{ marginLeft: "40px" }}
    >
      <a
        href="https://www.facebook.com/slackerevents"
        className="transition hover:scale-110"
        style={{
          animation: "jump 0.8s ease-in-out infinite",
          animationDelay: "0s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.animationPlayState = "paused";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.animationPlayState = "running";
        }}
      >
        <FaFacebookF
          className="text-white hover:text-[#EFFF00] hover:brightness-125"
          size={40}
        />
      </a>
      <a
        href="https://www.instagram.com/slackerevents?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
        className="transition hover:scale-110"
        style={{
          animation: "jump 0.8s ease-in-out infinite",
          animationDelay: "0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.animationPlayState = "paused";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.animationPlayState = "running";
        }}
      >
        <FaInstagram
          className="text-white hover:text-[#EFFF00] hover:brightness-125 hover:drop-shadow-[0_0_4px_#EFFF00]"
          size={40}
        />
      </a>
      <a
        href="https://www.tiktok.com/"
        className="transition hover:scale-110"
        style={{
          animation: "jump 0.8s ease-in-out infinite",
          animationDelay: "0.4s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.animationPlayState = "paused";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.animationPlayState = "running";
        }}
      >
        <FaTiktok
          className="text-white hover:text-[#EFFF00] hover:brightness-125"
          size={40}
        />
      </a>
    </div>
  );
};

export default Socials;
