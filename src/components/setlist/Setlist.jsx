import { useState } from 'react';
import { motion } from 'framer-motion';
import './Setlist.css';

export default function Setlist({ onNext }) {
  const tracks = [
    {
      id: 1,
      title: 'Jantar Romântico',
      desc: 'Um lugar novo para explorar sabores.',
      time: '3:45',
      genre: 'Acústico',
    },
    {
      id: 2,
      title: 'Aventura ao Ar Livre',
      desc: 'Passeio, natureza e fotografias.',
      time: '4:20',
      genre: 'Upbeat',
    },
    {
      id: 3,
      title: 'Maratona de Séries',
      desc: 'Pipocas e descanso no sofá.',
      time: '8:00',
      genre: 'Chill',
    },
    {
      id: 4,
      title: 'Passeio Surpresa',
      desc: 'Deixa o destino por minha conta.',
      time: '?:??',
      genre: 'Mystery',
    },
  ];

  const [likes, setLikes] = useState({});

  const toggleLike = (id) => {
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const hasLikes = Object.values(likes).some((liked) => liked);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  // NOVA FUNÇÃO: Pega os IDs das faixas favoritadas e envia para o App.jsx
  const handleAdvance = () => {
    const selectedIds = Object.keys(likes)
      .filter((id) => likes[id])
      .map(Number);
    onNext(selectedIds);
  };

  return (
    <motion.div
      className="setlist-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.8 }}
    >
      <div className="setlist-header">
        <motion.span
          className="now-playing"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          NOW PLAYING
        </motion.span>
        <h2>Setlist Oficial</h2>
        <p>Deslize e favorite (💜) o que você quer na nossa tour.</p>
      </div>

      <motion.div
        className="carousel"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {tracks.map((track, index) => (
          <motion.div
            className={`track-card ${likes[track.id] ? 'selected' : ''}`}
            key={track.id}
            variants={cardVariants}
          >
            <div className="track-top">
              <span className="track-number">TRACK 0{index + 1}</span>
              <button
                className={`like-btn ${likes[track.id] ? 'liked' : ''}`}
                onClick={() => toggleLike(track.id)}
              >
                {likes[track.id] ? '💜' : '🤍'}
              </button>
            </div>

            <div className="track-content">
              <h3>{track.title}</h3>
              <p>{track.desc}</p>
            </div>

            {/* Interface do Player de Música */}
            <div className="player-ui">
              <div className="progress-area">
                <div className="progress-bar-bg">
                  <motion.div
                    className="progress-bar-fill"
                    initial={{ width: '0%' }}
                    animate={{ width: likes[track.id] ? '100%' : '20%' }}
                    transition={{
                      duration: likes[track.id] ? 2.5 : 0.5,
                      ease: 'linear',
                    }}
                  />
                  <motion.div
                    className="progress-dot"
                    initial={{ left: '0%' }}
                    animate={{ left: likes[track.id] ? '100%' : '20%' }}
                    transition={{
                      duration: likes[track.id] ? 2.5 : 0.5,
                      ease: 'linear',
                    }}
                  />
                </div>
                <div className="time-info">
                  <span>{likes[track.id] ? track.time : '0:45'}</span>
                  <span>{track.time}</span>
                </div>
              </div>

              <div className="track-footer">
                <span className="genre-tag">{track.genre}</span>

                {likes[track.id] && (
                  <div className="equalizer">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                  </div>
                )}
              </div>
            </div>

            <div className="card-glow"></div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="action-area"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        {/* BOTÃO ATUALIZADO CHAMANDO O handleAdvance */}
        <button
          className={`next-stage-btn ${!hasLikes ? 'disabled' : ''}`}
          onClick={hasLikes ? handleAdvance : null}
        >
          {hasLikes
            ? 'Avançar para o Palco Principal ➔'
            : 'Escolha ao menos uma faixa'}
        </button>
      </motion.div>
    </motion.div>
  );
}
