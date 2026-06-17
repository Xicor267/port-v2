/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Mail, Send, CheckCircle, RefreshCw, Terminal, Phone, MapPin, AlertCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../LanguageContext";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const { t, language } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success">("idle");
  const [toast, setToast] = useState<{
    visible: boolean;
    type: "success" | "error";
    message: string;
    description: string;
  } | null>(null);

  const showToast = (type: "success" | "error", message: string, description: string) => {
    setToast({ visible: true, type, message, description });
    setTimeout(() => {
      setToast(prev => prev ? { ...prev, visible: false } : null);
    }, 6000);
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) {
      errors.name = t("portfolio.page.contact.name.validation");
    }
    if (!formData.email.trim()) {
      errors.email = t("portfolio.page.contact.email.validation");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t("portfolio.page.contact.email.notvalid");
    }
    if (!formData.subject.trim()) {
      errors.subject = t("portfolio.page.contact.subject.validation");
    }
    if (!formData.message.trim() || formData.message.length < 5) {
      errors.message = t("portfolio.page.contact.object.validation");
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitStatus("loading");

    const templateParams = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message
    };

    emailjs
      .send(
        "service_h706brt",
        "template_f2q9i5j",
        templateParams,
        "bkQzHOiUXlXROLIkI"
      )
      .then(
        (result) => {
          console.log("SUCCESS!", result);
          setSubmitStatus("success");
          showToast(
            "success",
            t("portfolio.page.contact.submit.send.successful"),
            t("portfolio.page.contact.submit.send.desc")
          );
        },
        (error) => {
          console.error("FAILED...", error);
          setSubmitStatus("idle");
          showToast(
            "error",
            t("portfolio.page.contact.submit.send.failed"),
            t("portfolio.page.contact.submit.send.failed.desc.err")
          );
        }
      );
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", subject: "", message: "" });
    setFormErrors({});
    setSubmitStatus("idle");
  };

  return (
    <div className="bg-[#fcfcfd] p-6 sm:p-10 rounded-xl border border-gray-200 shadow-sm max-w-2xl mx-auto relative">
      <AnimatePresence mode="wait">
        {submitStatus === "idle" || submitStatus === "loading" ? (
          <motion.form 
            key="form"
            onSubmit={handleSubmit} 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5 text-left"
          >
            {/* Name field */}
            <div className="space-y-1">
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={submitStatus !== "idle"}
                placeholder={t("portfolio.page.contact.name.input")}
                className={`w-full bg-white border px-4 py-3 rounded-lg text-sm transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-gray-800 ${
                  formErrors.name ? "border-red-500 focus:border-red-500" : "border-gray-300"
                }`}
              />
              {formErrors.name && (
                <span className="text-[11px] text-red-500 block font-medium">{formErrors.name}</span>
              )}
            </div>

            {/* Email field */}
            <div className="space-y-1">
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={submitStatus !== "idle"}
                placeholder={t("portfolio.page.contact.email")}
                className={`w-full bg-white border px-4 py-3 rounded-lg text-sm transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-gray-800 ${
                  formErrors.email ? "border-red-500 focus:border-red-500" : "border-gray-300"
                }`}
              />
              {formErrors.email && (
                <span className="text-[11px] text-red-500 block font-medium">{formErrors.email}</span>
              )}
            </div>

            {/* Subject field */}
            <div className="space-y-1">
              <input 
                type="text" 
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                disabled={submitStatus !== "idle"}
                placeholder={t("portfolio.page.contact.subject")}
                className={`w-full bg-white border px-4 py-3 rounded-lg text-sm transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-gray-800 ${
                  formErrors.subject ? "border-red-500 focus:border-red-500" : "border-gray-300"
                }`}
              />
              {formErrors.subject && (
                <span className="text-[11px] text-red-500 block font-medium">{formErrors.subject}</span>
              )}
            </div>

            {/* Message field */}
            <div className="space-y-1">
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                disabled={submitStatus !== "idle"}
                rows={4}
                placeholder={t("portfolio.page.contact.message")}
                style={{ resize: "none" }}
                className={`w-full bg-white border px-4 py-3 rounded-lg text-sm transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-gray-800 leading-relaxed ${
                  formErrors.message ? "border-red-500 focus:border-red-500" : "border-gray-300"
                }`}
              />
              {formErrors.message && (
                <span className="text-[11px] text-red-500 block font-medium">{formErrors.message}</span>
              )}
            </div>

            {/* Form submit helper tags */}
            <div className="text-[11px] text-gray-400 font-mono mt-1 select-none space-y-0.5 pointer-events-none">
              <p>{t("portfolio.page.contact.submit.send.desc")}</p>
              <p className="text-blue-500 font-bold">{t("portfolio.page.contact.submit.send.hint")}</p>
            </div>

            {/* Submit Trigger */}
            {submitStatus === "idle" ? (
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded text-sm font-bold uppercase transition-all shadow-sm hover:shadow cursor-pointer"
              >
                {t("portfolio.page.contact.submit.form")} <Send size={14} />
              </button>
            ) : (
              <div className="flex items-center gap-2 font-mono text-xs text-blue-600 font-bold uppercase py-2">
                <RefreshCw size={14} className="animate-spin" /> {t("portfolio.page.contact.submit.sending")}
              </div>
            )}
          </motion.form>
        ) : (
          /* Success feedback view */
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-6 space-y-4 flex flex-col items-center"
          >
            <div className="bg-green-50 w-12 h-12 rounded-full flex items-center justify-center border border-green-200">
              <CheckCircle className="text-green-600" size={24} />
            </div>

            <div className="space-y-1.5">
              <h3 className="font-bold text-gray-900 text-lg">
                {t("portfolio.page.contact.submit.thankyou")}
              </h3>
              <p className="text-sm text-gray-600 max-w-sm">
                {t("portfolio.page.contact.submit.success_msg")}
              </p>
            </div>

            <button 
              onClick={resetForm}
              className="px-5 py-2 bg-white text-gray-700 font-bold text-xs border border-gray-200 rounded hover:bg-gray-50 transition-all shadow-sm cursor-pointer"
            >
              {t("portfolio.page.contact.submit.send_another")}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Notification Toast */}
      <AnimatePresence>
        {toast && toast.visible && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`fixed top-6 right-6 z-[9999] max-w-sm w-[calc(100vw-3rem)] p-4 rounded-xl border shadow-xl flex items-start gap-3 bg-white text-left ${
              toast.type === "success" 
                ? "border-green-200 shadow-green-100/50 bg-green-50/95" 
                : "border-red-200 shadow-red-100/50 bg-red-50/95"
            }`}
          >
            <div className="mt-0.5">
              {toast.type === "success" ? (
                <div className="bg-green-100 p-1.5 rounded-full text-green-600">
                  <CheckCircle size={18} />
                </div>
              ) : (
                <div className="bg-red-100 p-1.5 rounded-full text-red-600">
                  <AlertCircle size={18} />
                </div>
              )}
            </div>
            
            <div className="flex-1 space-y-1">
              <h4 className={`text-sm font-bold ${toast.type === "success" ? "text-green-800" : "text-red-800"}`}>
                {toast.message}
              </h4>
              <p className="text-xs text-gray-600 leading-normal font-medium">
                {toast.description}
              </p>
            </div>

            <button
              onClick={() => setToast(prev => prev ? { ...prev, visible: false } : null)}
              className="text-gray-400 hover:text-gray-600 transition-colors p-0.5 rounded cursor-pointer"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
