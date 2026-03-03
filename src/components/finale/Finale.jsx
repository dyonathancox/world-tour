import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import './Finale.css';

// AGORA RECEBEMOS A SUGESTÃO AQUI TAMBÉM
export default function Finale({ selectedTracks = [], suggestion = '' }) {
  const [accepted, setAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const moveNoButton = () => {
    const randomX = Math.floor(Math.random() * 120) - 60;
    const randomY = Math.floor(Math.random() * 120) - 60;
    setNoPosition({ x: randomX, y: randomY });
  };

  const isPerfectBalance =
    selectedTracks.includes(2) && selectedTracks.includes(3);

  // LÓGICA DO WHATSAPP MOVIDA PARA O FINAL
  const handleSendToWhatsApp = () => {
    const trackNames = {
      1: 'Jantar Romântico',
      2: 'Aventura ao Ar Livre',
      3: 'Maratona de Séries',
      4: 'Passeio Surpresa',
    };

    const chosenNames = selectedTracks.map((id) => trackNames[id]).join(', ');
    let message = `Oi amor! 💜\nEstou pronta para a nossa World Tour!\n\nMinhas escolhas do Setlist:\n🎫 ${chosenNames}`;

    if (suggestion.trim() !== '') {
      message += `\n\nMinha sugestão especial para a gente:\n✨ "${suggestion}"`;
    }

    message += `\n\nBorahae! 🫰`;

    const encodedMessage = encodeURIComponent(message);

    // COLOQUE SEU NÚMERO AQUI (DDI + DDD + Número. Ex: 5511988887777)
    const yourPhoneNumber = '5515998139184';

    window.open(
      `https://wa.me/${yourPhoneNumber}?text=${encodedMessage}`,
      '_blank',
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  return (
    <motion.div
      className="finale-container"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.6 }}
    >
      {accepted && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          colors={['#8B5CF6', '#A78BFA', '#C4B5FD', '#ffffff']}
          recycle={false}
          numberOfPieces={500}
        />
      )}

      {!accepted ? (
        <div className="question-box">
          <div className="icon-flight">✈️</div>
          <h2>Pronta para embarcar nesta Tour?</h2>
          <p>O teu bilhete já está emitido e não tem reembolso!</p>

          <div className="buttons-group">
            <button className="btn-yes" onClick={() => setAccepted(true)}>
              Sim, óbvio!
            </button>

            <motion.button
              className="btn-no"
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
              animate={{ x: noPosition.x, y: noPosition.y }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              Não
            </motion.button>
          </div>
        </div>
      ) : (
        <motion.div
          className="success-message"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.h1 className="borahae-title" variants={itemVariants}>
            Borahae! <span className="heart-3d">💜</span>
          </motion.h1>

          <motion.p className="malas-text" variants={itemVariants}>
            Prepara as malas, porque a nossa Magic Shop espera por nós.
          </motion.p>

          {isPerfectBalance && (
            <motion.div className="special-combo" variants={itemVariants}>
              <span className="combo-badge">
                ✨ COMBO PERFEITO DESBLOQUEADO ✨
              </span>
              <h3>Aventura + Séries</h3>
              <p className="combo-desc">
                Você escolheu o equilíbrio ideal: bater perna durante o dia,
                para depois deitar agarradinha maratonando à noite!
              </p>
            </motion.div>
          )}

          <motion.div className="heart-pulse" variants={itemVariants}>
            <div className="icon-pulse">🫰</div>
          </motion.div>

          {/* BOTÃO DO WHATSAPP FINAL */}
          <motion.button
            className="btn-final-whatsapp"
            variants={itemVariants}
            onClick={handleSendToWhatsApp}
          >
            Avisar que estou pronta! 💚
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}
