// FlashConnect - Domain Check Component
// src/components/debug/DomainCheck.jsx

import { useEffect, useState } from 'react';

export default function DomainCheck() {
  const [domainInfo, setDomainInfo] = useState({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDomainInfo({
        hostname: window.location.hostname,
        href: window.location.href,
        origin: window.location.origin,
        protocol: window.location.protocol
      });
    }
  }, []);

  return (
    <div className="fixed bottom-4 left-4 bg-yellow-100 border border-yellow-400 text-yellow-800 p-3 rounded-lg text-xs max-w-xs z-50">
      <strong>🔧 Domain Debug Info:</strong>
      <div>Host: {domainInfo.hostname}</div>
      <div>Origin: {domainInfo.origin}</div>
      <div className="mt-1 text-yellow-600">
        Make sure this domain is authorized in Firebase Console
      </div>
    </div>
  );
}
