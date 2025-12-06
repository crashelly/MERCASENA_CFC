@echo off
set TIMESTAMP=%DATE:~6,4%%DATE:~3,2%%DATE:~0,2%_%TIME:~0,2%%TIME:~3,2%%TIME:~6,2%
set BACKUP_DIR=C:\scripts
set MYSQL_USER=root
set MYSQL_PASSWORD=''
set MYSQL_DATABASE=senagym

cd C:\xampp\mysql\bin

mysqldump -u %MYSQL_USER% -p %MYSQL_PASSWORD% %MYSQL_DATABASE% > %BACKUP_DIR%\backup_%TIMESTAMP%.sql
