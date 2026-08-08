@echo off
for %%f in (*.png) do (
    cwebp -q 90 -m 6 "%%f" -o "%%~nf.webp"
)
pause