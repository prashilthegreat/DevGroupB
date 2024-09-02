import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";

const ExperienceCard = ({ experience, index }) => {
  // Determine grid size and adjust layout based on index
  const gridSize = index % 2 === 0 ? "lg:col-span-3 lg:row-span-2" : "lg:col-span-2 lg:row-span-1";

  return (
    <Tilt
      glareEnable={true}
      glareMaxOpacity={0.45}
      scale={1.05}
      transitionSpeed={2500}
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
    >
      <motion.div
        variants={fadeIn("up", "spring", index * 0.5, 0.75)}
        className={`relative p-6 bg-gradient-to-r from-black via-[#cde2e6] to-black rounded-3xl shadow-2xl transform transition-all duration-700 hover:scale-110 hover:rotate-2 ${gridSize}`}
        style={{
          perspective: "1000px", // 3D perspective for depth
        }}
      >
        {/* Icon */}
        <div className="absolute top-4 left-4 w-12 h-12 bg-opacity-20 rounded-full flex justify-center items-center">
          <img
            src={experience.icon}
            alt={experience.company_name}
            className="w-[60%] h-[60%] object-contain"
          />
        </div>

        {/* Content */}
        <div className="relative flex flex-col items-start mt-16">
          <h3 className="text-white text-[24px] font-bold">{experience.title}</h3>
          <p className="text-secondary text-[16px] font-semibold" style={{ margin: 0 }}>
            {experience.company_name}
          </p>
          <p className="text-white text-[14px] mt-2">{experience.date}</p>
        </div>

        {/* Points */}
        <ul className="mt-5 list-disc ml-5 space-y-2">
          {experience.points.map((point, index) => (
            <li key={`experience-point-${index}`} className="text-white text-[14px] pl-1 tracking-wider">
              {point}
            </li>
          ))}
        </ul>
      </motion.div>
    </Tilt>
  );
};

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()} className="text-center">
        <p className={`${styles.sectionSubText}`}>
          What I have done so far
        </p>
        <h2 className={`${styles.sectionHeadText}`}>
          Work Experience.
        </h2>
      </motion.div>

      <div className="mt-20 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
        {experiences.map((experience, index) => (
          <ExperienceCard key={`experience-${index}`} experience={experience} index={index} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
