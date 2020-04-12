from app import app
from flaskext.mysql import MySQL

mysql = MySQL()

# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'fceda'
app.config['MYSQL_DATABASE_PASSWORD'] = 'fceda'
app.config['MYSQL_DATABASE_DB'] = 'FCEDA_CRAWLER'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)