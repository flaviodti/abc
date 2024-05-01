import React, {useState, useEffect } from 'react';

const Joke = () => {
    //estado da piada atual
    const [joke, setJoke] = useState('');
    //estado para caracterizar a categoria selecionada
    const [categoria, setCategoria] = useState('Programming');
    //função para buscar a piada no servidor
    const fetchJoke = async () => {
        try{
            const resposta = await fetch(`https://v2.jokeapi.dev/joke/${categoria}?type=single`);
            //convertendo a resposta para o formato json
            const data = await resposta.json();
            //verifica se a piada é em uma parte ou duas
            if(data.type === 'single'){
                setJoke(data.joke);
            }else{
                setJoke(`${data.setup} ... ${data.delivery}`);
            }
        }catch(error){
            //tratamento de erros
            console.log("erro: "+error);
            setJoke("erro ao buscar piada");
        }
    }
    //chama o fetchJoke (buscar uma nova piada) quando alterar a categoria
    useEffect(() => {
        fetchJoke();
    },[categoria]);

    return (
        <div>
            {/* titulo da piada com a categoria atual */}
            <h2>Piada da categoria: {categoria}</h2>
            {/*exibe a piada atual*/}
            <p>{joke}</p>

            {/*botao para buscar uma nova piada*/}
            <button onClick={fetchJoke}>Buscar outra piada</button>

            <div>
                {/* menu para selecionar a categoria*/}
                <select value={categoria} onChange={e=> setCategoria(e.target.value)}>
                    <option value="Programming">Programação</option>
                    <option value="Misc">Diversos</option>
                    <option value="Pun">Trocadilhos</option>
                </select>
            </div>
        </div>
    );
};
export default Joke;