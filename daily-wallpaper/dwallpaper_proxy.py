import urllib3
import datetime
import json
import os.path,time
from os.path import expanduser

resolution= '1920x1080'
WpDirectory= expanduser('~')+'/Pictures/BingWallpaper/' 
WpName='wallpaper.jpg'

http= urllib3.proxy_from_url('http://127.0.0.1:5865')
response= http.request("GET","http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=ja-JP")
obj= json.loads(response.data)
url= (obj['images'][0]['urlbase'])
url= 'http://www.bing.com' + url + '_' + resolution + '.jpg'
if not os.path.exists(WpDirectory):
  os.makedirs(WpDirectory)
path= WpDirectory + WpName

if os.path.exists(path):
  todayDate = datetime.datetime.now().strftime("%m/%d/%Y")
  fileDate = time.strftime('%m/%d/%Y', time.gmtime(os.path.getmtime(path)))
  if todayDate == fileDate:
    print "You already have today's Bing image"
  else:
    print("Downloading Bing wallpaper to %s" %(path))
    f = open(path,'w')
    bingpic = http.request("GET",url)
    f.write(bingpic.data)
else:
  print("Downloading Bing wallpaper to %s" %(path))
  f = open(path,'w')
  bingpic = http.request("GET",url)
  f.write(bingpic.data)
