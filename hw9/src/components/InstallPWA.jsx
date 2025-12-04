import React, { useState, useEffect } from 'react';
import '../styles/InstallPWA.css';

function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('✅ User accepted the install prompt');
      setShowInstallButton(false);
    } else {
      console.log('❌ User dismissed the install prompt');
    }
    
    setDeferredPrompt(null);
  };

  if (!showInstallButton) return null;

  return (
    <div className="install-pwa">
      <div className="install-pwa-content">
        <p>📱 Install Ghibli Films app for better experience</p>
        <button onClick={handleInstallClick} className="install-btn">
          Install App
        </button>
        <button 
          onClick={() => setShowInstallButton(false)} 
          className="close-btn"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default InstallPWA;