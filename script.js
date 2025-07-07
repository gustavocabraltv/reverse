





      async function copyToClipboard() {
        try {
          const response = await fetch('card.base64.txt');
          const base64 = await response.text();
      
          const hiddenDiv = document.getElementById('hidden-copy');
          hiddenDiv.innerHTML = ''; // Limpa antes
      
          // Cria o span com o conteúdo que o Figma entende
          const span = document.createElement('span');
          span.setAttribute('data-buffer', `<!--(figma)${base64}(/figma)-->`);
          span.setAttribute('contenteditable', 'true');
          span.setAttribute('style', 'white-space: pre');
          span.textContent = 'Copied Component';
      
          hiddenDiv.appendChild(span);
      
          // Seleciona exatamente o span
          const range = document.createRange();
          range.selectNode(span);
          const selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
      
          // Executa o comando de cópia
          const success = document.execCommand('copy');
      
          selection.removeAllRanges();
      
          if (success) {
            alert('✅ Copiado! Agora cole no Figma com ⌘+V');
            console.log(`
                <!--(figma)${base64}(/figma)-->
                `);
                
          } else {
            alert('❌ Falha ao copiar.');
          }
        } catch (err) {
          alert('Erro: ' + err.message);
        }
      }
      