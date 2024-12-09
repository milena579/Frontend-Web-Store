import './footer.css';
// import imgInsta from '../../assets/instagram.png';
// import imgWhats from '../../assets/whatsapp.png';

import Image from "next/image";
import logo from "@/app/favicon.ico";

export const Footer = () => {
    return (
        <>
            <div className="footer bg-teal-500">
                <div className='title'>
                    <div className="logo">
                        <Image width={24} height={24} src={logo} alt="logo" priority/>
                        <h3>Prata real</h3>
                    </div>
                    <div className="icons">
                        {/* <a href='#'><img src={imgInsta} alt=''></img></a>
                        <a href='#'><img src={imgWhats} alt=''></img></a> */}
                    </div>
                </div>
                <hr/>
                <div className='submenus'>
                    <div className='list'>
                        <h4>INSTITUCIONAL</h4>
                        <p>Quem somos</p>
                    </div>
                    <div className='list'>
                        <h4>POLÍTICAS</h4>
                        <p>Privacidade e segurança</p>
                        <p>Trocas e cancelamentos</p>
                    </div>
                    <div className='list'>
                        <h4>CENTRAL DE ATENDIMENTO</h4>
                        <p>Telefone</p>
                        <p>Email</p>
                        <p>Fale conosco</p>
                    </div>
                </div>
                <p className='copyright'>Copyright © 2024 Nome da loja. Todos os direitos reservados.</p>
            </div>
        </>
    );
}

