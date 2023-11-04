"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button, Input } from "@nextui-org/react";

export default function Home() {
  const textVariants: string[] = ["TikTok", "Downloader"];

  return (
    <main className='xl:px-96 lg:px-44 px-4 min-h-screen flex justify-center items-center'>
      <div className='flex w-full justify-around sm:flex-row flex-col items-center gap-y-5'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          <Image src='/tiktok.svg' width={200} height={200} alt='Logo Tiktok' />
        </motion.div>
        <div>
          {textVariants.map((text, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}>
              <p className='font-bold text-5xl mb-3'>{text}</p>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2 * 0.2 }}>
            <Input
              className='mb-3'
              type='text'
              label='Paste the TikTok Video Link !'
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 3 * 0.2 }}>
            <Button
              variant='shadow'
              className='bg-gradient-to-tr from-blue-500 to-blue-400 text-white shadow-lg sm:w-fit w-full'>
              Download
            </Button>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
