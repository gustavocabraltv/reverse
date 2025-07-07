async function copyToClipboard() {
    try {
      const response = await fetch('card.base64.txt');
      const base64 = await response.text();
  
      const figmaPayload = `<!--(figma)${base64}(/figma)-->`;
  
      const html = `
        <span 
          data-buffer="${figmaPayload}" 
          contenteditable="true" 
          style="white-space: pre"
        >
          Copied Component
        </span>
      `;
  
      const plainBlob = new Blob([figmaPayload], { type: 'text/plain' });
      const htmlBlob = new Blob([html], { type: 'text/html' });
  
      const clipboardItem = new ClipboardItem({
        'text/plain': plainBlob,
        'text/html': htmlBlob
      });
  
      await navigator.clipboard.write([clipboardItem]);
  
      alert("✅ Copiado! Agora cole no Figma com ⌘+V");
    } catch (err) {
      alert("❌ Erro ao copiar: " + err.message);
    }
  }
  