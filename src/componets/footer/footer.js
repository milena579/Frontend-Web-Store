import './footer.css';
import imgInsta from '../../assets/instagram.png';
import imgWhats from '../../assets/whatsapp.png';

export const Footer = (props) => {
    return (
        <>
            <div className="footer">
                <div className='title'>
                    <div className="logo">
                        <p>Nome logo</p>
                    </div>
                    <div className="icons">
                        <a href='#'><img src={imgInsta} alt=''></img></a>
                        <a href='#'><img src={imgWhats} alt=''></img></a>
                    </div>
                </div>
                <hr/>
                <div className='submenus'>
                    <div className='list'>
                        <h4>MENU</h4>
                        <p>Calça</p>
                        <p>Camiseta</p>
                        <p>Conjunto</p>
                        <p>Jaqueta</p>
                        <p>Vestido</p>
                        <p></p>
                    </div>
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

