@echo off
cd /d "%~dp0"
latexmk -pdf -synctex=1 -interaction=nonstopmode -file-line-error v1.tex
