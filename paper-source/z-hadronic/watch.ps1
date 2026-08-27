$ErrorActionPreference = "Stop"
Set-Location -LiteralPath $PSScriptRoot
latexmk -pdf -pvc -synctex=1 -interaction=nonstopmode -file-line-error v1.tex
