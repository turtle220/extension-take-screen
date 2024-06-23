let capturedImages = []; // Array to store captured image URLs
let frontImages = []; // Array to store front image URLs
let backImages = [];  // Array to store back image URLs


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
      width: 90%;
      text-align: center;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      // height: 400px;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 70px;
      background: #0d99ff;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }

    .modal-close-button {
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
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
      justify-content: space-evenly;
      align-items: center;
      width: 100%;
      max-width: 100%;
      max-height: 100%;
      padding: 0px;
      flex-wrap: wrap; /* Allows images to wrap to the next line if needed */
    }
    .modal-img-parent {
      margin: 10px;
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
      font-size: 16px;
      transition: background-color 0.3s ease;
      flex: 1;
      width: 250px;
      margin: 10px;
    }

    .modal-button.primary {
      background-color: #0d99ff;
      color: #fff;
    }

    // .modal-button.primary:hover {
    //   background-color: #0056b3;
    // }

    .modal-button.cancel {
      background-color: white;
      color: #0d99ff;
      border-color: #0d99ff;
      border: solid 1px;
    }

    // .modal-button.cancel:hover {
    //   background-color: #5a6268;
    // }
    .modal-button-container {
      width: 100%;
      padding: 10px;
      justify-content: space-between;
      display: flex;
    }
    .modal-img-div {
      width: 250px;
      height: 250px;
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
      color: #0d99ff;
      font-size: 16px; 
      cursor: pointer; 
    }
  `;
  document.head.appendChild(style);
}

function showModal(imageUrl) {
  addModalStyles();

  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay';

  const modal = document.createElement('div');
  modal.className = 'modal';

  // Create header
  const header = document.createElement('div');
  header.className = 'modal-header';
  const title = document.createElement('h2');
  title.innerText = 'Captured Images';
  title.style = 'margin: 10px';
  header.appendChild(title);

  const closeButton = document.createElement('button');
  closeButton.innerText = 'X';
  closeButton.className = 'modal-close-button';
  closeButton.onclick = () => document.body.removeChild(modalOverlay);
  header.appendChild(closeButton);

  // Create content
  const content = document.createElement('div');
  content.className = 'modal-content';

  // Create a container for images
  const imgContainer = document.createElement('div');
  imgContainer.className = 'modal-img-container';

  // Push captured image URL to the array
  capturedImages.push(imageUrl);

  // Show all captured images in the modal
  capturedImages.forEach(url => {
    // Create a parent div for each image and its footer
    const imgParentDiv = document.createElement('div');
    imgParentDiv.className = 'modal-img-parent';

    // Create a div for the image
    const imgDiv = document.createElement('div');
    imgDiv.className = 'modal-img-div';

    // Create img element for the captured image
    const imgElement = document.createElement('img');
    imgElement.src = url;
    imgElement.className = 'modal-img';
    imgDiv.appendChild(imgElement);

    // Create footer element
    const footerFront = document.createElement('div');
    footerFront.className = 'modal-img-footer';
    footerFront.textContent = 'Recapture Front';
    footerFront.onclick = () => recaptureFront(imgElement); // Update image on recapture
  
    // Append image, footer, and additional content to parent div
    imgParentDiv.appendChild(imgDiv);
    imgParentDiv.appendChild(footerFront);

    // Append the parent div to the image container
    imgContainer.appendChild(imgParentDiv);
  });

  const emptyDivWrapper = document.createElement('div');
  emptyDivWrapper.className = 'empty-div-wrapper';
  
  const emptyDiv = document.createElement('div');
  emptyDiv.className = 'empty-div';
  emptyDiv.innerText = 'Optional';
  
  const footerBack = document.createElement('div');
  footerBack.className = 'modal-img-footer';
  footerBack.textContent = 'Capture Back';
  footerBack.onclick = () => captureBack(emptyDiv, 'captureBack');

  emptyDivWrapper.appendChild(emptyDiv);
  emptyDivWrapper.appendChild(footerBack);

  imgContainer.appendChild(emptyDivWrapper);
  content.appendChild(imgContainer);

  // Create footer
  const footer = document.createElement('div');
  footer.className = 'modal-footer';

  // Create button container
  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'modal-button-container';

  const submitButton = document.createElement('button');
  submitButton.textContent = 'SUBMIT';
  submitButton.className = 'modal-button primary';
  submitButton.onclick = () => {
    console.log('Submit clicked');
    document.body.removeChild(modalOverlay);
    capturedImages = []; // Reset captured images array
  };

  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'CANCEL';
  cancelButton.className = 'modal-button cancel';
  cancelButton.onclick = () => {
    console.log('Cancel clicked');
    document.body.removeChild(modalOverlay);
    capturedImages = []; // Reset captured images array
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

function captureBack(emptyDiv, footerBack) {
  document.body.removeChild(document.querySelector('.modal-overlay')); // Close the current modal
  backImages = [];
  captureSelection(); // Trigger capture selection again

  chrome.runtime.sendMessage({
    type: 'captureBack',
  }, (response) => {
    if (response.success) {
      backImages.push(response.dataUrl); // Add captured back image to backImages array
      emptyDiv.style.backgroundImage = `url(${response.dataUrl})`; // Update empty-div with the captured image
      emptyDiv.innerText = ''; // Remove the "Optional" text
      emptyDiv.style.backgroundSize = 'cover'; // Adjust the background size
      emptyDiv.style.backgroundPosition = 'center'; // Adjust the background position
      footerBack.textContent = 'Recapture Back'; // Change button text to Recapture Back
      footerBack.onclick = () => recaptureBack(emptyDiv, footerBack); // Update onclick to recaptureBack
    } else {
      console.error('Failed to capture back');
    }
  });
}

function recaptureBack(emptyDiv, footerBack) {
  document.body.removeChild(document.querySelector('.modal-overlay')); // Close the current modal

  captureSelection(); // Trigger capture selection again

  chrome.runtime.sendMessage({
    type: 'recaptureBack',
  }, (response) => {
    if (response.success) {
      backImages = [response.dataUrl];
      emptyDiv.style.backgroundImage = `url(${response.dataUrl})`; // Update empty-div with the recaptured image
      emptyDiv.innerText = '';
      emptyDiv.style.backgroundSize = 'cover';
      emptyDiv.style.backgroundPosition = 'center';
      footerBack.textContent = 'Recapture Back';
      footerBack.onclick = () => recaptureBack(emptyDiv, footerBack, 'recaptureBack');
    } else {
      console.error('Failed to recapture back');
    }
  });
}

function recaptureFront(imgElement) {
  captureSelection(); // Trigger capture selection again
  capturedImages = [];
  // Close existing modal if open
  const modalOverlay = document.querySelector('.modal-overlay');
  if (modalOverlay) {
    document.body.removeChild(modalOverlay);
  }

  // Update image in modal-img-div after recapture
  chrome.runtime.sendMessage({
    type: 'recaptureFront',
  }, (response) => {
    if (response.success) {
      imgElement.src = response.dataUrl; // Update image source
    } else {
      console.error('Failed to recapture front');
    }
  });
}

function captureSelection() {
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
  topBar.style.height = '150px';
  topBar.style.display = 'flex';
  topBar.style.alignItems = 'center';
  topBar.style.textAlign = 'center';
  topBar.style.justifyContent = 'space-around';
  topBar.style.padding = '20px 10px';
  topBar.style.boxSizing = 'border-box';
  topBar.style.color = '#ffffff';
  topBar.style.fontSize = '18px';
  overlay.appendChild(topBar);

  // Add title
  const title = document.createElement('span');
  title.innerText = 'Drag or click on the page to select an image for the front of the card. Press ESC to cancel.';
  topBar.appendChild(title);

  // Add cancel button
  const cancelButton = document.createElement('button');
  cancelButton.innerText = 'Cancel';
  cancelButton.style.backgroundColor = 'transparent';
  cancelButton.style.border = 'solid 2px white';
  cancelButton.style.borderRadius = '5px';
  cancelButton.style.color = '#ffffff';
  cancelButton.style.fontSize = '18px';
  cancelButton.style.padding = '10px 10px';
  cancelButton.style.cursor = 'pointer';
  cancelButton.onclick = function () {
    overlay.remove();
  };
  topBar.appendChild(cancelButton);
  
  document.onkeydown = function(evt) {
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

      chrome.runtime.sendMessage({
        type: 'capture',
        startX: Math.min(startX, endX),
        startY: Math.min(startY, endY),
        width: Math.abs(endX - startX),
        height: Math.abs(endY - startY)
      }, (response) => {
        if (response.success) {
          showModal(response.dataUrl);
        } else {
          console.error('Failed to capture tab');
        }
      });

      overlay.remove();
      document.removeEventListener('keydown', onKeyDown);
    // }
    // overlay.appendChild(saveButton);
  }

  overlay.addEventListener('mousedown', onMouseDown);
}

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
        let reader = new FileReader();
        reader.onloadend = () => {
          let base64data = reader.result;
          chrome.runtime.sendMessage({
            type: 'downloadImage',
            blobData: base64data
          });
          showModal(base64data);
        };
        reader.readAsDataURL(blob);
      }, 'image/png');
    };
    img.onerror = (e) => {
      console.error('Error loading image:', e);
    };
  }
});
