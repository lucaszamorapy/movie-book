import { useParams } from "react-router-dom";

const MoviePage = () => {
  const { id } = useParams(); // Captura o ID do filme da URL
  // Use o ID do filme para carregar os detalhes do filme
  return (
    <div>
      <h2>Detalhes do Filme {id}</h2>
      {/* Carregue os detalhes do filme aqui usando o ID */}
    </div>
  );
};

export default MoviePage;
