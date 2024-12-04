import './card.css';

interface ICard{
    imagem: string,
    titulo: string,
    preco: string,
    status: string
}

export const card:React.FC<ICard>  = ({imagem, titulo, preco, status}) => {
    return (
        <>
            <div className='card'>
                <div className='foto'><img src={imagem}></img></div>
                <div className='info' >
                    <div className='titulo'>{titulo}</div>
                    <div className='preco'>R$:{preco}</div>
                    <div className='status'>Status:{status}</div>
                    <div className='btn'><button>Adicionar</button></div>
                </div>
            </div>
        </>
    );
}
