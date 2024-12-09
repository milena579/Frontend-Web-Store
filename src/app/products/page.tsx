"use client";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

import { Card } from "@/componets/card/card";
import { Footer } from "@/componets/footer/footer";
import { Menu } from "@/componets/menu/menu";
import { useState, useEffect } from "react";

interface IProduto {
  id: number;
  title: string;
  price: number;
  status: boolean;
  category: number;
  image: string;
}

interface ICart {
  quantidade: number;
  produto: number;
}

const VerProdutos = () => {
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
      const response = await fetch("http://localhost:8080/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'authorization': `${sessionStorage.getItem("Token")}`
        },
        body: JSON.stringify({
          quantity: 1, // Quantidade fixa ou variável
          product: produtoId,
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
      <Menu op1="" />
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
      <Footer />
    </>
  );
};

export default VerProdutos;
