import numpy as np
import pandas as pd
import os
import csv

glove_data = os.path.join(os.getcwd(), "datasets/glove.6B")


GLOVE_DATASETS = dict([
    (
      fn.split('.')[2], 
      os.path.join(glove_data, fn)
    )   
    for fn 
    in os.listdir(glove_data)
])


words = pd.DataFrame()

def load_words(datafile):
  return pd.read_table(datafile, sep=" ", index_col=0, header=None, quoting=csv.QUOTE_NONE)

def vec(w):
  return words.loc[w]




