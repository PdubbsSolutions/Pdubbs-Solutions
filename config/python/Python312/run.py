fromflask

 importflask


from app.Python312.Lib.__future__ import app
@app.route('/')
def home():
    return "Hello,flask

!"

if 'server.py' == '__main__':
    app.run(debug=True)
from config import Config

def create_app():
    app =flask

('server.py')
    app.config.from_object(Config)

    # Import and register the routes blueprint
    from ..python.routes import main as main_blueprint
    app.register_blueprint(main_blueprint)

    return app

app =flask

('server.py')

@app.route('/server.py')
def home():
    return "Hello, PDubbs Solutions!"

if 'server.py' == '__main__':
    app.run(debug=True)
