// FlashConnect - Domain Test
// src/utils/domain-test.js

export const testDomainAuthorization = () => {
  if (typeof window === 'undefined') return;
  
  const currentDomain = window.location.hostname;
  const authorizedDomains = [
    'localhost',
    'flashconect1.vercel.app',
    'flashconect1-h7p2rs5vl-saffan-s-projects.vercel.app',
    'genz-owaisblog.firebaseapp.com'
  ];

  const isAuthorized = authorizedDomains.includes(currentDomain);
  
  console.log('🔧 Domain Authorization Check:');
  console.log('📍 Current Domain:', currentDomain);
  console.log('✅ Authorized:', isAuthorized);
  console.log('📋 Expected Domains:', authorizedDomains);

  if (!isAuthorized) {
    console.error('❌ DOMAIN NOT AUTHORIZED! Add this domain to Firebase Console:');
    console.error('   Firebase Console → Authentication → Settings → Authorized Domains');
    console.error('   Add:', currentDomain);
  }

  return isAuthorized;
};
