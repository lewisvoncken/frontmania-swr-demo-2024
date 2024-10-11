import React from "react";
import useSWR from "swr";
import Image from "next/image";
import QRCode from "react-qr-code";
import localFont from "next/font/local";

const fetcher = (url) => fetch(url).then((res) => res.json());

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const { data, error, isLoading } = useSWR(
    "https://api.github.com/repos/mage2gen/mage2gen",
    fetcher,
    {
      revalidateOnFocus: true,
      focusThrottleInterval: 100,
      // DEMO: refresh
      // refreshInterval: 1000,
    }
  );

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          src={"/logo.png"}
          alt="Happy Horizon"
          width={180}
          height={38}
          priority
        />
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold mb-4">{data.name}</h1>
          <p className="text-lg mb-4">{data.description}</p>
          <div className="flex gap-4 justify-center sm:justify-start">
            <strong className="text-xl">👀 {data.subscribers_count}</strong>
            <strong className="text-xl">🌟 {data.stargazers_count}</strong>
            <strong className="text-xl">🍴 {data.forks_count}</strong>
          </div>
        </div>
        {/* DEMO: refresh */}
        <QRCode value="https://github.com/mage2gen/mage2gen" />
      </main>
    </div>
  );
}