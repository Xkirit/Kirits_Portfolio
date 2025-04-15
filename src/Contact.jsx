import { useState } from 'react';
import Navbar from './Navbar';
import SubHeader from './components/subheader';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
    <Navbar />
    <SubHeader />
    <div className="min-h-screen w-full flex items-center justify-center bg-black">
      <div className="w-1/4 max-w-3xl relative">
        {/* Main content container */}
        <div className="relative">
          <div className="flex justify-center contact py-12 h-20">
          <a className="text-4xl text-center  font-bold mb-10 text-[#dcff7c] ml-24 ">Get in Touch</a>
          </div>
          <form onSubmit={handleSubmit} className="flex">
            {/* Left sidebar with labels */}
            {/* <div className="w-12  text-black p-2 absolute left-0 top-0 bottom-0 flex flex-col">
              <div className="mt-[40px]">Name</div>
              <div className="mt-[40px]">Email</div>
              <div className="mt-[40px]">Message</div>
            </div>
             */}
            {/* Right side with input fields */}
            <div className="flex-1 py-12 pl-24">
              <div className="flex flex-col gap-4 mb-4">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-5 bg-[#111] rounded-xl text-gray-300 border border-transparent focus:border-[#dcff7c] transition-all duration-200 outline-none placeholder-gray-600"
                  placeholder="Your name"
                  required
                />
                
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 bg-[#111] rounded-xl text-gray-300 border-b border-[#222] focus:border-[#dcff7c] transition-all duration-200 outline-none placeholder-gray-600"
                  placeholder="your@email.com"
                  required
                />
                
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="w-full p-3 bg-[#111] rounded-xl text-gray-300 border-b border-[#222] focus:border-[#dcff7c] transition-all duration-200 outline-none resize-none placeholder-gray-600 mb-10"
                  placeholder="What would you like to say?"
                  required
                />
              </div>
            </div>
          </form>
          
          {/* Send message button that spans across the form, positioned at the bottom */}
          <button
            type="submit"
            form="contact-form"
            className="w-full mt-10 py-3 bg-[#dcff7c] text-black hover:bg-[#c2e66d] transition-all duration-300 rounded-full"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
    </>
  );
}