# Oro Travel Motion Studio

Repositorio de producción para reels turísticos verticales con Remotion.

## Discover Nicaragua

- Formato: 1080 × 1920, 30 fps, 30 segundos.
- Escenas: Granada, Ometepe, Corn Islands y San Juan del Sur.
- Animación de cámara, transiciones slide/fade, textos y cierre Oro Travel.
- Fotografías: el workflow descarga fotografías de Wikimedia Commons y guarda su atribución en `public/images/ATTRIBUTION.json`. Verificá que la selección represente cada destino antes de publicar.

## Render automático

Abrí [Actions](https://github.com/victorale78-dev/oro-travel-motion-studio/actions), elegí **Render Discover Nicaragua MP4**, presioná **Run workflow** y descargá el MP4 desde **Artifacts** cuando termine exitosamente.

El workflow también corre al actualizar código y recursos. Requiere que GitHub Actions esté habilitado y que las fotografías se puedan descargar.

## Local

```bash
npm install
npm start
npm run render
```

## Estado real

El workflow y el código están publicados, pero **no hay un render exitoso de GitHub Actions confirmado**. La versión de Remotion todavía **no** tiene audio ElevenLabs ni subtítulos sincronizados palabra por palabra; esas funciones necesitan una pista de narración. No hay credenciales ElevenLabs configuradas.

El MP4 de muestra con transiciones, textos y música instrumental se produjo por separado en ChatGPT. No se ha incorporado como archivo binario al repositorio.

## Privacidad

Actualmente el repositorio es **público**. No subás claves API ni contenido confidencial. Para cambiarlo: Settings → General → Danger Zone → Change repository visibility.
