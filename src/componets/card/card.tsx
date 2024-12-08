import './card.css';

interface ICard{
    imagem: string,
    titulo: string,
    preco: number,
    status: boolean,
    onAdd : () => void;
}

export const Card:React.FC<ICard> = ({imagem, titulo, preco, status, onAdd}) => {
    return (
        <>
            <div className='card'>
                <div className='foto'><img src={String(imagem)}></img></div>
                <div className='info' >
                    <div className='flex gap-4 items-center w-full justify-center'>
                        <div className='titulo'>{titulo}</div>
                        <div className='status'>{status}</div>
                    </div>
                    <div className='preco font-bold'>R$:{preco}</div>
                    <div className='btn' onClick={onAdd}><button>Adicionar</button></div>
                </div>
            </div>
        </>
    );
}
