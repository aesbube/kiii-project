#!/bin/sh

mkdir -p /usr/share/nginx/html/assets

cat <<EOF > /usr/share/nginx/html/assets/runtime-env.js
window.env = {
  API_URL: '${API_URL}'
};
EOF

echo "Environment variables set in runtime-env.js"
exec nginx -g "daemon off;"
