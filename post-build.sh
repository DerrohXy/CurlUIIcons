#!/bin/bash

# # Copy package.json files
icons=(
  bi bs cg ci di fa fa6 fc fi gi go gr hi hi2 im io5
  lia lu md pi ri rx si sl tb tfi ti vsc wi
)

# No longer copy per-folder package.json files; root exports control subpaths

# cp "src/icons/package.json" "dist/icons"