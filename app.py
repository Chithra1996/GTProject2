from pymongo import MongoClient
import os
import sys
import subprocess
from flask import Flask,jsonify, render_template

try:
  import pandas as pd
  from flask_cors import CORS
  import sqlalchemy
  from sqlalchemy.ext.automap import automap_base
  from sqlalchemy.orm import Session
  from sqlalchemy import create_engine
  import psycopg2
except ImportError:
  subprocess.check_call([sys.executable, '-m', 'pip','install', 'pandas'])
  subprocess.check_call([sys.executable, '-m', 'pip','install', 'flask_cors'])
  subprocess.check_call([sys.executable, '-m', 'pip','install', 'sqlalchemy'])
  subprocess.check_call([sys.executable, '-m', 'pip','install', 'psycopg2'])
finally:
  import pandas as pd
  from flask_cors import CORS
  import sqlalchemy
  from sqlalchemy.ext.automap import automap_base
  from sqlalchemy.orm import Session
  from sqlalchemy import create_engine
  import psycopg2
#from flask_sqlalchemy import SQLAlchemy

#################################################
# Database Setup
#################################################
engine = create_engine("postgresql://postgres:postgres@localhost/timess")


## app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///db.sqlite"

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)
# Save reference to the table
# Station =  Base.classes.station
#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
# Home page. List all routes that are available.
#################################################

# Route to render index.html template using data from SQlite
@app.route('/api/sql_data',methods=['GET'])
def home():

    # Find one record of data from the sqlite database
    df = pd.read_sql('''SELECT * FROM times''', con = engine)
    sql_tim = df.to_dict('records')


    # Return template and data
    return jsonify(sql_tim)
    return render_template("index.html", mars=sql_tim)

if __name__ == '__main__':
  app.run(debug=True)