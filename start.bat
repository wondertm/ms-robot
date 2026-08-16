@echo off
echo Installing/updating bot dependencies
call npm ci --only=production --loglevel=warn >NUL

if NOT ["%errorlevel%"]==["0"] (
goto start
  pause
  exit /b %errorlevel%
)
:start
echo Starting the bot
call npm run start

if NOT ["%errorlevel%"]==["0"] (
goto start
  pause
  exit /b %errorlevel%
)
goto start