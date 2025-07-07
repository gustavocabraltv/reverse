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
