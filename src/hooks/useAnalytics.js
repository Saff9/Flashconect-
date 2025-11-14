// FlashConnect - Analytics Hook
// src/hooks/useAnalytics.js

import { useEffect } from 'react';
import { analytics } from '@/utils/firebase';
import { logEvent } from 'firebase/analytics';

export const useAnalytics = () => {
  const trackEvent = (eventName, eventParams = {}) => {
    if (analytics) {
      logEvent(analytics, eventName, eventParams);
    }
  };

  const trackPageView = (pageTitle) => {
    trackEvent('page_view', {
      page_title: pageTitle,
      page_location: window.location.href
    });
  };

  const trackLogin = (method) => {
    trackEvent('login', { method });
  };

  const trackMessageSent = (messageType = 'text') => {
    trackEvent('message_sent', { type: messageType });
  };

  const trackFileUpload = (fileType, fileSize) => {
    trackEvent('file_upload', { file_type: fileType, file_size: fileSize });
  };

  return {
    trackEvent,
    trackPageView,
    trackLogin,
    trackMessageSent,
    trackFileUpload
  };
};

// Hook for page view tracking
export const usePageView = (pageTitle) => {
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    trackPageView(pageTitle);
  }, [pageTitle, trackPageView]);
};
