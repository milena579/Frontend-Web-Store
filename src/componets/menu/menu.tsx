"use client"

import Link from 'next/link';
import './menu.css';
// import carrinho from '../../assets/carrinho.png'
import {ROUTES} from "@/constants/routes"
import Image from "next/image";
import cart from "/public/shopping-cart.png";
import user from "/public/user.png";
import { useEffect, useState } from 'react';


interface IMenu{
    op1?: string,
}

export const Menu: React.FC<IMenu> = ({ op1 }) => {
  const [userName, setUserName] = useState<string | null>(null);

  const fetchUserData = async () => {
    const token = sessionStorage.getItem("Token");

    if (!token) {
      console.log("Token não encontrado.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/user", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      if (!response.ok) {
        console.error("Erro ao buscar dados do usuário:", response.statusText);
        return;
      }

      const data = await response.json();
      setUserName(data.name ); 
    } catch (error) {
      console.error("Erro ao buscar os dados do usuário:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

    return (
        <>
            <nav className="flex flex-row px-10 text-teal-500 shadow-lg shadow-cyan-300/50">
                <div className="menu w-full">
                    <Link href={ROUTES.home}>
                        <div className="logo">
                            <p>Prata real</p>
                        </div>
                    </Link>
                    <Link href={ROUTES.products}>Produtos</Link>
                    <div className="funcoes items-center">
                        <Image width={24} height={24} src={cart} alt="carrinho" priority></Image>

                        <div className='flex items-center gap-4 justify-around w-[30%]'>
                            <Link href={ROUTES.profile}><Image width={54} height={24} src={user} alt="user"></Image>  </Link>
                            <h1 className='opacity-100'>Olá {userName || op1 || "Visitante"}</h1>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}



