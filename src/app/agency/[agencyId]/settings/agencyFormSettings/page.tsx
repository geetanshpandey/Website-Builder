'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Acme, Archivo_Black, Caveat, Bowlby_One } from 'next/font/google';
import Link from 'next/link';

const acme = Acme({ subsets: ['latin'], weight: ['400'] });
const archivoBlack = Archivo_Black({ subsets: ['latin'], weight: ['400'] });
const caveat = Caveat({ subsets: ['latin'], weight: ['400', '700'] });
const bowlbyOne = Bowlby_One({ subsets: ['latin'], weight: ['400'] });

export default function LoginPage() {
  const [formData, setFormData] = useState({
    logo: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Scroll to the top when the component is mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        newErrors[key] = `${key} is required`;
      }
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log('Form Submitted', formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-neutral-50 to-gray-50">
      <motion.div
        className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-xl mt-6 mb-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Header */}
        <motion.h1
          className="-mt-4 text-5xl font-bold text-center text-blue-600"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span className={`${caveat.className}`}>Create an Agency</span>
        </motion.h1>
        <motion.p
          className="text-2xl text-center text-gray-600 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <span className={`${caveat.className}`}>Enter your agency information below</span>
        </motion.p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name & Logo in Same Line */}
          <div className="flex space-x-4">
            {/* Agency Name */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex-1 -mt-4"
            >
              <Label htmlFor="name" className="text-gray-600 text-xl font-semibold">
                <span className={`${caveat.className}`}>Agency name</span>
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="border-2 border-gray-200 hover:border-gray-400 transition-all"
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </motion.div>

            {/* Agency Logo */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex-1 -mt-4"
            >
              <Label htmlFor="logo" className="text-gray-600 text-xl font-semibold">
                <span className={`${caveat.className}`}>Agency logo</span>
              </Label>
              <div className="flex items-center space-x-2">
                <Input
                  type="file"
                  id="logo"
                  name="logo"
                  className="hidden"
                  onChange={(e) =>
                    setFormData({ ...formData, logo: e.target.files?.[0]?.name || '' })
                  }
                />
                <label
                  htmlFor="logo"
                  className="cursor-pointer bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-purple-700 transition-all"
                >
                  Add
                </label>
                <div className="w-px h-5 bg-gray-300 "></div>
                <span className="pt-1 pb-1 border-2 border-gray-200 hover:border-gray-400 text-sm text-gray-500 truncate w-full transition-all">
                  {formData.logo || 'No file chosen'}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Email, Phone, and Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            <Label htmlFor="email" className="text-gray-600 text-xl font-semibold -mt-4">
              <span className={`${caveat.className}`}>Email</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="border-2 border-gray-200 hover:border-gray-400 transition-all"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <Label htmlFor="phone" className="text-gray-600 text-xl font-semibold -mt-10">
              <span className={`${caveat.className}`}>Phone</span>
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="border-2 border-gray-200 hover:border-gray-400 transition-all"
            />
            {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            <Label htmlFor="address" className="text-gray-600 text-xl font-semibold">
              <span className={`${caveat.className}`}>Address</span>
            </Label>
            <Input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              className="border-2 border-gray-200 hover:border-gray-400 transition-all"
            />
            {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
          </motion.div>

          {/* City & State in Same Line */}
          <div className="flex space-x-4">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6, duration: 0.5 }}
              className="flex-1"
            >
              <Label htmlFor="city" className="text-gray-600 text-xl font-semibold">
                <span className={`${caveat.className}`}>City</span>
              </Label>
              <Input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                className="border-2 border-gray-200 hover:border-gray-400 transition-all"
              />
              {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8, duration: 0.5 }}
              className="flex-1"
            >
              <Label htmlFor="state" className="text-gray-600 text-xl font-semibold">
                <span className={`${caveat.className}`}>State</span>
              </Label>
              <Input
                id="state"
                name="state"
                type="text"
                value={formData.state}
                onChange={handleChange}
                className="border-2 border-gray-200 hover:border-gray-400 transition-all"
              />
              {errors.state && <p className="text-sm text-red-500">{errors.state}</p>}
            </motion.div>
          </div>

          {/* Zipcode and Country */}
          <div className="flex space-x-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0, duration: 0.5 }}
              className="flex-1"
            >
              <Label htmlFor="zipcode" className="text-gray-600 text-xl font-semibold">
                <span className={`${caveat.className}`}>Zipcode</span>
              </Label>
              <Input
                id="zipcode"
                name="zipcode"
                type="text"
                value={formData.zipcode}
                onChange={handleChange}
                className="border-2 border-gray-200 hover:border-gray-400 transition-all"
              />
              {errors.zipcode && <p className="text-sm text-red-500">{errors.zipcode}</p>}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.5 }}
              className="flex-1"
            >
              <Label htmlFor="country" className="text-gray-600 text-xl font-semibold">
                <span className={`${caveat.className}`}>Country</span>
              </Label>
              <Input
                id="country"
                name="country"
                type="text"
                value={formData.country}
                onChange={handleChange}
                className="border-2 border-gray-200 hover:border-gray-400 transition-all"
              />
              {errors.country && <p className="text-sm text-red-500">{errors.country}</p>}
            </motion.div>
          </div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 0.5 }}
            className="flex justify-center"
          >
            <Link href="/agency/${key}">
                <Button
                type="submit"
                className="bg-blue-600 text-white text-lg py-3 rounded-md hover:border-gray-400 transition-all"
                >
                Submit
                </Button>
            </Link>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
