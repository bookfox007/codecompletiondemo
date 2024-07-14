import pandas as pd

def read_data(file_path):
    data = pd.read_csv(file_path)
    data['date'] = pd.to_datetime(data['date'])
    return data

def summarize_data(data):
    summary = data.groupby(['date', 'category']).sum().unstack()
    return summary
