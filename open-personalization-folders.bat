@echo off
echo Opening folders for your photos and music...
start "" "%~dp0public\images"
start "" "%~dp0public\videos"
echo.
echo PHOTOS: Copy photos into public\images\
echo VIDEOS: Copy videos into public\videos\
echo SPOTIFY: Paste your playlist link in content\personal.ts
echo LETTER: Edit content\personal.ts to customize your love letter.
echo.
pause
