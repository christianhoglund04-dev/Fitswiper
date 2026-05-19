# FitSwiper

En iPhone-first prototyp för att swipa på outfits utan dejtingkoppling.

## Öppna

Öppna `index.html` direkt i en webbläsare, eller kör en lokal server:

```powershell
node tools/serve-static.mjs 4173
```

Appen finns då på `http://127.0.0.1:4173`.

## Finns i prototypen

- Swipe-kort med Hissa/Dissa.
- Gillade outfits sparas i en egen vy.
- Filter för budget, street, kväll och vardag.
- Enkel "Style DNA" som uppdateras från hissade outfits.
- Köplista för specifika plagg som användaren aktivt lägger till från outfitens detaljpanel.
- Detaljpanel öppnas genom att trycka på outfitbilden.
- Plagginfo med separat pris och valfri extern länk per plagg.
- Lägg upp-vy där en ny outfit kräver bild, kategori och kan skickas in med flera separata plagg.
- Gästläge för att swipa utan konto, med inloggningsspärr för Profil och Lägg upp.
- Prototyp-login via Apple eller Google.
- Profilflik med sparade outfits, egna looks, total köplista och redigering av namn/stad/profilbild.
- Lokala illustrerade outfit-assets utan testbilder.
- FitSwiper-logga och appikoner från `assets/fitswiper-logo.png`.
- Gottlr-inspirerad visuell stil med mjukt outfit-collage, cream overlay, stark FitSwiper-gradient och glassiga iOS-paneler.
- Mer polerad app-UI med konsekventa navikoner, renare outfitkort, kategori-chips och profilgrid.
- Extra polish med SVG-ikoner för swipe-actions, nav-badges och mer visuella empty states.
- PWA-metadata för iPhone-startskärm.
- iPhone-optimering med safe areas, portrait-läge, stabil viewport, momentum-scroll och inputs som inte triggar Safari-zoom.

## Inspiration

GottLr verkar vara en svensk swipe-app för mat och recept. Prototypen lånar därför produktmönstret, inte varumärket: snabba kort, preferensfilter, sparade val och en praktisk lista som följer av det man gillar.
