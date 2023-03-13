import React from 'react'
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion'
import { styles } from '../styles'
import { services } from '../constant'
import { fadeIn, textVariant } from '../utils/motion'
import { SectionWrapper } from '../hoc'


const ServiceCard = ({ title, icon, index }) => {
  return (
    <Tilt className='xs:w-[250px] w-full'>
      <motion.div
        variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
        className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
      >
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
        >
          <img src={icon} alt={title} className='w-16 h-16 object-contain' />
          <h3 className='text-white text-[20px] font-bold text-center'>{title}</h3>
        </div>
      </motion.div>
    </Tilt>
  )
}

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>Introduction</p>
        <h2 className={`${styles.sectionHeadText}`}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        Hi, I'm a full stack web developer with a passion for creating cutting-edge web applications. I specialize in using React and TypeScript to build interactive, responsive user interfaces that provide a seamless user experience. With my expertise in Node.js, I can also develop efficient and scalable back-end systems that can handle high levels of traffic and data. Additionally, I have experience with Three.js, which allows me to create stunning 3D visualizations and immersive experiences on the web. Whether you're looking to build a new web app or improve an existing one, I have the skills and knowledge to help you achieve your goals. Let's collaborate and bring your vision to life!
      </motion.p>
      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  )
}

export default SectionWrapper(About, "about")