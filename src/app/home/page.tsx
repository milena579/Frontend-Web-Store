import { Card } from "@/componets/card/card";
import { Footer } from "@/componets/footer/footer";
import { Menu } from "@/componets/menu/menu";
import Image from "next/image";
import banner from "/public/banner.jpg";
export default function Home() {
  return (
    <>
      {/* <Menu op1="" op2="" ></Menu> */}
      <div className="flex bg-blue-100 py-6 px-14 z-1 items-cenetr justify-center">
        <h5>PRATA REAL</h5>
      </div>
      <div className="h-screen">
        <div className="w-screen" >
          <Image src={banner} alt="banner" className="object-cover w-screen h-96 absolute" priority></Image>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
