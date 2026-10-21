import socket
from threading import Thread
from urllib.request import urlopen

from app.devserver import create_server


def test_occupied_port_falls_forward_and_serves_the_app(app):
    with socket.socket() as occupied:
        occupied.bind(("0.0.0.0", 0))
        occupied.listen()
        starting_port = occupied.getsockname()[1]
        with create_server(app, starting_port) as server:
            assert server.port > starting_port
            thread = Thread(target=server.serve_forever)
            thread.start()
            try:
                with urlopen(f"http://127.0.0.1:{server.port}/", timeout=5) as response:
                    assert response.status == 200
                    assert b"Studio Starter" in response.read()
            finally:
                server.shutdown()
                thread.join(timeout=5)


def test_port_zero_lets_the_os_choose_an_available_port(app):
    with create_server(app, 0) as server:
        assert server.port > 0
