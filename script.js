window.copyToFigma = async function () {
  try {
    const res = await fetch('card.json');
    const json = await res.json();

    const jsonStr = JSON.stringify(json);
    const utf8Str = unescape(encodeURIComponent(jsonStr));
    const base64 = btoa(utf8Str);

    const figmaPayload = `<!--(figma)${base64}(/figma)-->`;

    const el = document.getElementById('hidden-copy');
    el.textContent = figmaPayload;

    const range = document.createRange();
    range.selectNodeContents(el);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    const success = document.execCommand('copy');
    alert(success ? "✅ Copiado! Cole no Figma com ⌘+V" : "❌ Falha ao copiar");
  } catch (err) {
    alert("❌ Erro: " + err.message);
  }
}
