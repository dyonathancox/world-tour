import { useState } from 'react';
import { motion } from 'framer-motion';
import './Ticket.css';

export default function Ticket({ onNext }) {
  const [isTorn, setIsTorn] = useState(false);

  const handleTearTicket = () => {
    if (isTorn) return;
    setIsTorn(true);

    // Espera 1 segundo para a animação de rasgar terminar antes de trocar de tela
    setTimeout(() => {
      onNext();
    }, 1000);
  };

  return (
    <motion.div
      className="ticket-container"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <motion.div
        className="ticket-wrapper"
        animate={!isTorn ? { y: [-5, 5, -5] } : {}}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        onClick={handleTearTicket}
      >
        {/* METADE SUPERIOR */}
        <motion.div
          className="ticket-half ticket-main"
          animate={
            isTorn
              ? { y: -100, x: -20, rotate: -10, opacity: 0 }
              : { y: 0, x: 0, rotate: 0, opacity: 1 }
          }
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Furos da linha de corte */}
          <div className="cutout left"></div>
          <div className="cutout right"></div>

          <div className="ticket-header">
            <div className="titles">
              <span className="tour-subtitle">THE MAGIC SHOP EXPERIENCE</span>
              <h1 className="tour-title">OUR PRIVATE TOUR</h1>
            </div>
            <span className="vip-badge">ARMY VIP</span>
          </div>

          <div className="ticket-body">
            <div className="info-row full">
              <label>PASSAGEIRA EXCLUSIVA</label>
              <h2>A Mulher da Minha Vida</h2>
            </div>

            <div className="info-row split">
              <div className="info-item">
                <label>DATA</label>
                <p>A definir</p>
              </div>
              <div className="info-item">
                <label>DESTINO</label>
                <p>Surpresa 💜</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* METADE INFERIOR - CANHOTO */}
        <motion.div
          className="ticket-half ticket-stub"
          animate={
            isTorn
              ? { y: 100, x: 20, rotate: 10, opacity: 0 }
              : { y: 0, x: 0, rotate: 0, opacity: 1 }
          }
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <div className="barcode-box"></div>
          <div className="stub-content">
            <span className="ticket-serial">TKT-2312-BTS</span>
            <span className="admit-text">ADMIT ONE</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.p
        className="click-hint"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
      >
        {isTorn ? 'Validando acesso...' : 'Toque no ingresso para rasgar'}
      </motion.p>
    </motion.div>
  );
}
