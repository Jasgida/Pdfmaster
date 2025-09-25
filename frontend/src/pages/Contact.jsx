import React, { useState } from "react";


export default function Contact() {

  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const [submitted, setSubmitted] = useState(false);


  const handleChange = (e) => {

    setForm({ ...form, [e.target.name]: e.target.value });

  };


  const handleSubmit = (e) => {

    e.preventDefault();

    setSubmitted(true);

    // Later: hook to backend or email service

  };


  return (

    <div className="px-6 py-12 max-w-2xl mx-auto text-gray-800 dark:text-gray-200">

      <h2 className="text-3xl font-bold text-[#7b0c17] dark:text-red-400 mb-6">

        Contact Us

      </h2>


      {submitted ? (

        <p className="text-green-600 dark:text-green-400">

          ✅ Thanks for your message! We’ll get back to you soon.

        </p>

      ) : (

        <form onSubmit={handleSubmit} className="space-y-4">

          <input

            type="text"

            name="name"

            placeholder="Your Name"

            value={form.name}

            onChange={handleChange}

            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"

            required

          />

          <input

            type="email"

            name="email"

            placeholder="Your Email"

            value={form.email}

            onChange={handleChange}

            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"

            required

          />

          <textarea

            name="message"

            placeholder="Your Message"

            value={form.message}

            onChange={handleChange}

            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"

            rows="4"

            required

          ></textarea>

          <button

            type="submit"

            className="px-6 py-3 bg-[#7b0c17] text-white font-semibold rounded-lg hover:bg-[#a11a2a]"

          >

            Send Message

          </button>

        </form>

      )}

    </div>

  );

}

