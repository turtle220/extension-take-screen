chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'startCapture') {
      captureSelection();
    } else if (message.type === 'processImage') {
      let canvas = document.createElement('canvas');
      let img = new Image();
      img.src = message.dataUrl;
      img.onload = () => {
        canvas.width = message.width;
        canvas.height = message.height;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(img, message.startX, message.startY, message.width, message.height, 0, 0, message.width, message.height);
  
        canvas.toBlob((blob) => {
          let url = URL.createObjectURL(blob);
          chrome.runtime.sendMessage({
            type: 'downloadImage',
            url: url
          });
        }, 'image/png');
      };
      img.onerror = (e) => {
        console.error('Error loading image:', e);
      };
    }
});

function captureSelection() {
    let overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.zIndex = 10000;
    document.body.appendChild(overlay);
  
    let startX, startY, endX, endY;
    let selectionBox = document.createElement('div');
    selectionBox.style.border = '2px solid #ff0000';
    selectionBox.style.position = 'absolute';
    selectionBox.style.display = 'none';
    overlay.appendChild(selectionBox);
  
    function onMouseDown(e) {
      startX = e.clientX;
      startY = e.clientY;
      selectionBox.style.left = `${startX}px`;
      selectionBox.style.top = `${startY}px`;
      selectionBox.style.width = 0;
      selectionBox.style.height = 0;
      selectionBox.style.display = 'block';
      overlay.addEventListener('mousemove', onMouseMove);
      overlay.addEventListener('mouseup', onMouseUp);
    }
  
    function onMouseMove(e) {
      endX = e.clientX;
      endY = e.clientY;
      selectionBox.style.width = `${Math.abs(endX - startX)}px`;
      selectionBox.style.height = `${Math.abs(endY - startY)}px`;
      selectionBox.style.left = `${Math.min(startX, endX)}px`;
      selectionBox.style.top = `${Math.min(startY, endY)}px`;
    }
  
    function onMouseUp() {
      overlay.removeEventListener('mousemove', onMouseMove);
      overlay.removeEventListener('mouseup', onMouseUp);
      overlay.remove();
  
      chrome.runtime.sendMessage({
        type: 'capture',
        startX: Math.min(startX, endX),
        startY: Math.min(startY, endY),
        width: Math.abs(endX - startX),
        height: Math.abs(endY - startY)
        }, (response) => {
            if (!response.success) {
                console.error('Failed to capture tab');
            }
        });
    }
  
    overlay.addEventListener('mousedown', onMouseDown);
  }
  
  captureSelection();
  