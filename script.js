document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('copy-btn').addEventListener('click', async () => {
    try {
      // Carrega o base64 do componente (figma payload)
      const base64Res = await fetch('card.txt');
      const figmaPayload = (await base64Res.text()).trim();

      // Cria um figmeta mínimo (pode ser aprimorado com base real)
      const figmetaObj = {
        fileKey: "FAKEFILEKEY1234567890",
        pasteID: Date.now(),
        dataType: "scene"
      };

      const figmetaEncoded = btoa(unescape(encodeURIComponent(JSON.stringify(figmetaObj))));

      // Monta o HTML como o Figma espera
      const fullHtml = `
<html><head><meta http-equiv="content-type" content="text/html; charset=utf-8"></head><body><html><body>
<!--StartFragment-->
<meta charset="utf-8">
<span data-metadata="<!--(figmeta)${figmetaEncoded}(/figmeta)-->"></span>
<span data-buffer="<!--(figma)${figmaPayload}(/figma)-->"></span>
<span style="white-space:pre-wrap;">Copied from My Site</span>
<!--EndFragment-->
</body></html></body></html>
      `.trim();

      // Copia como text/html
      const blob = new Blob([fullHtml], { type: 'text/html' });
      const clipboardItem = new ClipboardItem({ 'text/html': blob });

      await navigator.clipboard.write([clipboardItem]);
      alert("✅ Copiado! Agora cole no Figma Desktop com ⌘+V");

    } catch (err) {
      alert("❌ Erro ao copiar: " + err.message);
      console.error(err);
    }
  });
});
