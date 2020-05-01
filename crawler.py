import requests
from bs4 import BeautifulSoup
import scrapy
from scrapy.spiders import Rule, CrawlSpider
from scrapy.linkextractors import LinkExtractor
import requests
import sqlite3

class WebCrawler(scrapy.Spider):
    conn = None
    c = None
    conn = sqlite3.connect('crawler.db',check_same_thread=False)
    c = conn.cursor()
    c.execute("SELECT * from websites")
    data = c.fetchall()
    out = [item for t in data for item in t]

    print(out)
    name = "WebCrawler"
    start_urls = ['https://www.bisnow.com/', 'https://www.washingtonpost.com/regional/' , 'https://www.bizjournals.com/washington/', 'https://www.tysonsreporter.com/', 'https://www.bizjournals.com/atlanta/', 'https://www.bizjournals.com/houston/', 'https://www.bizjournals.com/denver/', 'https://www.ajc.com/', 'https://www.chron.com/', 'https://www.denverpost.com/', 'https://dc.citybizlist.com/', 'https://www.americaninno.com/dc/', 'https://www.virginiabusiness.com/news/regions/northern-virginia/', 'https://www.bloomberg.com/deals', 'https://federalnewsnetwork.com/category/contracting/', 'https://builtin.com/', 'https://www.americaninno.com/', 'https://pitchbook.com/news', 'https://www.insidenova.com/business_voice/' , 'www.washingtontechnology.com', 'www.technical.ly.com']
    allowed_domains = ['technet.net', 'bisnow.com', 'washingtonpost.com', 
    'bizjournals.com', 'tysonsreporter.com', ' izjournals.com/atlanta', 
    'bizjournals.com/houston', 'bizjournals.com', 'ajc.com',
     'chron.com', 'denverpost.com', 'dc.citybizlist.com', 
     'americaninno.com', 'virginiabusiness.com', 
     'bloomberg.com', 'federalnewsnetwork.com',
     'forbes.com', 'thehill.com', 
     'inc.com','washingtontechnology.com', 'technical.ly.com']
    rules = [
        Rule(
            LinkExtractor(
                canonicalize=True,
                unique=True
            ),
                follow=True,
                callback="parse"
        )
    ]

    def get_keywords(self):
        conn = sqlite3.connect('crawler.db',check_same_thread=False)
        c = conn.cursor()
        c.execute("SELECT * from keywords")
        data = c.fetchall()
        self.out = [item for t in data for item in t]
        return self.out

    def start_requests(self):
        for url in self.start_urls:
            yield scrapy.Request(url, callback=self.parse, dont_filter=True)

    def parse(self, response):
        conn = sqlite3.connect('crawler.db',check_same_thread=False)
        c = conn.cursor()
        urlList = []
        links = LinkExtractor(canonicalize=True, unique=True).extract_links(response)
        for link in links:
            is_allowed = False
            for allowed_domain in self.allowed_domains:
                if allowed_domain in link.url:
                    is_allowed = True
            if is_allowed:
                source = requests.get(link.url)
                data = source.text
                soup = BeautifulSoup(data, 'html.parser')
                text = soup.find_all(text=True)
                title = soup.find('title')
                numOfOccur = self.wordCount(text)
                if numOfOccur[1] >= 3:
                    replaced = False
                    for i in range(len(urlList)):
                        if str(urlList[i][1]) in str(link.url):
                            urlList[i] = [self.out[numOfOccur[0]], link.url, title.string]
                            replaced = True
                            break
                    if not replaced:
                        urlList.append([self.out[numOfOccur[0]], link.url, title.string])
        for link in urlList:
            if len(link[1]) > 55:
                self.populateDB(str(link[0]), str(link[1]), str(link[2]))
                print("keyword --> " + str(link[0]))        
                print("link with keywords --> " + str(link[1]))
                print("abs --> " + str(link[2]))


    def populateDB(self, keyword, link, abstract):
        conn = sqlite3.connect('crawler.db',check_same_thread=False)
        c = conn.cursor()
        c.execute("INSERT INTO CrawlData (Category, URL, abstract) VALUES(:keyword, :link, :abstract)",{'keyword': keyword ,'link': str(link), 'abstract':abstract})
        conn.commit()

    def wordCount(self, text):
        blacklist = [
	        '[document]',
	        'noscript',
	        'header',
	        'html',
	        'meta',
	        'head', 
	        'input',
	        'script',
        ]
        output = ''
        for t in text:
	        if t.parent.name not in blacklist:
		        output += '{} '.format(t)
        counter = 0
        keyWords = self.get_keywords()
        keywordCount = []
        for i in range(len(keyWords)):
            numOfOccur = output.count(keyWords[i])
            keywordCount.append(numOfOccur)
            counter += numOfOccur
        
        l = -1
        for i in range(len(keywordCount)):
            if keywordCount[i] > l:
                l = i
        keywordCount.append(counter)
        return [l, counter]            