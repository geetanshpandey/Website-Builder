'use client';
import Navbar from "../components/main/navbar";
import { useState } from "react";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Acme, Archivo_Black, Caveat, Bowlby_One } from 'next/font/google';

// Correctly load fonts with required 'weight' parameter
const acme = Acme({ subsets: ['latin'], weight: ['400'] });
const archivoBlack = Archivo_Black({ subsets: ['latin'], weight: ['400'] });
const caveat = Caveat({ subsets: ['latin'], weight: ['400', '700'] });
const bowlbyOne = Bowlby_One({ subsets: ['latin'], weight: ['400'] });

type FAQItemProps = {
  question: string;
  answer: string;
};

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 border-b">
      <motion.div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h3 className="text-lg text-black">{question}</h3>
        <span className="text-xl text-gray-800">{isOpen ? "▲" : "▼"}</span>
      </motion.div>
      {isOpen && <motion.p className="mt-2 text-gray-600" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>{answer}</motion.p>}
    </div>
  );
}

export default function Home() {
  return (
    <div>
      
      {/* Navbar */}
      <Navbar />
      <div className="min-h-screen bg-white text-black">
        {/* Hero Section */}
        <section id="home" className="pt-28 pb-6 bg-white text-center">
          <div className="max-w-screen-xl mx-auto">
            <motion.div
              className="text-xl text-gray-700 pb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Introducing Buildify
            </motion.div>
            <motion.h1
              className="text-7xl font-bold text-blue-600 pb-2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <span className={`${caveat.className}`}>Your dream website</span>
            </motion.h1>
            <motion.h1
              className="text-7xl font-bold text-black pb-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <span className={`${caveat.className}`}>just a few clicks away</span>
            </motion.h1>
            <motion.p
              className="text-lg mt-4 text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              The easiest platform to create your own website without coding.
            </motion.p>
            <div className="mt-6">
              <motion.a
                href="#features"
                className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Get Started
              </motion.a>
            </div>
          </div>
        </section>

        {/* Features Section with Scroll-triggered Transition */}
        <section id="features" className="py-24 bg-white">
          <div className="max-w-screen-xl mx-auto text-center">
            <motion.h2
              className="text-5xl font-semibold text-black"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <span className={`${caveat.className}`}>Features</span>
            </motion.h2>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { title: "Drag & Drop Builder", description: "Easily build websites with our intuitive drag-and-drop builder." },
                { title: "Customizable Templates", description: "Choose from a variety of professionally designed templates to start your project." },
                { title: "Responsive Design", description: "Your website will look great on any device, from desktop to mobile." },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-lg shadow-md hover:shadow-lg bg-gradient-to-br from-blue-50 via-white to-blue-50"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.3 }}
                >
                  <h3 className="text-xl font-semibold text-black">{feature.title}</h3>
                  <p className="mt-4 text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* Image Section Between Hero and Features */}
        <section className="py-10 bg-white text-center">
          <motion.div
            className="relative w-full max-w-screen-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Image
              src="/images/website-builder.jpg" // Add your relevant image here
              alt="Website Builder"
              width={600}
              height={300}
              quality={100}
              className="rounded-lg shadow-md mx-auto"
            />
          </motion.div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 bg-white">
          <div className="max-w-screen-xl mx-auto text-center">
            <motion.h2
              className="text-5xl font-semibold text-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <span className={`${caveat.className}`}>Frequently Asked Questions</span>
            </motion.h2>
            <div className="mt-10 max-w-3xl mx-auto font-normal">
              <FAQItem
                question="What is Buildify?"
                answer="Buildify is a platform that allows you to create your dream website easily without any coding knowledge."
              />
              <FAQItem
                question="How does Buildify work?"
                answer="Using Buildify, you can select customizable templates and utilize the drag-and-drop builder to design your website."
              />
              <FAQItem
                question="Is there a free plan?"
                answer="Yes, Buildify offers a free plan with basic features. You can upgrade for additional functionalities."
              />
              <FAQItem
                question="What’s included in the Plus plan?"
                answer="The Plus plan includes advanced templates, priority support, and additional storage."
              />
              <FAQItem
                question="Can I cancel my subscription?"
                answer="Yes, you can cancel your subscription anytime through your account settings."
              />
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="text-center">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 my-20">
            <div className="relative isolate overflow-hidden px-6 py-20 text-center sm:rounded-3xl sm:border sm:px-16 sm:shadow-sm bg-gradient-to-br from-blue-100 via-white to-blue-100">
              <motion.h2
                className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", stiffness: 100, damping: 25 }}
                viewport={{ once: true }}
              >
                Start using Build<span className="text-blue-600">ify</span> Now!
              </motion.h2>
              <motion.h3
                className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", stiffness: 100, damping: 25, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Buildify makes it easy to create websites without coding.
              </motion.h3>
              <div className="mt-8 flex items-center justify-center gap-x-6">
                <motion.button
                  className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Get Started
                </motion.button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
