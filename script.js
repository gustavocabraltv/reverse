async function copyToFigma() {
  try {
    // 1. Carrega o JSON do componente
    const res = await fetch('card.json');
    const json = await res.json();

    // 2. Serializa e converte para UTF-8 + base64
    const jsonStr = JSON.stringify(json);
    const utf8Str = unescape(encodeURIComponent(jsonStr));
    const base64 = btoa(utf8Str);

    // 3. Monta o payload do Figma
    const figmaPayload = `<!--(figma)${base64}(/figma)-->`;

    // 4. Insere no DOM invisível
    const el = document.getElementById('hidden-copy');
    el.textContent = figmaPayload;

    // 5. Seleciona o conteúdo
    const range = document.createRange();
    range.selectNodeContents(el);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    // 6. Executa cópia
    const success = document.execCommand('copy');
    alert(success ? "✅ Copiado! Cole no Figma com ⌘+V" : "❌ Falha ao copiar");
  } catch (err) {
    alert("❌ Erro: " + err.message);
  }
}
