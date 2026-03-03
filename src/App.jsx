import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Ticket from './components/ticket/Ticket';
import Setlist from './components/setlist/Setlist';
import Suggestion from './components/Suggestion/Suggestion';
import Finale from './components/finale/Finale';

function App() {
  const [stage, setStage] = useState('ticket');
  const [choices, setChoices] = useState([]);
  const [userSuggestion, setUserSuggestion] = useState(''); // <-- NOVO: Guarda a sugestão dela

  return (
    <main>
      <AnimatePresence mode="wait">
        {stage === 'ticket' && (
          <Ticket key="ticket" onNext={() => setStage('setlist')} />
        )}

        {stage === 'setlist' && (
          <Setlist
            key="setlist"
            onNext={(selectedIds) => {
              setChoices(selectedIds);
              setStage('suggestion'); // <-- Muda para suggestion em vez de finale
            }}
          />
        )}

        {/* NOVA TELA AQUI */}
        {stage === 'suggestion' && (
          <Suggestion
            key="suggestion"
            selectedTracks={choices}
            onNext={(suggestionText) => {
              setUserSuggestion(suggestionText); // Salva o que ela digitou
              setStage('finale');
            }}
          />
        )}

        {stage === 'finale' && (
          <Finale
            key="finale"
            selectedTracks={choices}
            suggestion={userSuggestion} // Opcional: passa a sugestão pra última tela se quiser usar lá
          />
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
