document.getElementById('copy-btn').addEventListener('click', async () => {
  try {
    const response = await fetch('card.txt');
    const inner = await response.text();

    const html = `<html><body>${inner}</body></html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const clipboardItem = new ClipboardItem({ 'text/html': blob });

    await navigator.clipboard.write([clipboardItem]);

    alert("✅ Copiado! Agora cole no Figma Desktop com ⌘+V");
  } catch (e) {
    alert("❌ Erro ao copiar: " + e.message);
  }
});
