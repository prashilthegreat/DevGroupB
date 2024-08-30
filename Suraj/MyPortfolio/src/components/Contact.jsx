import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FaLinkedin, FaGithub, FaTwitter, FaFilePdf } from "react-icons/fa";
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const inputVariants = {
  initial: { scale: 1, borderColor: "#fff" },
  focused: { scale: 1.05, borderColor: "#4f46e5" }
};

const buttonVariants = {
  initial: { scale: 1, backgroundColor: "#4f46e5" },
  hover: { scale: 1.1, backgroundColor: "#4338ca" }
};

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Suraj KC",
          from_email: form.email,
          to_email: "surajjkc09@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );
      setForm({
        name: "",
        email: "",
        message: "",
      });
      alert("Thank you. I will get back to you as soon as possible.");
    } catch (error) {
      console.error("Email sending error:", error);
      alert("Ahh, something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}>
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-gradient-to-z from-black via-[#cde2e6] to-black p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form ref={formRef} onSubmit={handleSubmit} className='mt-12 flex flex-col gap-8'>
          <motion.label className='flex flex-col' initial="initial" whileFocus="focused">
            <span className='text-white font-medium mb-4'>Your Name</span>
            <motion.input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
              variants={inputVariants}
            />
          </motion.label>
          <motion.label className='flex flex-col' initial="initial" whileFocus="focused">
            <span className='text-white font-medium mb-4'>Your email</span>
            <motion.input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email address?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
              variants={inputVariants}
            />
          </motion.label>
          <motion.label className='flex flex-col' initial="initial" whileFocus="focused">
            <span className='text-white font-medium mb-4'>Your Message</span>
            <motion.textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
              variants={inputVariants}
            />
          </motion.label>

          <motion.button
            type='submit'
            className='py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md'
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
          >
            {loading ? "Sending..." : "Send"}
          </motion.button>
        </form>

        {/* Social Media Icons */}
        <div className='flex gap-4 mt-8 justify-center'>
          <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-white text-2xl hover:text-[#0077b5]" />
          </a>
          <a href="https://github.com/your-profile" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-white text-2xl hover:text-[#171515]" />
          </a>
          <a href="https://twitter.com/your-profile" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-white text-2xl hover:text-[#1DA1F2]" />
          </a>
        </div>

        {/* Resume Button with Icon */}
        <div className='mt-4 justify-items-center'>
          <a
            href="path_to_your_resume.pdf" // Replace with your resume path
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center gap-2 py-1 px-20 rounded-lg bg-[#4f46e5] text-white font-medium hover:bg-[#4338ca] transition"
          >
            <FaFilePdf className="text-xl text-justify" />
            <span>View my Resume</span>
          </a>
        </div>

        {/* Copyright Notice */}
        <footer className='mt-12 text-center text-white text-sm'>
          <p>&copy; {new Date().getFullYear()} Suraj KC. All rights reserved.</p>
        </footer>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
