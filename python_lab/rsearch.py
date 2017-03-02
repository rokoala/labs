#!/usr/bin/env python

import re
import argparse

def rfind(_regex,path):
  f = open(path,"r")
  regex = re.compile(_regex)
  for line in f:
    words = regex.findall(line)
    for word in words:
      print word

if __name__ == "__main__":
  parser = argparse.ArgumentParser(description='Get pattern from file')
  parser.add_argument("--regex","--r",help='regex')
  parser.add_argument("--file",help='path to file')
  args=parser.parse_args()
  rfind(args.regex, args.file)
