import { Card } from "@/componets/card/card";
import { Footer } from "@/componets/footer/footer";
import { Menu } from "@/componets/menu/menu";
import Image from "next/image";
import banner from "/public/banner.png";
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
          <button className="bg-branco text-preto p-2 rounded-lg border text-teal-500 text-lg">Escolha seu presente!</button>
        </div>
        <Image src={banner} alt="banner" className="object-cover h-96" priority></Image>
      </div>

      <div className="h-screen p-20">
        <Card imagem="" titulo="Colar coração" preco="150,90" status=""></Card>
      </div>
      <Footer></Footer>
    </>
  );
}
