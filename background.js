chrome.runtime.onInstalled.addListener(() => {
    console.log('Background script installed');
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Message received in background:', message);
  
    if (message.type === 'capture') {
      console.log('Capture message received:', message);
  
      chrome.tabs.captureVisibleTab({ format: 'png' }, (dataUrl) => {
        if (chrome.runtime.lastError) {
          console.error('Error capturing tab:', chrome.runtime.lastError);
          sendResponse({ success: false });
          return;
        }
  
        chrome.tabs.sendMessage(sender.tab.id, {
          type: 'processImage',
          dataUrl: dataUrl,
          startX: message.startX,
          startY: message.startY,
          width: message.width,
          height: message.height
        }, (response) => {
        //   if (chrome.runtime.lastError) {
        //     console.error('Error sending message to content script:', chrome.runtime.lastError);
        //   }
          sendResponse({ success: true });
        });
  
        return true;  // Indicate that the response will be sent asynchronously.
      });
    } else if (message.type === 'downloadImage') {
      chrome.downloads.download({
        url: message.url,
        filename: 'capture.png'
      }, (downloadId) => {
        if (chrome.runtime.lastError) {
          console.error('Error downloading file:', chrome.runtime.lastError);
        } else {
          console.log('Download started, ID:', downloadId);
        }
      });
    }
  });
  