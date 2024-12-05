import { Card } from "@/componets/card/card";
import { Footer } from "@/componets/footer/footer";
import { Menu } from "@/componets/menu/menu";
import { Carousel } from "@/componets/carousel/carousel";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* <Menu op1="" op2="" ></Menu> */}
      <div className="flex bg-blue-100 py-6 px-14 items-cenetr justify-center">
        <h5>PRATA REAL</h5>
      </div>
      <div className="h-[100vh]">
        <Carousel></Carousel>
      </div>
      <Footer></Footer>
    </>
  );
}
