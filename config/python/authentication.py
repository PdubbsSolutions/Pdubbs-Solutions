from http.client import HTTPResponse
fromflask

 importflask

, app, request
fromflask

.templating import _render
fromflask

_login import LoginManager, UserMixin, current_user, login_user, login_required, login_user, logout_user # type: ignore
app =flask

(__name__)
app.secret_key = 'pdubbssoultions'

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

class User(UserMixin):
    def __init__(self,id):
        self.id = id
def load_user(user_id):
    return User(user_id)

@app.route('/login')
def login():
    user = User(1)
    login_user(user)
    return "Login Successful"
def protected():
    return f"Hello, {current_user.id}! This is a protected route." 
@app.route('/logout') 
@login_required
def logout():
    logout_user()
    return "Successfully Logged Out"
if __name__ =='__main__':
    app.run(debug=True)

from django.contrib.auth import authenticate, login # type: ignore
def login_view(request):
    username = request.POST['username']
    password = request.POST['password']
def login_view(request):
    user = authenticate(username='username', password='password')  # Example of user authentication
    if user is not None:
        login(request, user)
        return HTTPResponse("Logged in!")
    else:
        return HTTPResponse("Invalid credentials")
@app.errorhandler(404)
def page_not_found(e):
    return "404 Error - Page Not Found", 404

def custom_404_view(request,exception):
    return _render(request, '404.html', {} , status=404)
