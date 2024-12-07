import Link from 'next/link';
import './menu.css';
// import carrinho from '../../assets/carrinho.png'
import {ROUTES} from "@/constants/routes"
import Image from "next/image";
import cart from "/public/shopping-cart.png";
import user from "/public/user.png";


interface IMenu{
    op1: string,
    op2: string
}

export const Menu:React.FC<IMenu>  = ({op1, op2}) => {
    return (
        <>
            <nav className="flex flex-row px-14 text-teal-500 shadow-lg shadow-cyan-300/50">
                <div className="menu w-full">
                    <Link href={ROUTES.home}>
                        <div className="logo">
                            <p>Prata real</p>
                        </div>
                    </Link>
                    <Link href={ROUTES.products}>Produtos</Link>
                    <div className="funcoes">
                        {/* <h5>Olá, {op1}</h5> */}
                        <Link href={ROUTES.user}></Link>
                        <Image src={cart} alt="carrinho" priority></Image>

                        <div className='flex items-center gap-4 justify-around w-[30%]'>
                            <h1 className='opacity-100  '>Olá fulano {op2}</h1>
                            <Image src={user} alt="user" priority></Image>  
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

