
/* eslint-disable react/no-unescaped-entities */
"use client"
import CallToAction from '@/components/home/CallToAction'
import { useTranslations } from 'next-intl'
import React from 'react'

const Page = () => {
    const t = useTranslations('contact.success')
  return (
    <div>
        <div className='flex flex-col items-center justify-center'>
            
        </div>
        <CallToAction />

    <div className="bg-gradient-to-b from-red-600 to-red-800 text-white rounded-lg p-8 py-20 my-12 max-w-3xl mx-auto flex flex-col items-center text-center">
      <div className="mb-4">
        <svg className="w-16 h-16 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="11" stroke="white" strokeWidth="2" />
          <path d="M7 12L10 15L17 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 className="text-2xl md:text-3xl font-bold mb-3">{t('title')}</h3>
      <p className="text-base md:text-lg max-w-xl">
        {t('message')}
      </p>
    </div>
    </div>
  )
}

export default Page
