import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import contact from "../../assets/contact.jpg";
import { doc, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  sendContactNotification,
  initEmailJS,
} from "../../backend/emailService";

const Contact = () => {
  // Import the functions you need from the SDKs you need
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBBYiHS0gtqhwVEmLz8kaxqFybIYFarC8w",
    authDomain: "codecove-a5e04.firebaseapp.com",
    projectId: "codecove-a5e04",
    storageBucket: "codecove-a5e04.firebasestorage.app",
    messagingSenderId: "995728429909",
    appId: "1:995728429909:web:7a67797f3eda3176dbd5dc",
    measurementId: "G-K01L4DE5N3",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // Initialize EmailJS
  useEffect(() => {
    initEmailJS();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data before submission
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const cleanFormData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message,
      };

      console.log(cleanFormData);
      // Save message to Firebase
      await setDoc(doc(db, "messages", formData.name), cleanFormData);

      // Send email notification
      await sendContactNotification(cleanFormData);

      setFormData({
        name: "",
        email: "",
        message: "",
      });
      navigate("/submission-success");
    } catch (error) {
      console.error("Error processing message: ", error);
      alert("Error sending message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Image Side */}
            <div className="relative hidden md:block">
              <img
                src={contact}
                alt="Contact us"
                className="h-full w-full object-cover rounded-tl-none rounded-bl-none rounded-tr-[100px] rounded-br-[100px]"
              />
            </div>

            {/* Contact Form Side */}
            <div className="p-8 md:p-12">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[var(--primary)] mb-12">
                Contact Us
              </h1>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full px-4 border-2 rounded-md border-[var(--primary)]  bg-transparent py-2 focus:outline-none"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="E-mail"
                    className="w-full px-4 border-2 rounded-md border-[var(--primary)]  bg-transparent py-2 focus:outline-none"
                  />
                </div>

                <div>
                  <textarea
                    placeholder="Please let me know how I can help you"
                    rows="4"
                    className="w-full px-4 border-2 rounded-md border-[var(--primary)]  bg-transparent py-2 focus:outline-none resize-none"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[var(--primary)] text-white py-3 px-8 rounded-full font-medium hover:bg-[var(--secondary)] transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </form>

              <div className="mt-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-[var(--primary)] mb-2">
                      Contact
                    </h3>
                    <a
                      className="text-[var(--primary)]"
                      href={`mailto:codecove88@gmail.com`}
                    >
                      codecove88@gmail.com
                    </a>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[var(--primary)] mb-2">
                      Based in
                    </h3>
                    <p className="text-[var(--primary)]">NS, Canada</p>
                  </div>
                </div>

                <div className="mt-8 flex space-x-6">
                  <a
                    href="https://www.facebook.com/profile.php?id=61573752639434"
                    className="text-[var(--primary)] hover:text-[var(--secondary)] text-2xl"
                  >
                    <FaFacebook />
                  </a>
                  <a
                    href="https://www.instagram.com/codecove88/"
                    className="text-[var(--primary)] hover:text-[var(--secondary)] text-2xl"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="https://x.com/covecode?s=21"
                    className="text-[var(--primary)] hover:text-[var(--secondary)] text-2xl"
                  >
                    <FaTwitter />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
