import { useState } from 'react';
import { motion } from 'framer-motion';
import './Suggestion.css';

export default function Suggestion({ onNext }) {
  const [suggestion, setSuggestion] = useState('');

  // Agora ele apenas avança e envia o texto para o App.jsx
  const handleAdvance = () => {
    onNext(suggestion);
  };

  return (
    <motion.div
      className="suggestion-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.6 }}
    >
      <div className="suggestion-box">
        <div className="icon-chat">💬</div>
        <h2>Quase lá!</h2>
        <p>
          Eu vi as suas escolhas, mas quero saber: tem algum pedido especial ou
          sugestão para a nossa tour?
        </p>

        <textarea
          className="suggestion-input"
          placeholder="Ex: Quero comer sushi! / Vamos naquele parque novo... (Opcional)"
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
          rows="4"
        />

        <button className="btn-whatsapp" onClick={handleAdvance}>
          Continuar ➔
        </button>
      </div>
    </motion.div>
  );
}
