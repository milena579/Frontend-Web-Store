
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {ROUTES} from "@/constants/routes";

import './Carrinho.css';

interface IProduto{
  id: number,
  title: string, 
  price: number,
  status: boolean
}

interface ICart{
  id: number,
  totalPrice: number,
  cartProduct : {id: number, quantity : number, totalPrice: number, product : IProduto}[]
}

function Carrinho(){
  const [produtos, setProdutos] = useState<IProduto[]>([]);
  const router = useRouter();

  useEffect(() => {
    if(!sessionStorage.get("Token")){
      router.push(ROUTES.login);
    }

    const LoadData = async () => {
      const response = await fetch('') {
        //terminar colocando a autorização do token 
      }
    }
  })

  

  const atualizarQuantidade = (id, mudanca) => {
   
  };


  const removerProduto = (id) => {

  };


  return (
    <div className="carrinho-container">
      <h2 className="carrinho-titulo">Meu Carrinho</h2>
      <div className="carrinho-lista">
        {produtos.map((produto) => (
          <div key={produto.id} className="carrinho-item">
            <div className="produto-info">
              <div className="produto-imagem"></div>
              <div>
                <h3 className="produto-nome">{produto.nome}</h3>
              </div>
            </div>
            <div className="produto-quantidade">
              <button onClick={() => atualizarQuantidade(produto.id, -1)}>-</button>
              <span>{produto.quantidade}</span>
              <button onClick={() => atualizarQuantidade(produto.id, 1)}>+</button>
            </div>
            <p className="produto-total">R$ {(produto.preco * produto.quantidade).toFixed(2)}</p>
            <button onClick={() => removerProduto(produto.id)} className="remover-produto">
              Remover
            </button>
          </div>
        ))}
      </div>
      <div className="carrinho-resumo">
        <div className="resumo-valores">
          <p>Subtotal: R$ {subtotal.toFixed(2)}</p>
          <h3>Total: R$ {total.toFixed(2)}</h3>
        </div>
      </div>
      <button className="fechar-pedido" onClick={FecharPedido()}>Fechar Pedido</button>
    </div>
  );
}

export default Carrinho;
