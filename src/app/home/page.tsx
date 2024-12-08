"use client"

import { Footer } from "@/componets/footer/footer";
import { Menu } from "@/componets/menu/menu";
import {ROUTES} from "@/constants/routes";

import Image from "next/image";
import banner from "@/app/assets/banner.png";
import Link from "next/link";
export default function Home() {
  return (
    <>
      {/* <Menu op1="" op2="" ></Menu> */}
      {/* <div className="flex w-full py-6 px-14 z-1 items-cenetr justify-center ">
        <h5  className="text-teal-500 font-bold">PRATA REAL</h5>
      </div> */}

      <Menu op1=""></Menu>

      {/* banner  */}
      
      <div className="w-full flex flex-col h-[45vh]" >
        <div className="flex w-[50%] items-center justify-center flex-col gap-4 absolute top-48 z-10 h-auto">
          <h1 className="text-branco">Aproveite os tempos festivos e presenteie alguém!</h1>
          <button className="bg-branco text-preto p-2 rounded-lg border text-teal-500 text-lg" >
           <Link href={ROUTES.products}> Escolha seu presente!</Link>
          </button>
        </div>
        <Image src={banner} alt="banner" className="object-cover h-96" priority></Image>
      </div>

      <div className="py-36 flex px-4 flex-row w-full flex-wrap gap-10 items-center justify-center">
      </div>
      <Footer></Footer>
    </>
  );
}
