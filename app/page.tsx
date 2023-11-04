"use client";
import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import axios from "axios";

export default function Home() {
  interface TikTokResult {
    title: string;
    author: {
      name: string;
      avatar: string;
    };
    video: {
      noWatermark: string;
      watermark: string;
    };
    music: {
      play_url: string;
    };
    // Definisikan properti lain yang ada dalam objek result
  }

  const textVariants: string[] = ["TikTok", "Downloader"];
  const [inputValue, setInputValue] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [result, setResult] = useState<TikTokResult | null>(null);

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const response = await axios.get(
        `https://api.tiklydown.eu.org/api/download?url=${inputValue}`
      );
      setResult(response.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setDownloading(false);
    }
  };

  useEffect(() => {
    console.log(result);
  }, [result]);

  return (
    <main className='xl:px-96 lg:px-44 px-4 py-4 min-h-screen flex justify-center items-center'>
      <div className='w-full'>
        <div className='flex w-full justify-around sm:flex-row flex-col items-center gap-y-5'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <Image
              className='hover:scale-110 duration-300'
              src='/tiktok.svg'
              width={200}
              height={200}
              alt='Logo Tiktok'
            />
          </motion.div>
          <div>
            {textVariants.map((text, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className='font-bold text-5xl mb-3 hover:text-blue-500 duration-200'>
                {text}
              </motion.p>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2 * 0.2 }}>
              <Input
                className='mb-3'
                type='text'
                label='Paste the TikTok Video Link !'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 3 * 0.2 }}>
              <Button
                variant='shadow'
                className={`bg-gradient-to-tr from-blue-500 to-blue-400 text-white shadow-lg sm:w-fit w-full ${
                  downloading ? "cursor-not-allowed" : ""
                }`}
                onClick={handleDownload}
                disabled={downloading}>
                {downloading ? "Downloading" : "Download"}
              </Button>
            </motion.div>
          </div>
        </div>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <Card className='max-w-[400px] mx-auto mt-10'>
              <CardHeader className='flex gap-3'>
                <Image
                  alt='thumbnail user'
                  height={100}
                  radius='sm'
                  src={result.author.avatar}
                  width={100}
                />
                <div className='flex flex-col'>
                  <p className='text-md'>{result.author.name}</p>
                  <p className='text-small text-default-500'>{result.title}</p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody className='gap-y-3'>
                <Button className='bg-gradient-to-tr from-blue-500 max-w-[200px] mx-auto to-blue-400 text-white shadow-lg'>
                  <a href={result.video.noWatermark}>MP4 NO WATERMARK</a>
                </Button>
                <Button className='bg-gradient-to-tr from-blue-500 max-w-[200px] mx-auto to-blue-400 text-white shadow-lg'>
                  <a href={result.video.watermark}> MP4 WITH WATERMARK</a>
                </Button>
                <Button className='bg-gradient-to-tr from-blue-500 max-w-[200px] mx-auto to-blue-400 text-white shadow-lg'>
                  <a href={result.music.play_url}> MP3 MUSIC ONLY</a>
                </Button>
              </CardBody>
              <Divider />
              <CardFooter>
                <Link isExternal showAnchorIcon href={inputValue}>
                  Visit source video on tiktok.
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </div>
    </main>
  );
}
