import sqlite3
from flask import jsonify, request
from flask_cors import CORS
from flask import Flask
from scrapy.crawler import CrawlerProcess
import crawler as crawler
import json


conn = None
c = None
conn = sqlite3.connect('crawler.db',check_same_thread=False)
c = conn.cursor()
app = Flask(__name__)
cors = CORS(app)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True


@app.route('/startCrawler', methods = ['GET'])
def get_crawlerData():

    """
    with conn:
        c.execute("DELETE from Crawldata")
        conn.commit()
    """
    #process = CrawlerProcess()
    #process.crawl(crawler.WebCrawler)
    #process.start()
    
    
    c.execute("SELECT abstract,category,Fetchdate as date, url as link from CrawlData")
    data = c.fetchall()
    formatData = []
    for l in data:
        temp = {
            "abstract": l[0],
             "category": l[1], 
             "date": l[2], 
             "link": l[3]
        }
        formatData.append(temp)



    
    resp = jsonify(formatData)
    resp.status_code = 200
    return resp

    

    """
    return jsonify(
    [
        {"abstract": "test", "category": "journal", "date": "12-02-2020", "link": "www.google.com"},
        {"abstract": "test", "category": "journal", "date": "12-02-2020", "link": "www.google.com"},
        {"abstract": "test", "category": "journal", "date": "12-02-2020", "link": "www.google.com"}
    ]
    )
    """

@app.route('/add', methods=['POST'])
def add_user():
        _json = request.json
        _name = _json['name']
        _email = _json['email']
        _password = _json['pwd']

        # validate the received values
        if _name and _email and _password and request.method == 'POST':
            # save edits
            with conn:
                c.execute("INSERT INTO users (username,email, password) VALUES(:name, :email, :password)",
                          {'name': _name, 'email': _email, 'password': _password})
                conn.commit()
            resp = jsonify('User added successfully!')
            resp.status_code = 200
            return resp

@app.route('/users')
def users():
        c.execute("SELECT * from users")
        data = c.fetchall()
        resp = jsonify(data)
        resp.status_code = 200
        return resp

@app.route('/user/<int:id>')
def user(id):
        c.execute("SELECT * from users WHERE UserID = :id", {'id': id})
        row = c.fetchone()
        out = [item for t in row for item in t]
        resp = jsonify(out)
        resp.status_code = 200
        return resp

@app.route('/deleteUser/<int:id>')
def delete_user(id):
    with conn:
        c.execute("DELETE from users WHERE UserID = :id", {'id': id})
        conn.commit()
        resp = jsonify('User deleted successfully!')
        resp.status_code = 200
        return resp

@app.route('/keywords', methods=['GET'])
def get_keywords():
        c.execute("SELECT keywords from keywords")
        row = c.fetchall()
        out = [item for t in row for item in t]
        resp = jsonify(out)
        resp.status_code = 200
        return resp

@app.route('/addKeyword', methods=['POST'])
def add_Keyword():
        _json = request.json
        _keyword = _json['keyword']
        _keyword = str(_keyword)

        # validate the received values
        if _keyword and request.method == 'POST':
            with conn:
                c.execute("INSERT INTO keywords VALUES(:keyword)",
                          {'keyword': _keyword})
                conn.commit()
            resp = jsonify('Keyword added successfully!')
            resp.status_code = 200
            return resp

@app.route('/websites', methods=['GET'])
def get_websites():
        c.execute("SELECT * from websites")
        row = c.fetchall()
        out = [item for t in row for item in t]
        resp = jsonify(out)
        resp.status_code = 200
        return resp

@app.route('/addWebsite', methods=['POST'])
def add_Website():
        _json = request.json
        _website = _json['website']

        # validate the received values
        if _website and request.method == 'POST':
            with conn:
                c.execute("INSERT INTO websites VALUES(:websites)",
                          {'websites': _website})
                conn.commit()
            resp = jsonify('Website added successfully!')
            resp.status_code = 200
            return resp

@app.route('/Crawler', methods=['GET'])
def get_crawler():
    c.execute("SELECT abstract,category,Fetchdate as date, url as link from CrawlData")
    data = c.fetchall()   
    resp = jsonify(data)
    resp.status_code = 200
    return resp
  
@app.route('/runCrawler', methods = ['GET'])
def run_crawler():
    with conn:
        c.execute("DELETE from Crawldata")
        conn.commit()
    process = CrawlerProcess()
    process.crawl(crawler.WebCrawler)
    process.start()
    #resp = jsonify('Crawler Successful!')
    #resp.status_code = 200
    #return resp


@app.route('/deleteCrawl/<int:id>', methods = ['DELETE'])
def delete_Crawl(id):
    with conn:
        c.execute("DELETE from CrawlData WHERE ID = :id", {'id': id})
        conn.commit()
        resp = jsonify('Record deleted successfully!')
        resp.status_code = 200
        return resp
        
@app.route('/deleteKeyword/<string:word>', methods = ['DELETE'])
def delete_keyword(word):
    with conn:
        c.execute("DELETE from keywords WHERE keywords = :id", {'id': word})
        conn.commit()
        resp = jsonify('Keyword deleted successfully!')
        resp.status_code = 200
        return resp

@app.route('/deleteWebsite/<string:word>', methods = ['DELETE'])
def delete_website(word):
    with conn:
        c.execute("DELETE from websites WHERE websites = :id", {'id': word})
        conn.commit()
        resp = jsonify('Website deleted successfully!')
        resp.status_code = 200
        return resp


@app.route('/UpdateFreq', methods=['PUT'])
def update_freq():
        _json = request.json
        _freq = _json['frequency']

        # validate the received values
        if _freq and request.method == 'PUT':
            with conn:
                c.execute("UPDATE frequency set frequency = :freq",
                          {'freq': _freq})
                conn.commit()
            resp = jsonify('Frequency Updated Successfully!')
            resp.status_code = 200
            return resp

@app.route('/freq', methods=['GET'])
def get_freq():
        c.execute("SELECT * from frequency")
        row = c.fetchall()
        out = [item for t in row for item in t]
        resp = jsonify(out[0])
        resp.status_code = 200
        return resp


@app.errorhandler(404)
def not_found(error=None):
    message = {
        'status': 404,
        'message': 'Not Found: ' + request.url,
    }
    resp = jsonify(message)
    resp.status_code = 404
    return resp

if __name__ == "__main__":
    #run_crawler()
    app.run(host='0.0.0.0')

