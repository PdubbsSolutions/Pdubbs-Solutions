from __future__ import annotations

import logging
import sys
import typing as t
from flask import Flask  # Correct import for Flask, not "flask"

from werkzeug.local import LocalProxy

from .globals import request

if t.TYPE_CHECKING:  # pragma: no cover
    from .sansio.app import App

# Define the wsgi_errors_stream function using LocalProxy
wsgi_errors_stream = LocalProxy(lambda: request.environ["wsgi.errors"] if request else sys.stderr)

def has_level_handler(logger: logging.Logger) -> bool:
    """Check if there is a handler in the logging chain that will handle the
    given logger's effective level.
    """
    level = logger.getEffectiveLevel()
    current = logger

    while current:
        if any(handler.level <= level for handler in current.handlers):
            return True
        if not current.propagate:
            break
        current = current.parent  # type: ignore
    return False

# Initialize the Flask application
app = Flask(__name__)  # Correct initialization of Flask app

# Configure logger
logger = logging.getLogger('wsgi_errors_logger')
logger.setLevel(logging.DEBUG)

# Stream to WSGI error stream or sys.stderr
wsgi_handler = logging.StreamHandler(stream=sys.stderr)  # Or use `wsgi_errors_stream`
wsgi_handler.setLevel(logging.DEBUG)

# Define log format
formatter = logging.Formatter(
    '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
wsgi_handler.setFormatter(formatter)
logger.addHandler(wsgi_handler)

# Define a simple route
@app.route('/')
def hello():
    logger.debug('Debug message for WSGI error log')
    return 'Hello, World!'

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
