import http.server, socketserver, webbrowser, os

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler): def __init__(self, *args, **kwargs): super().__init__(*args, directory=DIRECTORY, **kwargs)
def run_server():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"--- Local Development Server ---")
        print(f"Serving at: http://localhost:{PORT}")
        print(f"Project root: {DIRECTORY}")
        print(f"Press Ctrl+C to stop the server")
        webbrowser.open(f"http://localhost:{PORT}/index.html")
        try: httpd.serve_forever()
        except KeyboardInterrupt: print("\nServer stopped.")

if __name__ == "__main__": run_server()
