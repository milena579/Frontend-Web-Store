"use client"

import Link from 'next/link';
import './menu.css';
// import carrinho from '../../assets/carrinho.png'
import {ROUTES} from "@/constants/routes"
import Image from "next/image";
import cart from "@/app/assets/shopping-cart.png";
import user from "@/app/assets/user.png";
import { useEffect, useState } from 'react';
import logo from "@/app/favicon.ico"

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
        console.log("Erro ao buscar dados do usuário:", response.statusText);
        return;
      }

      const data = await response.json();
      setUserName(data.name ); 
    } catch (error) {
      console.log("Erro ao buscar os dados do usuário:", error);
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
                            <Image width={24} height={24} src={logo} alt="logo" priority/>
                            <h3>Prata real</h3>
                        </div>
                    </Link>
                    <Link href={ROUTES.products}>Produtos</Link>
                    <div className="funcoes items-center">
                        <Link href={ROUTES.cart}><Image width={24} height={24} src={cart} alt="carrinho" priority></Image></Link>
                        
                        <Link href={ROUTES.profile}>
                          <div className='flex items-center gap-4 justify-around w-[30%]'>
                              <Image width={54} height={24} src={user} alt="user"></Image> 
                              <h1 className='opacity-100'>{userName || op1 || "Logar"}</h1>
                          </div>                   
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
}



