let frontImage = '';
let backImage = '';
let frontBlobImage = '';
let backBlobImage = '';
let imgURL = '';
let flag = false;

// Function to create and append a link element
function loadFont(url) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
}

// URLs for the Google Fonts
const aleoFontURL = 'https://fonts.googleapis.com/css2?family=Aleo:wght@400;700&display=swap';
const poppinsFontURL = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap';

// Load the fonts
loadFont(aleoFontURL);
loadFont(poppinsFontURL);

// Optional: Apply the fonts once loaded
document.head.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
  link.onload = () => {
    document.body.style.fontFamily = "'Poppins', sans-serif";  // Example for Poppins
    // You can apply the fonts to specific elements or as needed
  };
});

function addModalStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10001;
    }

    .modal {
      background-color: #f1f3f4;
      padding: 0px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      max-width: 600px;
      text-align: center;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 70px;
      background: #00BCFF;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
    .modal-header img {
      padding-left: 20px;
      padding-right: 20px;
    }
    .modal-close-button {
      background: none;
      border: none;
      font-size: 20px;
      height: 30px;
      width: 30px;
      // cursor: pointer;
    }

    .modal-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      padding: 0px;
    }

    .modal-img-container {
      display: flex;
      align-items: center;
      padding: 10px;
      flex-wrap: wrap; /* Allows images to wrap to the next line if needed */
    }
    .modal-img-parent {
      margin: 10px;
    }
    .modal-img {
      width: 173px;
      height: 293px;
      object-fit: contain;
    }

    .empty-div {
      width: 250px;
      height: 250px;
      display: flex;
      border: 1px solid #ccc;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      align-items: center;
      justify-content: center;
      color: #888;
      margin: 0px;
      padding: 0px;
      overflow: hidden;
      border-bottom: none;
    }

    .modal-footer {
      display: flex;
      justify-content: space-between;
      gap: 10px; /* Add space between buttons */
      width: 100%;
      // margin-top: 20px;
      // padding: 20px;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      background: white;
      // position: absolute;
      bottom: 0
    }

    .modal-button {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.3s ease;
      flex: 1;
      margin: 10px;
      font-family: Aleo;
    }

    .modal-button.primary {
      background-color: #00BCFF;
      color: #fff;
      font-weight: 700;
      width: 170px;
      height: 39px;
    }

    .modal-button.cancel {
      background-color: white;
      color: #00BCFF;
      font-weight: 700;
      border-color: #00BCFF;
      border: solid 1px;
      width: 170px;
      height: 39px;
      font-size: 14px;
    }

    .modal-button-container {
      width: 100%;
      padding: 10px;
      justify-content: space-between;
      display: flex;
    }
    .modal-img-div {
      width: 173px;
      height: 293px;
      display: flex;
      border: 1px solid #ccc;
      // border-radius: 4px;
      align-items: center;
      justify-content: center;
      color: #888;
      margin: 0px;
      padding: 0px;
      overflow: hidden;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      border-bottom: none;
    }
    .modal-img-footer {
      padding: 10px;
      background-color: white;
      text-align: center;
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
      border: 1px solid #ccc;
      border-top: none;
      color: #00BCFF;
      font-size: 13px; 
      cursor: pointer; 
      font-family: Aleo;
      font-weight: 700;
      align-items: center;
      display: flex;
      justify-content: space-evenly;

    }
    .modal-title-div {
      font-size: 13px;
      font-family: 'Poppins';
      font-weight: 600;
      padding-bottom: 10px;
      color: black;
    }
    .modal-camera-img {
      width: 18px;
      height: 18px;
    }
  `;
  document.head.appendChild(style);
}

function base64toBlob(base64Data, contentType = 'image/png') {
  const byteCharacters = atob(base64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
}

async function uploadImageToImgBB(base64Image) {
  const blob = base64toBlob(base64Image.split(',')[1]);
  const formData = new FormData();
  formData.append('image', blob, 'image.png');

  const apiKey = '4be78c892c5170fec7e1da59f52e3fda';
  const response = await fetch('https://api.imgbb.com/1/upload?key=' + apiKey, {
    method: 'POST',
    body: formData
  });

  const data = await response.json();
  if (data.status === 200) {
    return data.data.url;
  } else {
    throw new Error('Failed to upload image to ImgBB');
  }
}

function showModal(message, dataUrl) {
  addModalStyles();
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay';

  const modal = document.createElement('div');
  modal.className = 'modal';

  // Create header
  const header = document.createElement('div');
  header.className = 'modal-header';

  const imgHeaderLogo = document.createElement('img');

  const vintagecards_logo = chrome.runtime.getURL('images/vintagecards_logo.png');
  imgHeaderLogo.src = vintagecards_logo;
  imgHeaderLogo.alt = 'Vintage Cards Logo';
  header.appendChild(imgHeaderLogo);


  const imgHeaderRightLogo = document.createElement('img');
  const vintage_f_logo = chrome.runtime.getURL('images/vintage_f_logo.svg')

  imgHeaderRightLogo.src = vintage_f_logo;
  imgHeaderRightLogo.className = 'modal-close-button';
  header.appendChild(imgHeaderRightLogo);

  // Create content
  const content = document.createElement('div');
  content.className = 'modal-content';

  // Create a container for images
  const imgContainer = document.createElement('div');
  imgContainer.className = 'modal-img-container';


  // capturedImages.push(imageUrl);
  if (message.cardType === true) {
    frontImage = dataUrl;
  } else {
    backImage = dataUrl;
  }

  uploadImageToImgBB(frontImage).then(url => {
    frontBlobImage = url;
  });
  uploadImageToImgBB(backImage).then(url => {
    backBlobImage = url;
  });

  // Create a parent div for each image and its footer
  const FrontDiv = document.createElement('div');
  FrontDiv.className = 'modal-img-parent';

  const imgFrontTitleDiv = document.createElement('div');
  imgFrontTitleDiv.className = 'modal-title-div';
  imgFrontTitleDiv.innerText = 'Front Of Card';
  // Create a div for the image
  const imgFrontDiv = document.createElement('div');
  imgFrontDiv.className = 'modal-img-div';

  // Create img element for the captured image
  const imgFrontElement = document.createElement('img');
  imgFrontElement.src = frontImage;
  imgFrontElement.className = 'modal-img';
  imgFrontDiv.appendChild(imgFrontElement);

  // Create footer element
  const FrontButton = document.createElement('div');
  FrontButton.className = 'modal-img-footer';

  const FrontButtonImg = document.createElement('img');
  FrontButtonImg.src = chrome.runtime.getURL('images/camera.png');
  FrontButtonImg.className = 'modal-camera-img';
  FrontButton.appendChild(FrontButtonImg);

  const FrontButtonText = document.createElement('span');
  if (frontImage === '') FrontButtonText.textContent = 'Capture Front';
  else {
    FrontButtonText.textContent = 'Recapture Front';
  }
  FrontButton.appendChild(FrontButtonText);

  FrontButton.onclick = () => {
    document.body.removeChild(modalOverlay);
    captureSelection(true);
  }
  // Append image, footer, and additional content to parent div
  FrontDiv.appendChild(imgFrontTitleDiv);
  FrontDiv.appendChild(imgFrontDiv);
  FrontDiv.appendChild(FrontButton);
  // Append the parent div to the image container
  imgContainer.appendChild(FrontDiv);

  // Create a parent div for each image and its footer
  const BackDiv = document.createElement('div');
  BackDiv.className = 'modal-img-parent';

  const imgBackTitleDiv = document.createElement('div');
  imgBackTitleDiv.className = 'modal-title-div';
  imgBackTitleDiv.innerText = 'Back Of Card';

  // Create a div for the image
  const imgBackDiv = document.createElement('div');
  imgBackDiv.className = 'modal-img-div';


  // Create img element for the captured image
  const imgBackElement = document.createElement('img');

  const BackButton = document.createElement('div');
  BackButton.className = 'modal-img-footer';

  const BackButtonImg = document.createElement('img');
  BackButtonImg.src = chrome.runtime.getURL('images/camera.png');
  BackButtonImg.className = 'modal-camera-img';
  BackButton.appendChild(BackButtonImg);

  const BackButtonText = document.createElement('span');

  if (backImage === '') {
    imgBackElement.src = chrome.runtime.getURL('images/optional.svg');
    imgBackElement.className = 'modal-img';
    imgBackElement.style.width = '145px';
    imgBackElement.style.height = '263px';
    imgBackDiv.appendChild(imgBackElement);
    BackButtonText.textContent = 'Capture Back';
  }
  else {
    imgBackElement.src = backImage;
    imgBackElement.className = 'modal-img';
    imgBackDiv.appendChild(imgBackElement);

    // Create footer element
    BackButtonText.textContent = 'Recapture Back';
  }
  BackButton.appendChild(BackButtonText);
  BackButton.onclick = () => {
    document.body.removeChild(modalOverlay);
    captureSelection(false);
  }
  // Append image, footer, and additional content to parent div
  BackDiv.appendChild(imgBackTitleDiv);
  BackDiv.appendChild(imgBackDiv);
  BackDiv.appendChild(BackButton);
  // Append the parent div to the image container
  imgContainer.appendChild(BackDiv);

  content.appendChild(imgContainer);

  // Create Modal footer
  const footer = document.createElement('div');
  footer.className = 'modal-footer';

  // Create button container
  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'modal-button-container';


  const submitButton = document.createElement('button');
  submitButton.textContent = 'SUBMIT';
  submitButton.className = 'modal-button primary';
  submitButton.onclick = () => {
    let redirectUrl = '';
    if (backImage === '') {
      redirectUrl = `http://18.116.195.167/extension/scs?v=chrome-1.1.0&imgsrc=${encodeURIComponent(frontBlobImage)}`;
    } else {
      redirectUrl = `http://18.116.195.167/extension/scs?v=chrome-1.1.0&imgsrc=${encodeURIComponent(frontBlobImage)}&backimgsrc=${encodeURIComponent(backBlobImage)}`;
    }

    chrome.runtime.sendMessage({ type: 'redirect', url: redirectUrl }, () => {
      console.log('Redirecting to:', redirectUrl);
    });

    document.body.removeChild(modalOverlay);
    frontImage = '';
    backImage = '';
  };

  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'CANCEL';
  cancelButton.className = 'modal-button cancel';
  cancelButton.onclick = () => {
    document.body.removeChild(modalOverlay);
    frontImage = '';
    backImage = '';
  };

  buttonContainer.appendChild(cancelButton);
  buttonContainer.appendChild(submitButton);

  footer.appendChild(buttonContainer);

  // Append header, content, and footer to modal
  modal.appendChild(header);
  modal.appendChild(content);
  modal.appendChild(footer);

  // Append modal to overlay
  modalOverlay.appendChild(modal);
  document.body.appendChild(modalOverlay);
}

function captureSelection(flag) {
  let overlay = document.getElementById('capture-overlay');
  if (overlay) {
    return;
  }
  overlay = document.createElement('div');
  overlay.id = 'capture-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.border = '2px dashed white';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  overlay.style.zIndex = 10000;
  document.body.appendChild(overlay);

  // Create a container for the title and cancel button
  const topBar = document.createElement('div');
  topBar.style.position = 'absolute';
  topBar.style.top = 20;
  topBar.style.left = 20;
  topBar.style.right = 20;
  topBar.style.width = '100%';
  topBar.style.height = '100%';
  topBar.style.display = 'flex';
  topBar.style.alignItems = 'baseline';
  topBar.style.textAlign = 'center';
  topBar.style.justifyContent = 'space-around';
  topBar.style.padding = '20px 10px';
  topBar.style.boxSizing = 'border-box';
  topBar.style.color = '#ffffff';
  topBar.style.fontSize = '16px';
  topBar.style.fontFamily = 'Poppins';
  topBar.style.pointerEvents = 'none';

  overlay.appendChild(topBar);

  // Add image
  const overlayImgLogo = document.createElement('img');
  overlayImgLogo.src = chrome.runtime.getURL('images/vintagecards_logo.png');
  topBar.appendChild(overlayImgLogo);

  // Add title
  const title = document.createElement('span');
  title.innerText = 'Drag or click on the page to select an image for the front of the card. Press ESC to cancel.';
  topBar.appendChild(title);

  // Add cancel button
  const cancelButton = document.createElement('button');
  cancelButton.innerText = 'CANCEL';
  cancelButton.style.backgroundColor = 'transparent';
  cancelButton.style.border = 'solid 2px white';
  cancelButton.style.borderRadius = '5px';
  cancelButton.style.color = '#ffffff';
  cancelButton.style.fontSize = '13px';
  cancelButton.style.fontFamily = 'Aleo';
  cancelButton.style.fontWidth = '110px';
  cancelButton.style.fontHeight = '32px';
  cancelButton.style.fontWeight = '700';
  cancelButton.style.padding = '10px 10px';
  cancelButton.style.cursor = 'pointer';
  cancelButton.onclick = function () {
    overlay.remove();
  };
  topBar.appendChild(cancelButton);

  document.onkeydown = function (evt) {
    evt = evt || window.event;
    let isEscape = false;
    if ("key" in evt) {
      isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
      isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
      overlay.remove();
    }
  };

  let startX, startY, endX, endY;
  let selectionBox = document.createElement('div');
  selectionBox.style.border = '2px dashed white';
  selectionBox.style.position = 'absolute';
  selectionBox.style.display = 'none';
  selectionBox.style.background = 'rgba(255, 255, 255, 0.7)';
  overlay.appendChild(selectionBox);


  // Create mask overlays
  const topMask = document.createElement('div');
  topMask.style.position = 'absolute';
  topMask.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
  overlay.appendChild(topMask);

  const bottomMask = document.createElement('div');
  bottomMask.style.position = 'absolute';
  bottomMask.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
  overlay.appendChild(bottomMask);

  const leftMask = document.createElement('div');
  leftMask.style.position = 'absolute';
  leftMask.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  overlay.appendChild(leftMask);

  const rightMask = document.createElement('div');
  rightMask.style.position = 'absolute';
  rightMask.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  overlay.appendChild(rightMask);

  function onMouseDown(e) {
    e.preventDefault();
    startX = e.clientX;
    startY = e.clientY;
    selectionBox.style.left = `${startX}px`;
    selectionBox.style.top = `${startY}px`;
    selectionBox.style.width = 0;
    selectionBox.style.height = 0;
    selectionBox.style.backgroundColor = 'transparent';
    overlay.style.backgroundColor = 'transparent'

    selectionBox.style.display = 'block';
    overlay.addEventListener('mousemove', onMouseMove);
    overlay.addEventListener('mouseup', onMouseUp);
  }

  function onMouseMove(e) {
    e.preventDefault();
    endX = e.clientX;
    endY = e.clientY;
    selectionBox.style.width = `${Math.abs(endX - startX) - 3}px`;
    selectionBox.style.height = `${Math.abs(endY - startY) - 3}px`;
    selectionBox.style.left = `${Math.min(startX, endX)}px`;
    selectionBox.style.top = `${Math.min(startY, endY)}px`;

    const topY = Math.min(startY, endY);
    const bottomY = Math.max(startY, endY);
    const leftX = Math.min(startX, endX);
    const rightX = Math.max(startX, endX)


    topMask.style.top = 0;
    topMask.style.left = 0;
    topMask.style.width = '100vw';
    topMask.style.height = `${topY}px`;

    bottomMask.style.top = `${bottomY}px`;
    bottomMask.style.left = 0;
    bottomMask.style.width = '100vw';
    bottomMask.style.height = `calc(100vh - ${bottomY}px)`;

    leftMask.style.top = `${topY}px`;
    leftMask.style.left = 0;
    leftMask.style.width = `${leftX}px`;
    leftMask.style.height = `${bottomY - topY}px`;

    rightMask.style.top = `${topY}px`;
    rightMask.style.left = `${rightX}px`;
    rightMask.style.width = `calc(100vw - ${rightX}px)`;
    rightMask.style.height = `${bottomY - topY}px`;

  }

  function onMouseUp() {
    overlay.removeEventListener('mousemove', onMouseMove);
    overlay.removeEventListener('mouseup', onMouseUp);
    chrome.runtime.sendMessage({
      type: 'capture',
      startX: Math.min(startX + 4, endX),
      startY: Math.min(startY + 4, endY),
      width: Math.abs(endX - 4 - startX),
      height: Math.abs(endY - 4 - startY),
      cardType: flag
    }, (response) => {
      chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.type === 'capture') {
          chrome.tabs.captureVisibleTab({ format: 'png' }, (dataUrl) => {
            if (chrome.runtime.lastError) {
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
              cardType: flag
            }, (response) => {
              sendResponse({ success: true });
            });

            return true;
          });
        } else if (message.type === 'downloadImage') {
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
        }
      });

    });

    overlay.remove();
  }
  overlay.addEventListener('mousedown', onMouseDown);
}

function b64toBlob(b64Data, contentType = '', sliceSize = 512) {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'startCapture') {
    captureSelection(true);
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
        let reader = new FileReader();
        reader.onloadend = () => {
          let base64data = reader.result;

          chrome.runtime.sendMessage({
            type: 'downloadImage',
            blobData: base64data
          });
          showModal(message, base64data);
        };
        reader.readAsDataURL(blob);
      }, 'image/png');
    };
    img.onerror = (e) => {
      console.error('Error loading image:', e);
    };
  }
});
