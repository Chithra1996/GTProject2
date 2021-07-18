from flask import Flask, render_template
import pandas as pd
import json
import plotly
import plotly.express as px
app = Flask(__name__)
@app.route('/data/shanghai.sqlite')
def notdash():
    df = pd.read_sql('data/shanghai.sqlite')
    fig = px.bar(df, x="year", y="world_rank", color="yellow",    barmode="group")  
    graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
    return render_template('index.html', graphJSON=graphJSON)
if __name__ == '__main__':
   app.run()