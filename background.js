chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  if (message.type === 'capture') {
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
        height: message.height,
        cardType: message.cardType
      }, (response) => {
        sendResponse({ success: true });
      });

      return true;  // Indicate that the response will be sent asynchronously.
    });
  } else if (message.type === 'redirect') {
    const redirectUrl = message.url;
    chrome.tabs.create({url: redirectUrl, active: false, index: sender.tab.id});
    
    // chrome.tabs.update(sender.tab.id, { url: redirectUrl });
  } 
  // else if (message.type === 'downloadImage') {
    // chrome.downloads.download({
    //   url: message.url,
    //   filename: 'capture.png'
    // }, (downloadId) => {
    //   if (chrome.runtime.lastError) {
    //     console.error('Error downloading file:', chrome.runtime.lastError);
    //   } else {
    //     console.log('Download started, ID:', downloadId);
    //   }
    // });
  // }
});

chrome.action.onClicked.addListener((tab) => {
  // chrome.tabs.sendMessage(tab.id, { type: 'startCapture' });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  }, () => {
    // Send a message to the content script
    chrome.tabs.sendMessage(tab.id, { type: 'startCapture' });
  });
});
