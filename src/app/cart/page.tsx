"use client"

import { Menu } from '@/componets/menu/menu';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";

if (process.env.NODE_ENV === 'development') {
  const originalConsoleError = console.error;

  console.error = (...args) => {
    // Checa se a mensagem de erro contém "Hydration"
    if (args[0] && args[0].includes('key')) {
      return; // Supressão: não mostra erros de hidratação
    }
    
    // Para qualquer outro erro, exibe normalmente
    originalConsoleError.apply(console, args);
  };
}

interface IProduto {
  id: number;
  title: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

const Carrinho = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [produtoParaRemover, setProdutoParaRemover] = useState(null);

  const abrirModal = () => {
    // setProdutoParaRemover(id);
    setIsModalOpen(true);
  };

  const fecharModal = () => {
    setProdutoParaRemover(null);
    setIsModalOpen(false);
  };

  const confirmarRemocao = () => {
    // setProdutos((produtos) => produtos.filter((produto) => produto.id !== produtoParaRemover));
    // fecharModal();
  };

  const alterarQuantidade = async () => {
    // setProdutos((produtos) =>
    //   produtos.map((produto) =>
    //     produto.id === id
    //       ? {
    //           ...produto,
    //           quantidade: operacao === "aumentar" ? produto.quantidade + 1 : Math.max(1, produto.quantidade - 1),
    //         }
    //       : produto
    //   )
    // );
  };

  const [produtos, setProdutos] = useState<IProduto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const res = await fetch(`http://localhost:8080/cart`);
        if (!res.ok) throw new Error("Erro ao buscar produtos do carrinho");
        const data = await res.json();
        setProdutos(data);
      } catch (err) {
        setProdutos([
          {
            id: 0,
            title: "ERRO AO CARREGAR PRODUTO",
            price: 0,
            quantity: 0,
            totalPrice: 0
          },
        ]);
        setError("Erro ao carregar produtos do carrinho");
      }
    };

    fetchProdutos();
  }, []);

  return (
    <>
      <Menu op1="" ></Menu>
      <div className='items-center w-full h-screen justify-center mt-16'>
        <div className="max-w-5xl mx-auto p-6 bg-gray-100 rounded-xl">
          <h2 className="text-center text-teal-500 mb-6 text-2xl">Meu Carrinho</h2>

          <div className="flex justify-between p-4 bg-white mb-4 rounded-lg shadow-md mt-4 overflow-x-auto max-h-[480px] flex-col">
            {produtos.map((item, index) => (
              <div className='pb-4'>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm">Preço: R$ {item.price}</p>
                <div className="flex items-center mt-3">
                  <button className="w-6 bg-gray-300 rounded-md cursor-pointer mr-3" > - </button>
                  <span className="text-sm font-semibold">{item.quantity}</span>
                  <button className="w-6 bg-gray-300 rounded-md cursor-pointer ml-3" > + </button>
                </div>
              </div>
              ))}

            <hr className='pb-4'/>

            



            

            
            
            {/* <button onClick={() => abrirModal(produto.id)} className="text-red-600 border-none bg-transparent cursor-pointer">
                    Remover
                    </button> */}
          </div>

          <div className="mt-6">
            <h4 className="text-lg font-medium">Subtotal: R$</h4>
            <h3 className="text-xl font-semibold">Total: R$</h3>
          </div>

          <button
            className="w-full py-4 bg-teal-500 text-white text-lg font-semibold rounded-lg mt-6 cursor-pointer"
          >
            Fechar Pedido
          </button>
          {/* <Modal
                    isOpen={isModalOpen}
                    onClose={fecharModal}
                    onConfirm={confirmarRemocao}
                    title="Confirmação"
                    message="Tem certeza que deseja remover este produto?" 
                /> */}
        </div>
      </div>
    </>
  );
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  maxWidth: "400px",
  width: "90%",
  textAlign: "center",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
};

const cancelButtonStyle = {
  backgroundColor: "#ccc",
  padding: "10px 20px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const confirmButtonStyle = {
  backgroundColor: "#7B2CBF",
  color: "#fff",
  padding: "10px 20px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default Carrinho;
