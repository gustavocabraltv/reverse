async function copyToClipboard() {
    try {
      const response = await fetch('card.base64.txt');
      const base64 = await response.text();
  
      const htmlContent = `<!--(figma)${base64}(/figma)-->`;
  
      const hiddenDiv = document.getElementById('hidden-copy');
      hiddenDiv.innerHTML = htmlContent;
  
      const range = document.createRange();
      range.selectNode(hiddenDiv);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
  
      const success = document.execCommand('copy');
  
      if (success) {
        alert('Copiado! Agora vá ao Figma Desktop e cole com ⌘+V');
      } else {
        alert('Falha ao copiar.');
      }
  
      // Limpa seleção
      selection.removeAllRanges();
    } catch (err) {
      alert('Erro ao copiar: ' + err.message);
    }
  }
  