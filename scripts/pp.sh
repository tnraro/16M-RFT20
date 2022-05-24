#!/bin/bash

for i in ./tmp/*.png; do
  filename=$(basename "$i")
  filename=${filename#CharProfile_}
  filename=${filename%.png}
  vips webpsave $i ./public/$filename.webp --strip --preset drawing
done