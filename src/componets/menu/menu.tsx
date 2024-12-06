import Link from 'next/link';
import './menu.css';
// import carrinho from '../../assets/carrinho.png'
import {ROUTES} from "@/constants/routes"

interface IMenu{
    op1: string,
    op2: string,
}

export const Menu:React.FC<IMenu>  = ({op1, op2}) => {
    return (
        <>
            <nav className="flex flex-row px-14 text-teal-500">
                <div className="menu w-[80%]">
                    <Link href={ROUTES.home}>
                        <div className="logo">
                            <p>Prata real</p>
                        </div>
                    </Link>
                    <Link href={ROUTES.products}>Produtos</Link>
                    <div className="funcoes">
                        {/* <h5>Olá, {op1}</h5> */}
                        <Link href={ROUTES.cart}><img src={op2}></img></Link>
                    </div>
                </div>
            </nav>
        </>
    );
}

