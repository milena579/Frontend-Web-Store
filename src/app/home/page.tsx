"use client"

import { Footer } from "@/componets/footer/footer";
import { Menu } from "@/componets/menu/menu";
import {ROUTES} from "@/constants/routes";

import Image from "next/image";
import banner from "@/app/assets/banner.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/componets/card/card";

interface IProduto {
  id: number;
  title: string;
  price: number;
  status: boolean;
  category: number;
  image: string;
}

export default function Home() {

  const [produtos, setProdutos] = useState<IProduto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const res = await fetch(`http://localhost:8080/product`);
        if (!res.ok) throw new Error("Erro ao buscar produtos");
        const data = await res.json();
        setProdutos(data);
      } catch (err) {
        setProdutos([
          {
            id: 0,
            title: "ERRO AO CARREGAR PRODUTOS",
            price: 0,
            status: false,
            category: 0,
            image: ""
          },
        ]);
        setError("Erro ao carregar produtos");
      }
    };

    fetchProdutos();
  }, []);

  const addNoCarrinho = async (produtoId: number) => {
    const token = sessionStorage.getItem("Token");

    if (!token) {
      alert("Token não encontrado. Faça login novamente.");
      router.push(ROUTES.login);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          quantidade: 1, // Quantidade fixa ou variável
          produto: produtoId,
        }),
      });

      if (!response.ok) {
        alert("Erro ao adicionar no carrinho.");
      } else {
        alert("Produto adicionado ao carrinho com sucesso!");
      }
    } catch (err) {
      console.error("Erro ao adicionar ao carrinho:", err);
      alert("Erro ao adicionar ao carrinho.");
    }
  };

  return (
    <>
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
        {produtos.map((item, index) => (
            <Card
              key={`${item.id}-${index}`} // Garante chave única
              imagem={item.image? item.image : "https://www.goiania.go.leg.br/imagens/sem-foto/image"}
              titulo={item.title}
              preco={item.price}
              status={item.status}
              onAdd={() => addNoCarrinho(item.id)}
            />
          ))}
      </div>
      <Footer></Footer>
    </>
  );
}
