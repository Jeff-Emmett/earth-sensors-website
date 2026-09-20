# Static site. Nothing to build — nginx serves site/ directly.
#
# The UNPRIVILEGED image, deliberately: it already runs as uid 101 and listens on
# 8080, so it never tries the startup chown that CAP_CHOWN is dropped for. The
# stock nginx image cannot start under `read_only` + `cap_drop: ALL`.
FROM nginxinc/nginx-unprivileged:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY site/ /usr/share/nginx/html/

EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:8080/ || exit 1
