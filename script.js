document.getElementById('copy-btn').addEventListener('click', async () => {
    
  try {
    const response = await fetch('card.base64.txt');
    const base64Payload = await response.text();

    const html = `
      <span 
        data-buffer="<!--(figma)${base64Payload}(/figma)-->" 
        contenteditable="true" 
        style="white-space:pre"
      >
        Figma Component
      </span>
    `;

    const blob = new Blob([html], { type: 'text/html' });
    const clipboardItem = new ClipboardItem({ 'text/html': blob });

    await navigator.clipboard.write([clipboardItem]);
    alert("Copiado! Agora cole no Figma com ⌘+V");
    console.log(`
        <!--(figma)${base64Payload}(/figma)-->
        `);
  } catch (err) {
    alert("Erro ao copiar: " + err);
  }
});


function copyToFigma() {
    const html = `
      <span 
        data-buffer="<!--(figma)eyJ2ZXJzaW9uIjoiMS4wIiwiZGVzY3JpcHRpb24iOiJFeGFtcGxlIFJlY3RhbmdsZSIsImNvbXBvbmVudHMiOlt7ImlkIjoiMDEiLCJ0eXBlIjoiUmVjdGFuZ2xlIiwibmFtZSI6IlJlY3QiLCJ3aWR0aCI6MTAwLCJoZWlnaHQiOjUwLCJmaWxsIjp7InR5cGUiOiJTb2xpZCIsImNvbG9yIjoiI2ZmMDAwMCJ9fV19(/figma)-->" 
        contenteditable="true" 
        style="white-space:pre"
      >Figma Component</span>
    `;
  
    const blob = new Blob([html], { type: 'text/html' });
    const item = new ClipboardItem({ 'text/html': blob });
  
    navigator.clipboard.write([item])
      .then(() => alert("Copiado!"))
      .catch(err => alert("Erro ao copiar: " + err));
  }
  