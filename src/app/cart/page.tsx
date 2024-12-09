"use client"

import React, { useState } from "react";

const Carrinho = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [produtoParaRemover, setProdutoParaRemover] = useState(null);
  const [cupom, setCupom] = useState("");
  const [cupomStatus, setCupomStatus] = useState("");

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

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-xl">
      <h2 className="text-center text-purple-700 mb-6 text-2xl">Meu Carrinho</h2>
      
      <div
        className="flex justify-between p-4 bg-white mb-4 rounded-lg shadow-md"
      >
        <div>
          <h3 className="text-lg font-semibold">Item</h3>
          <p className="text-sm">Preço: R$</p>
          <div className="flex items-center mt-3">
            <button
              className="px-4 py-2 bg-gray-300 rounded-md cursor-pointer mr-3"
            >
              -
            </button>
            <span className="text-lg font-semibold">1</span>
            <button
              className="px-4 py-2 bg-gray-300 rounded-md cursor-pointer ml-3"
            >
              +
            </button>
          </div>
        </div>
        {/* <button onClick={() => abrirModal(produto.id)} className="text-red-600 border-none bg-transparent cursor-pointer">
          Remover
        </button> */}
      </div>
     
      <div className="mt-6">
        <h4 className="text-lg font-medium">Subtotal: R$</h4>
        <h4 className="text-lg font-medium">Entrega: R$</h4>
        <h3 className="text-xl font-semibold">Total: R$</h3>
      </div>
      
      <button
        className="w-full py-4 bg-purple-700 text-white text-lg font-semibold rounded-lg mt-6 cursor-pointer"
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
