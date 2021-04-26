Command

start nginx
tasklist /fi "imagename eq nginx.exe"

nginx -s stop	fast shutdown
nginx -s quit	graceful shutdown
nginx -s reload	changing configuration, starting new worker processes with a new configuration, graceful shutdown of old worker processes
nginx -s reopen	re-opening log files


https://www.stackextend.com/angular/deploy-angular-app-using-nginx/