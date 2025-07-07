

    async function copyToClipboard() {
        try {
          const response = await fetch('card.base64.txt');
          const base64 = await response.text();
      
          // HTML com o span que o Figma reconhece
          const htmlContent = `
            <span 
              data-buffer="<!--(figma)${base64}(/figma)-->" 
              contenteditable="true" 
              style="white-space: pre"
            >
              Copied Component
            </span>
          `;
      
          const hiddenDiv = document.getElementById('hidden-copy');
          hiddenDiv.innerHTML = htmlContent;
      
          // Seleciona o conteúdo da div
          const range = document.createRange();
          range.selectNode(hiddenDiv);
          const selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
      
          // Copia para a área de transferência
          const success = document.execCommand('copy');
      
          if (success) {
            
            alert('Copiado! Agora vá ao Figma Desktop e cole com ⌘+V');
            console.log(`
                <!--(figma)${base64}(/figma)-->
                `);

                
          } else {
            alert('Falha ao copiar.');
          }
      
          // Limpa a seleção
          selection.removeAllRanges();
        } catch (err) {
          alert('Erro ao copiar: ' + err.message);
        }
      }
      