#!/bin/bash

# # Copy package.json files
icons=(
  bi bs cg ci di fa fa6 fc fi gi go gr hi hi2 im io5
  lia lu md pi ri rx si sl tb tfi ti vsc wi
)

for icon in "${icons[@]}"; do
  cp "src/$icon/package.json" "dist/$icon"
done

# cp "src/icons/package.json" "dist/icons"