@echo off
setlocal enabledelayedexpansion

REM Move the contents of "root/Monopoly/dist" to "root/dist" and rename "dist" to "docs"
@REM move "Monopoly\dist" "dist"
@REM rename "dist" "docs"

REM Move JS and CSS files to the "docs" folder
move "docs\assets\*.js" "docs"
move "docs\assets\*.css" "docs"

REM Replace paths in index.html
set "file=docs\index.html"
set "find1=<script type=\"module\" crossorigin src=\"/Monopoly/assets/"
set "replace1=<script type=\"module\" crossorigin src=\"./"
set "find2=<link rel=\"stylesheet\" href=\"/Monopoly/assets/"
set "replace2=<link rel=\"stylesheet\" href=\"./"
set "tempfile=%temp%\tempfile.html"

(
  for /f "usebackq delims=" %%a in ("!file!") do (
    set "line=%%a"
    set "line=!line:%find1%=%replace1%!"
    set "line=!line:%find2%=%replace2%!"
    echo !line!
  )
) > "!tempfile!"

move "!tempfile!" "!file!" /y

REM Move JS and CSS files to the "docs" folder
move "docs\assets\*.js" "docs"
move "docs\assets\*.css" "docs"

REM Replace paths in CSS files
for %%f in (docs\*.css) do (
  set "file=%%f"
  set "find=/("
  set "replace=./"
  (
    for /f "usebackq delims=" %%a in ("!file!") do (
      set "line=%%a"
      set "line=!line:%find%=%replace%!"
      echo !line!
    )
  ) > "!tempfile!"
  move "!tempfile!" "!file!" /y
)

REM Replace paths in JS files
for %%f in (docs\*.js) do (
  set "file=%%f"
  set "find=/assets/"
  set "replace=https://coder-1t45.github.io/Monopoly/assets/"
  (
    for /f "usebackq delims=" %%a in ("!file!") do (
      set "line=%%a"
      set "line=!line:%find%=%replace%!"
      echo !line!
    )
  ) > "!tempfile!"
  move "!tempfile!" "!file!" /y
)

echo DONE
