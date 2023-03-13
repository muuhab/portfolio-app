import { useState, useRef } from "react"
import { motion } from "framer-motion"
import emailjs from "@emailjs/browser"

import { styles } from "../styles"
import { SectionWrapper } from "../hoc"
import { slideIn } from "../utils/motion"
import { EarthCanvas } from "./canvas"


const serviceId = import.meta.env.VITE_SERVICE_ID;
const templateId = import.meta.env.VITE_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_PUBLIC_KEY;


const Contact = () => {
  const formRef = useRef()
  const [form, setform] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [loading, setloading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setform({ ...form, [name]: value })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setloading(true)
    emailjs.send(
      serviceId,
      templateId,
      {
        from_name: form.name,
        to_name: 'Mohab',
        from_email: form.email,
        to_email: 'mohab.barca@gmail.com',
        message: form.message,
      },
      publicKey
    ).then(() => {
      setloading(false)
      alert('Thanks for your message, I will get back to you soon.')
      setform({
        name: "",
        email: "",
        message: "",
      })
    }, (err) => {
      setloading(false)
      console.log(err)
      alert('Something went wrong, please try again later.')
    }
    )
  }

  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 rounded-2xl p-8'
      >
        <p className={`${styles.sectionSubText}`}>Get in touch</p>
        <h3 className={`${styles.sectionHeadText}`}>Contact.</h3>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows='7'
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
            />
          </label>
          <button type="submit" disabled={form.name === "" || form.email === "" || form.message === ""}
            className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bol shadow-md shadow-primary rounded-xl disabled:bg-gray-500 disabled:text-white disabled:cursor-not-allowed">
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </motion.div>
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact, 'contact')