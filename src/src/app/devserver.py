"""Development server that falls forward to an available port."""
import errno
import os
import socket
import webbrowser

from flask import Flask
from werkzeug.serving import BaseWSGIServer, make_server

from . import create_app


def create_server(app: Flask, port: int) -> BaseWSGIServer:
    if not 0 <= port <= 65535:
        raise ValueError("PORT must be between 0 and 65535.")
    for candidate in range(port, 65536):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as listener:
            listener.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            try:
                listener.bind(("0.0.0.0", candidate))
            except OSError as error:
                if error.errno != errno.EADDRINUSE or candidate == 65535:
                    raise
                app.logger.warning("Port %s is in use; trying %s.", candidate, candidate + 1)
                continue
            listener.listen(socket.SOMAXCONN)
            return make_server("0.0.0.0", candidate, app, threaded=True, fd=listener.fileno())
    raise RuntimeError("No available development port.")


def main() -> None:
    app = create_app()
    with create_server(app, int(os.environ.get("PORT", "5000"))) as server:
        app.logger.info("Development server: http://localhost:%s (Ctrl+C to stop)", server.port)
        if os.environ.get("CODESPACES") == "true":
            # In Codespaces, $BROWSER opens the forwarded port URL.
            webbrowser.open(f"http://localhost:{server.port}")
        server.serve_forever()


if __name__ == "__main__":
    main()
