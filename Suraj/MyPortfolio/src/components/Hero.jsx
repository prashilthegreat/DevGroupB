import { motion } from "framer-motion";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto bg-gradient-to-r from-black via-[#cde2e6] to-black">
      <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}>
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#daa520] animate-pulse shadow-[0_0_15px_5px] shadow-[#daa520]/50"></div>
          <div className="w-1 sm:h-80 h-40 violet-gradient from-[#daa520] via-[#ff6347] to-[#ff4500] animate-pulse"></div>
        </div>
        <div className="transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-[#daa520]/50 hover:border-[#daa520] relative">
          <motion.h1
            className="text-5xl font-bold text-white fade-in"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Hi, I'm <span className="text-gradient">SURAJ</span>
          </motion.h1>
          <p className="text-white-100 mt-2 opacity-90 transition-opacity duration-300">
            <span className="typing-effect">I develop visually appealing user interfaces and modern web applications.</span>
          </p>
        </div>
      </div>

      <ComputersCanvas />

      <div className="absolute bottom-1 w-full flex justify-center items-center">
        <a href="#about" className="scroll-smooth">
          <div className="w-[40px] h-[72px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2 hover:border-[#daa520] hover:shadow-xl hover:shadow-[#daa520] transition-all duration-300 transform hover:scale-110">
            <motion.div
              animate={{ y: [0, 30, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-4 h-4 rounded-full bg-secondary mb-1 hover:bg-[#daa520] transition-all duration-300 shadow-md"
            />
          </div>
        </a>
      </div>
    </section>
  );
}

export default Hero;
