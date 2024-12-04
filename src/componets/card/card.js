import './card.css';

export const Card = (props) => {
    return (
        <>
            <div className='card'>
                <div className='foto'><img src={props.imagem}></img></div>
                <div className='info' >
                    <div className='titulo'>{props.titulo}</div>
                    <div className='preco'>R$:{props.preco}</div>
                    <div className='status'>Status:{props.stts}</div>
                    <div className='btn'><button>Adicionar</button></div>
                </div>
            </div>
        </>
    );
}
