'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export const CallToAction = () => {
  const t = useTranslations('HomePage.cta');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (error) setError(null);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
         try {
       const response = await fetch('/api/contact', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(formData),
       });

       if (!response.ok) {
         const errorData = await response.json().catch(() => ({}));
         throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
       }

      // Reset form and show success message
      setFormData({ 
        firstName: '', 
        lastName: '', 
        email: '', 
        phone: '', 
        company: '', 
        service: '', 
        message: '' 
      });
      setIsSubmitted(true);
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
         } catch (error) {
       console.error('Error submitting form:', error);
       setError(error instanceof Error ? error.message : 'Failed to submit form. Please try again.');
     } finally {
       setIsSubmitting(false);
     }
  };
  
  return (
    <section className="py-12 md:py-20 bg-gray-50 md:bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-none lg:max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-black px-4 sm:px-0">
            {t('title.prefix')} <span className="text-red-500">{t('title.highlight')}</span> {t('title.suffix')}
          </h2>
        </div>
        
        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Contact Form - Mobile First */}
          <div className="bg-[#424242] rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold mb-6 text-white">{t('form.title')}</h3>
            
            {isSubmitted ? (
              <div className="bg-green-600 text-white px-6 py-4 rounded-lg text-center">
                <p className="font-semibold">{t('form.success.title')}</p>
                <p className="text-sm mt-1">{t('form.success.message')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Error Message */}
                {error && (
                  <div className="bg-red-600 text-white px-4 py-3 rounded-lg text-center">
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                {/* First Row - First Name & Last Name */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">
                      {t('form.fields.firstName')} <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder={t('form.placeholders.firstName')}
                      required
                      className="bg-[#424242] border-gray-500 text-white placeholder-gray-300 focus:border-red-500 focus:ring-red-500 h-11"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">
                      {t('form.fields.lastName')} <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder={t('form.placeholders.lastName')}
                      required
                      className="bg-[#424242] border-gray-500 text-white placeholder-gray-300 focus:border-red-500 focus:ring-red-500 h-11"
                    />
                  </div>
                </div>

                {/* Second Row - Email & Phone */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">
                      {t('form.fields.email')} <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('form.placeholders.email')}
                      required
                      className="bg-[#424242] border-gray-500 text-white placeholder-gray-300 focus:border-red-500 focus:ring-red-500 h-11"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">
                      {t('form.fields.phone')} <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t('form.placeholders.phone')}
                      required
                      className="bg-[#424242] border-gray-500 text-white placeholder-gray-300 focus:border-red-500 focus:ring-red-500 h-11"
                    />
                  </div>
                </div>

                {/* Third Row - Company & Service */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">
                      {t('form.fields.company')} <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder={t('form.placeholders.company')}
                      required
                      className="bg-[#424242] border-gray-500 text-white placeholder-gray-300 focus:border-red-500 focus:ring-red-500 h-11"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">
                      {t('form.fields.service')} <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      title={t('form.fields.service')}
                      className="w-full bg-[#424242] border border-gray-500 text-white placeholder-gray-300 focus:border-red-500 focus:ring-red-500 rounded-md px-3 py-2 h-11"
                    >
                      <option value="">{t('form.placeholders.service')}</option>
                      <option value="graphic-design">{t('form.services.graphicDesign')}</option>
                      <option value="web-development">{t('form.services.webDevelopment')}</option>
                      <option value="social-media">{t('form.services.socialMedia')}</option>
                      <option value="seo">{t('form.services.seo')}</option>
                      <option value="software">{t('form.services.software')}</option>
                      <option value="advertising">{t('form.services.advertising')}</option>
                    </select>
                  </div>
                </div>

                {/* Message Field - Full Width */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">
                    {t('form.fields.message')} <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('form.placeholders.message')}
                    rows={4}
                    required
                    className="bg-[#424242] border-gray-500 text-white placeholder-gray-300 focus:border-red-500 focus:ring-red-500 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  {isSubmitting ? t('form.button.sending') : t('form.button.send')}
                </Button>

                {/* Privacy Notice */}
                <div className="text-center">
                  <p className="text-xs text-gray-400">
                    {t('form.privacy.text')} <Link href="/privacy-policy" className="text-red-500 hover:underline">{t('form.privacy.privacyPolicy')}</Link> {t('form.privacy.and')} <Link href="/terms-of-service" className="text-red-500 hover:underline">{t('form.privacy.termsOfService')}</Link>. {t('form.privacy.response')}
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Contact Information - Mobile */}
          <div className="grid grid-cols-1 gap-4">
            {/* Address */}
            <div className="bg-white rounded-lg p-4 flex items-center space-x-3">
              <div className="bg-red-500 p-2 rounded-full flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-sm text-black">{t('contact.address.title')}</h4>
                <p className="text-xs text-gray-600">{t('contact.address.street')}, {t('contact.address.city')}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-white rounded-lg p-4 flex items-center space-x-3">
              <div className="bg-red-500 p-2 rounded-full flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-sm text-black">{t('contact.phone.title')}</h4>
                <p className="text-xs text-gray-600">{t('contact.phone.number')}</p>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white rounded-lg p-4 flex items-center space-x-3">
              <div className="bg-red-500 p-2 rounded-full flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-sm text-black">{t('contact.email.title')}</h4>
                <p className="text-xs text-gray-600">{t('contact.email.address')}</p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-lg p-4 flex items-center space-x-3">
              <div className="bg-red-500 p-2 rounded-full flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                  <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-sm text-black">{t('contact.hours.title')}</h4>
                <div className="text-xs text-gray-600 space-y-0.5">
                  <p>{t('contact.hours.monday')}</p>
                  <p>{t('contact.hours.tuesday')}</p>
                  <p>{t('contact.hours.wednesday')}</p>
                  <p>{t('contact.hours.thursday')}</p>
                  <p>{t('contact.hours.friday')}</p>
                  <p>{t('contact.hours.saturday')}</p>
                  <p>{t('contact.hours.sunday')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Hidden on Mobile */}
        <div className="hidden md:block bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg p-4 sm:p-6 md:p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Information */}
            <div className="space-y-6 md:space-y-8">
              {/* Address */}
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="bg-red-500 p-2 md:p-3 rounded-full flex-shrink-0">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-1 text-black">{t('contact.address.title')}</h3>
                  <p className="text-sm md:text-base text-gray-600">
                    {t('contact.address.street')}, {t('contact.address.city')}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="bg-red-500 p-2 md:p-3 rounded-full flex-shrink-0">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-1 text-black">{t('contact.phone.title')}</h3>
                  <p className="text-sm md:text-base text-gray-600">{t('contact.phone.number')}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="bg-red-500 p-2 md:p-3 rounded-full flex-shrink-0">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-1 text-black">{t('contact.email.title')}</h3>
                  <p className="text-sm md:text-base text-gray-600">{t('contact.email.address')}</p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="bg-red-500 p-2 md:p-3 rounded-full flex-shrink-0">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                    <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-1 text-black">{t('contact.hours.title')}</h3>
                  <div className="text-sm md:text-base text-gray-600 space-y-1">
                    <p>{t('contact.hours.monday')}</p>
                    <p>{t('contact.hours.tuesday')}</p>
                    <p>{t('contact.hours.wednesday')}</p>
                    <p>{t('contact.hours.thursday')}</p>
                    <p>{t('contact.hours.friday')}</p>
                    <p>{t('contact.hours.saturday')}</p>
                    <p>{t('contact.hours.sunday')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form - Desktop */}
            <div className="bg-[#424242] rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 mt-8 lg:mt-0">
              <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-white">{t('form.title')}</h3>
              
              {isSubmitted ? (
                <div className="bg-green-600 text-white px-4 md:px-6 py-4 rounded-lg text-center">
                  <p className="font-semibold text-sm md:text-base">{t('form.success.title')}</p>
                  <p className="text-xs md:text-sm mt-1">{t('form.success.message')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-600 text-white px-4 py-3 rounded-lg text-center">
                      <p className="text-sm">{error}</p>
                    </div>
                  )}
                  {/* First Name and Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs md:text-sm font-medium mb-2 text-white">
                        {t('form.fields.firstName')} <span className="text-red-500">*</span>
                      </label>
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder={t('form.placeholders.firstName')}
                        required
                        className="bg-[#424242] border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500 text-sm md:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-xs md:text-sm font-medium mb-2 text-white">
                        {t('form.fields.lastName')} <span className="text-red-500">*</span>
                      </label>
                      <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder={t('form.placeholders.lastName')}
                        required
                        className="bg-[#424242] border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500 text-sm md:text-base"
                      />
                    </div>
                  </div>

                  {/* Email and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs md:text-sm font-medium mb-2 text-white">
                        {t('form.fields.email')} <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t('form.placeholders.email')}
                        required
                        className="bg-[#424242] border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500 text-sm md:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-xs md:text-sm font-medium mb-2 text-white">
                        {t('form.fields.phone')} <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={t('form.placeholders.phone')}
                        required
                        className="bg-[#424242] border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500 text-sm md:text-base"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-xs md:text-sm font-medium mb-2 text-white">
                      {t('form.fields.company')} <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder={t('form.placeholders.company')}
                      required
                      className="bg-[#424242] border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500 text-sm md:text-base"
                    />
                  </div>

                  {/* Service */}
                  <div>
                    <label className="block text-xs md:text-sm font-medium mb-2 text-white">
                      {t('form.fields.service')} <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      title={t('form.fields.service')}
                      className="w-full bg-[#424242] border border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500 rounded-md px-3 py-2 text-sm md:text-base"
                    >
                      <option value="">{t('form.placeholders.service')}</option>
                      <option value="graphic-design">{t('form.services.graphicDesign')}</option>
                      <option value="web-development">{t('form.services.webDevelopment')}</option>
                      <option value="social-media">{t('form.services.socialMedia')}</option>
                      <option value="seo">{t('form.services.seo')}</option>
                      <option value="software">{t('form.services.software')}</option>
                      <option value="advertising">{t('form.services.advertising')}</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs md:text-sm font-medium mb-2 text-white">
                      {t('form.fields.message')} <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t('form.placeholders.message')}
                      rows={4}
                      required
                      className="bg-[#424242] border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500 text-sm md:text-base"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    {isSubmitting ? t('form.button.sending') : t('form.button.send')}
                  </Button>

                  {/* Privacy Notice */}
                  <div className="text-center">
                    <p className="text-xs text-gray-400">
                      {t('form.privacy.text')} <Link href="/privacy-policy" className="text-red-500 hover:underline">{t('form.privacy.privacyPolicy')}</Link> {t('form.privacy.and')} <Link href="/terms-of-service" className="text-red-500 hover:underline">{t('form.privacy.termsOfService')}</Link>. {t('form.privacy.response')}
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;