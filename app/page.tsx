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
  Select,
  SelectItem,
} from "@nextui-org/react";
import axios from "axios";

export default function Home() {
  interface TikTokResult {
    aweme_detail: {
      desc: string;
      author: {
        nickname: string;
        avatar_larger: {
          url_list: string[];
        };
      };
      music: {
        play_url: {
          uri: string;
        };
      };
    };
    hdplay: string;
  }

  interface YoutubeResult {
    title: string;
    video_high: string;
    video_low: string;
    thumbnail_url: string;
    author: string;
    audio_high: string;
  }

  interface Value {
    value: string;
  }

  interface Platform {
    value: string;
  }

  const platforms: Platform[] = [
    {
      value: "TikTok",
    },
    {
      value: "Youtube",
    },
  ];

  const textVariants: string[] = ["All In One", "Downloader"];
  const [inputValue, setInputValue] = useState("");
  const [platformValue, setPlatformValue] = useState("TikTok");
  const [downloading, setDownloading] = useState(false);
  const [resultTiktok, setResultTiktok] = useState<TikTokResult | null>(null);
  const [resultYoutube, setResultYoutube] = useState<YoutubeResult | null>(
    null
  );

  const handleDownload = async () => {
    if (platformValue === "TikTok" && inputValue) {
      try {
        setDownloading(true);
        const response = await axios.get(
          "https://tiktok-full-video-info-without-watermark.p.rapidapi.com/",
          {
            params: {
              url: inputValue,
            },
            headers: {
              "X-RapidAPI-Key":
                "1bceb64ea5mshaf26c4cd537940cp131616jsnf5e2ba80ce9f",
              "X-RapidAPI-Host":
                "tiktok-full-video-info-without-watermark.p.rapidapi.com",
            },
          }
        );
        setResultTiktok(response.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setDownloading(false);
      }
    }
    if (platformValue === "Youtube" && inputValue) {
      try {
        setDownloading(true);
        const response = await axios.get(
          "https://youtube-audio-video-download.p.rapidapi.com/geturl",
          {
            params: {
              video_url: inputValue,
            },
            headers: {
              "X-RapidAPI-Key":
                "1bceb64ea5mshaf26c4cd537940cp131616jsnf5e2ba80ce9f",
              "X-RapidAPI-Host": "youtube-audio-video-download.p.rapidapi.com",
            },
          }
        );
        setResultYoutube(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setDownloading(false);
      }
    }
  };

  const handleSelectionChange = (e: any) => {
    setPlatformValue(e.target.value);
  };

  return (
    <main className='xl:px-96 lg:px-46 px-4 py-4 min-h-screen flex justify-center items-center'>
      <div className='w-full'>
        <div className='flex w-full justify-around sm:flex-row flex-col items-center gap-y-5'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <Image
              className='hover:scale-110 duration-300'
              src='/tiktok.svg'
              width={150}
              height={150}
              alt='Logo Tiktok'
            />

            <Image
              className='hover:scale-110 duration-300'
              src='/youtube.svg'
              width={150}
              height={150}
              alt='Logo Youtube'
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
              <Select
                label='Select a platform'
                selectedKeys={[platformValue]}
                onChange={handleSelectionChange}
                className='max-w-md mb-3'>
                {platforms.map((platform) => (
                  <SelectItem key={platform.value} value={platform.value}>
                    {platform.value}
                  </SelectItem>
                ))}
              </Select>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 3 * 0.2 }}>
              <Input
                className='mb-3'
                type='text'
                label={`Paste the ${platformValue} Video Link !`}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setResultTiktok(null);
                  setResultYoutube(null);
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 4 * 0.2 }}>
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
        {resultTiktok && (
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
                  src={
                    resultTiktok.aweme_detail.author.avatar_larger.url_list[0]
                  }
                  width={100}
                />
                <div className='flex flex-col'>
                  <p className='text-md'>
                    {resultTiktok.aweme_detail.author.nickname}
                  </p>
                  <p className='text-small text-default-500'>
                    {resultTiktok.aweme_detail.desc}
                  </p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody className='gap-y-3'>
                <Button className='bg-gradient-to-tr from-blue-500 max-w-[200px] mx-auto to-blue-400 text-white shadow-lg'>
                  <a href={resultTiktok.hdplay}>MP4 NO WATERMARK</a>
                </Button>
                <Button className='bg-gradient-to-tr from-blue-500 max-w-[200px] mx-auto to-blue-400 text-white shadow-lg'>
                  <a href={resultTiktok.aweme_detail.music.play_url.uri}>
                    MP4A MUSIC ONLY
                  </a>
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
        {resultYoutube && (
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
                  src={resultYoutube.thumbnail_url}
                  width={100}
                />
                <div className='flex flex-col'>
                  <p className='text-md'>{resultYoutube.author}</p>
                  <p className='text-small text-default-500'>
                    {resultYoutube.title}
                  </p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody className='gap-y-3'>
                <Button className='bg-gradient-to-tr from-blue-500 max-w-[200px] mx-auto to-blue-400 text-white shadow-lg'>
                  <a href={resultYoutube.video_high}>MP4 HIGH RESOLUTION</a>
                </Button>
                <Button className='bg-gradient-to-tr from-blue-500 max-w-[200px] mx-auto to-blue-400 text-white shadow-lg'>
                  <a href={resultYoutube.video_low}>MP4 LOW RESOLUTION</a>
                </Button>
                <Button className='bg-gradient-to-tr from-blue-500 max-w-[200px] mx-auto to-blue-400 text-white shadow-lg'>
                  <a href={resultYoutube.audio_high}> MP4A MUSIC ONLY</a>
                </Button>
              </CardBody>
              <Divider />
              <CardFooter>
                <Link isExternal showAnchorIcon href={inputValue}>
                  Visit source video on youtube.
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </div>
    </main>
  );
}
