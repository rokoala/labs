import argparse
import urllib3
import json
import os.path,time
from datetime import datetime,timedelta
from os.path import expanduser
from shutil import copyfile

def get_bing_wallpaper(resolution='1920x1080', proxy=None, locale="ja-JP", force=False):
  WpDirectory = expanduser('~')+'/Pictures/BingWallpaper/'
  WpName = 'wallpaper.jpg'
  today = datetime.now()
  todayDate = today.strftime("%d/%m/%Y")

  if proxy == None:
    http = urllib3.PoolManager()
  else:
    http = urllib3.proxy_from_url(proxy)
  response = http.request("GET", 'http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt='+locale)
  obj = json.loads(response.data)
  url = (obj['images'][0]['urlbase'])
  url = 'http://www.bing.com' + url + '_' + resolution + '.jpg'

  if not os.path.exists(WpDirectory):
    os.makedirs(WpDirectory)
  path = WpDirectory + WpName

  if os.path.exists(path):
    fileDate = time.strftime('%d/%m/%Y', time.gmtime(os.path.getmtime(path)))
    if (todayDate == fileDate and not force):
      print("You already have today's Bing image")
    else:
      print("Downloading Bing wallpaper to %s" %(path))
      copyfile(path,WpDirectory+'wallpaper_'+str(int(time.time()))+".jpg")
      f = open(path,'w')
      bingpic = http.request("GET",url)
      f.write(bingpic.data)
  else:
    print("Downloading Bing wallpaper to %s" %(path))
    f = open(path,'w')
    bingpic = http.request("GET",url)
    f.write(bingpic.data)

if __name__ =="__main__":
  # parser = argparse.ArgumentParser(description = "this is a test")
  # parser.add_argument('--proxy', help='proxy configuration - http://[IP]:[PORT]')
  # parser.add_argument('--resolution', help='proxy configuration - http://[IP]:[PORT]')
  # args = parser.parse_args()
  get_bing_wallpaper()
