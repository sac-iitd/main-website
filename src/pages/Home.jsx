import React, { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import ClubCard from "../components/ui/ClubCard";
import { ScrollText, Megaphone, HandHelping } from "lucide-react";

// Import all images
import backgroundImage from "../assets/activities/background_image.png";
import iitDelhiImage from "../assets/home/iit_delhi.jpeg";
import sacLogo from "../assets/home/sac_logo.png";
import sacCentreImage from "../assets/home/sac_centre_bg_removed.png";
import bhmLogo from "../assets/home/bhm_logo.png";
import brcaLogo from "../assets/home/brca.png";
import bswLogo from "../assets/home/bsw_logo.png";
import bsaLogo from "../assets/home/bsa.png";
import bspLogo from "../assets/home/bsp_logo.png";
import iitdClubsImage from "../assets/home/IITDClubs.png";

function Home() {
  const { theme } = useTheme();
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fullText = "Welcomes You!";
  const typeSpeed = 60;
  const deleteSpeed = 50;
  const deleteDelay = 2000;

  useEffect(() => {
    let timeout;

    if (!isDeleting) {
      if (currentIndex < fullText.length) {
        timeout = setTimeout(() => {
          setTypedText(fullText.slice(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        }, typeSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, deleteDelay);
      }
    } else {
      if (currentIndex > 0) {
        timeout = setTimeout(() => {
          setTypedText(fullText.slice(0, currentIndex - 1));
          setCurrentIndex(currentIndex - 1);
        }, deleteSpeed);
      } else {
        setIsDeleting(false);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting, fullText.length]);

  return (
    <div
      className="w-full overflow-hidden main"
      style={{
        backgroundImage: theme === "light" ? `url(${backgroundImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Hero Section */}
      <section
        className="relative w-full h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${iitDelhiImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative z-10 flex flex-col sm:flex-col gap-4 text-center mx-6 sm:mx-[200px] md:py-16 pb-8 px-6 lg:px-12 items-center justify-start">
          {/* Logo section */}
          <div className="flex md:mt-[50px] mt-[150px] md:mb-6 sm:mb-0 sm:mr-6">
            <img
              className="w-32 sm:w-40 md:w-48 h-auto object-contain"
              src={sacLogo}
              alt="SAC Logo"
            />
          </div>

          <div className="text-center sm:text-left">
            <h2 className="text-shadow-md text-2xl sm:text-4xl md:text-7xl font-extrabold text-gray-300 mb-4 md:mb-2">
              Student Affairs Council
            </h2>
            <div className="text-center flex flex-col justify-center items-center">
              <p className="text-base sm:text-xl md:text-3xl text-[#FFD700] font-medium">
                IIT Delhi
              </p>
              <hr className="my-4 border-[#FFD700] border-t-2 w-3/4 sm:w-3/4 lg:w-[300px]" />
              <div className="typed-container">
                <div className="text-gray-300 text-lg sm:text-xl md:text-2xl font-semibold inline-block">
                  {typedText}
                  <span className="animate-pulse">|</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="px-4 my-10 w-100% md:py-1 md:px-5 lg:py-2 lg:px-20 flex flex-col justify-center items-center">
        <div
          className="shadow-lg rounded-xl overflow-hidden w-100% md:w-[80vw] lg:w-[60vw] border-t-4 border-[#FFD700]"
          style={{ backgroundColor: "var(--card-bg)", color: "var(--text-color-secondary)" }}
        >
          <div className="py-8 px-5 md:py-10 md:px-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-wide">ABOUT US</h2>
            <hr className="mx-auto mt-3 mb-6 w-16 border-t-2 border-[#FFD700]" />
            <p className="md:text-xl max-w-2xl mx-auto opacity-90">
              Student Affairs Council is the apex student body of IIT Delhi. It is
              responsible for:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8">
              {[
                {
                  icon: ScrollText,
                  text: "Formulating policies pertaining to all non-academic student affairs.",
                },
                {
                  icon: Megaphone,
                  text: "Presenting student views on issues of collective concern through representation in various policy and decision-making bodies.",
                },
                {
                  icon: HandHelping,
                  text: "Addressing students' problems through the institutional framework of IIT Delhi.",
                },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex flex-col items-center gap-3 rounded-lg p-5 bg-white/5 border border-white/10 hover:border-[#FFD700]/60 transition-colors"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#FFD700]/15">
                    <Icon className="w-6 h-6 text-[#FFD700]" />
                  </div>
                  <p className="text-sm md:text-base leading-relaxed opacity-90">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Three Column Layout */}
      <div className="container mx-auto mb-20 pt-10 px-4">
        <div className="grid  gap-3 sm:gap-4 md:gap-8 items-start">
          {/* Left Column */}
          <div className="w-30% md:w-auto flex flex-col items-end gap-2 sm:gap-4 md:gap-10 col-start-1">
            <ClubCard
              className="ml-0"
              href="https:/home/bhm.iitd.ac.in"
              imageSrc={bhmLogo}
              imageAlt="BHM Logo"
              title="Board for Hostel Management"
              description="Manages hostel facilities and student accommodation"
              external={true}
            />
            <ClubCard
              className="ml-0"
              href="https://brca.iitd.ac.in"
              imageSrc={brcaLogo}
              imageAlt="BRCA Logo"
              title="Board for Recreational and Creative Activities"
              description="Organizes cultural and recreational events"
              external={true}
            />
            <ClubCard
              className="ml-0"
              href="https://bsw.iitd.ac.in"
              imageSrc={bswLogo}
              imageAlt="BSW Logo"
              title="Board for Student Welfare"
              description="Focuses on student well-being and support"
              external={true}
            />
          </div>

          {/* Middle Column */}
          <div className="w-40% md:w-auto flex items-center justify-center m-0 md:p-8 col-start-2 row-span-3">
            <div className="flex flex-col items-center justify-center">
              <img
                src={sacCentreImage}
                alt="SAC Centre"
                className="w-full max-w-[140px] sm:max-w-[220px] md:max-w-xl h-auto pb-5"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="w-30% md:w-auto flex flex-col gap-2 sm:gap-4 md:gap-10 col-start-3">
            <ClubCard
              href="https://bsa.iitd.ac.in"
              imageSrc={bsaLogo}
              imageAlt="BSA Logo"
              title="Board for Student Activities"
              description="Coordinates student activities and events"
              external={true}
            />
            <ClubCard
              href="https://bsp.iitd.ac.in"
              imageSrc={bspLogo}
              imageAlt="BSP Logo"
              title="Board for Student Publications"
              description="Manages student publications and media"
              external={true}
            />
            <ClubCard
              href="/activities"
              imageSrc={iitdClubsImage}
              imageAlt="IITD Clubs"
              title="IIT Delhi Clubs"
              description="Various student clubs and organizations"
              external={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
