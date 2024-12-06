import './card.css';

interface ICard{
    imagem: string,
    titulo: string,
    preco: string,
    status: string
}

export const Card:React.FC<ICard> = ({imagem, titulo, preco, status}) => {
    return (
        <>
            <div className='card'>
                <div className='foto'><img src={imagem}></img></div>
                <div className='info' >
                    <div className='flex gap-4 items-center w-full justify-center'>
                        <div className='titulo'>{titulo}</div>
                        <div className='status'>{status}</div>
                    </div>
                    <div className='preco font-bold'>R$:{preco}</div>
                    <div className='btn'><button>Adicionar</button></div>
                </div>
            </div>
        </>
    );
}
