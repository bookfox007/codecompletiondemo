import pandas as pd

def advanced_analysis(data):
    # 示例高级分析：计算每个类别的平均值
    analysis_result = data.groupby('category').mean()
    return analysis_result
