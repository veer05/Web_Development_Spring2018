server {
        listen 80;
        listen [::]:80;

        root /home/veer/www/hw01;

        index hw01.html;

        server_name hw01.veerm.com;

        location / {
                # First attempt to serve request as file, then
                # as directory, then fall back to displaying a 404.
                try_files $uri $uri/ =404;
        }
}
