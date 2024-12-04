import './menu.css';
import carrinho from '../../assets/carrinho.png'

export const Menu = (props) => {
    return (
        <>
            <div className="menu">
                <div className="logo">
                    <p>Nome logo</p>
                </div>
                <div className="funcoes">
                    <h5>Olá, {props.cliente}</h5>
                    <img src={carrinho}></img>
                </div>
            </div>
        </>
    );
}

