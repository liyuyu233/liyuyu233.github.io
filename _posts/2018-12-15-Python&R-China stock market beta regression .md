---
title: 【Investment】中国A股beta值回归
layout: post
---

这是投资学的一个作业，但从计量经济学的角度来看，面板数据和时间序列回归应该并没有这么简单粗暴。

这个文档的主体是用jupyter notebook完成的，它的python以及markdown支持极大地改善了本次作业的体验 ~~（虽然直接下载LaTeX文档的尝试失败了，但下载markdown文件再用vs code加工一下体验也还行，不过如果是要正经打印出来的话改成tex还是比较麻烦）~~，  
也要感谢R简洁的回归 ~~（虽然我现在还没有试图搞清楚它怎么处理了缺失值）~~，  
最最感谢python以及各位网友的python学习笔记，极大地改善了我的自学体验。

这个文档的主要目的是存档以供作者以后再次即兴创作的时候参考。

---

本次作业的目的是将2001.1-2018.11A股所有非st股票的$\beta$值进行面板数据回归与时间序列回归。具体步骤为下：
- [获得每只股票每个月的$\beta$数据](#%E8%8E%B7%E5%BE%97%E6%AF%8F%E5%8F%AA%E8%82%A1%E7%A5%A8%E6%AF%8F%E4%B8%AA%E6%9C%88%E7%9A%84beta%E6%95%B0%E6%8D%AE)
- [面板数据分析](#%E9%9D%A2%E6%9D%BF%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90)
- [时间序列分析](#%E6%97%B6%E9%97%B4%E5%BA%8F%E5%88%97%E5%88%86%E6%9E%90)

# 获得每只股票每个月的$\beta$数据

从国泰安上下载月$\beta$数据，见 Beta/BETA_Mbeta.xlsx ~~这个数据库似乎是付费的，但自行通过交易数据计算收益率再加权算市场收益率再回归得到$\beta$是可行的（虽然特别麻烦）~~


首先用python改变数据结构。



```python
import pandas as pd
df=pd.read_excel('Beta/BETA_Mbeta.xlsx')
df.head()
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Stkcd</th>
      <th>Trdmnt</th>
      <th>Betavals</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>2001-01</td>
      <td>1.14676</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>2001-02</td>
      <td>1.14863</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1</td>
      <td>2001-03</td>
      <td>1.04133</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1</td>
      <td>2001-04</td>
      <td>0.98286</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1</td>
      <td>2001-05</td>
      <td>1.00185</td>
    </tr>
  </tbody>
</table>
</div>

```python
from openpyxl import Workbook
wb1 = Workbook()
ws11 = wb1.active

for i in range(213):
    ws11.cell(row=1,column=i+2).value = df.iloc[i][1] #列标题为时间
```


```python
j = 2 #行计数
i=0

while i < len(df):
    name = df.iloc[i][0]
    ws11.cell(row=j,column=1).value = name #行标题为股票代码
       
    df1=df[df.Stkcd == name]
    
    for k in range(213):
        mn = ws11.cell(row=1,column=k+2).value
        if df1[df1.Trdmnt == mn].empty == False:
            df2 = df1[df1['Trdmnt']==ws11.cell(row=1,column=k+2).value]
            ws11.cell(row=j,column=k+2).value = df2.iloc[0][2]
    
    i += len(df1)
    j += 1

```


```python
wb1.save("data.xlsx")
```

# 面板数据分析

用R进行回归计算（见1_panelreg.R）

```R
library(readxl)
d <- read_excel("data.xlsx")


r <-data.frame('t'=NA,'t-1'=NA,'t-2'=NA, 't-3'=NA,'t-4'=NA,'t-5'=NA,'t-6'=NA,'t-7'=NA,'t-8'=NA,'t-9'=NA,'t-10'=NA,'t-11'=NA,'t-12'=NA)

i=15
while (i < 215)
{
  lm <- lm(d[[i]]~d[[i-1]]+d[[i-2]]+d[[i-3]]+d[[i-4]]+d[[i-5]]+d[[i-6]]+d[[i-7]]+d[[i-8]]+d[[i-9]]+d[[i-10]]+d[[i-11]]+d[[i-12]]+d[[i-13]]);
  sm <- summary(lm);
  co <- sm$coefficients;
  j=1;
  repeat{
    r[i,j]=co[[j+1,2]];
    j = j+1
    if(j>13){break}
  }
  i = i+1
}
  
write.table(r,file='1_panelreg.csv',row.names=TRUE,col.names = TRUE, sep=',')

```

得到面板数据回归结果1_panelreg.csv

# 时间序列分析



```python
import pandas as pd
from pandas import DataFrame,Series
from openpyxl import Workbook
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

df=pd.read_excel('data.xlsx')
df.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>2001-01</th>
      <th>2001-02</th>
      <th>2001-03</th>
      <th>2001-04</th>
      <th>2001-05</th>
      <th>2001-06</th>
      <th>2001-07</th>
      <th>2001-08</th>
      <th>2001-09</th>
      <th>2001-10</th>
      <th>...</th>
      <th>2018-02</th>
      <th>2018-03</th>
      <th>2018-04</th>
      <th>2018-05</th>
      <th>2018-06</th>
      <th>2018-07</th>
      <th>2018-08</th>
      <th>2018-09</th>
      <th>2018-10</th>
      <th>2018-11</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>1.14676</td>
      <td>1.14863</td>
      <td>1.04133</td>
      <td>0.98286</td>
      <td>1.00185</td>
      <td>1.02046</td>
      <td>0.98481</td>
      <td>0.98876</td>
      <td>1.00287</td>
      <td>0.93510</td>
      <td>...</td>
      <td>0.41649</td>
      <td>0.40984</td>
      <td>0.41144</td>
      <td>0.41513</td>
      <td>0.43186</td>
      <td>0.42195</td>
      <td>0.40904</td>
      <td>0.42812</td>
      <td>0.42232</td>
      <td>0.40325</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1.11191</td>
      <td>1.12519</td>
      <td>1.09175</td>
      <td>1.02327</td>
      <td>1.01527</td>
      <td>1.05420</td>
      <td>0.99799</td>
      <td>0.97028</td>
      <td>0.92380</td>
      <td>0.82569</td>
      <td>...</td>
      <td>0.28474</td>
      <td>0.28922</td>
      <td>0.32059</td>
      <td>0.34532</td>
      <td>0.34037</td>
      <td>0.33903</td>
      <td>0.32908</td>
      <td>0.34867</td>
      <td>0.34473</td>
      <td>0.34316</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1.15803</td>
      <td>1.16283</td>
      <td>1.21651</td>
      <td>1.29234</td>
      <td>1.35347</td>
      <td>1.36843</td>
      <td>1.33484</td>
      <td>1.33277</td>
      <td>1.32181</td>
      <td>1.35232</td>
      <td>...</td>
      <td>1.18902</td>
      <td>1.17596</td>
      <td>1.18114</td>
      <td>1.17006</td>
      <td>1.17081</td>
      <td>1.16983</td>
      <td>1.16184</td>
      <td>1.16033</td>
      <td>1.13446</td>
      <td>1.13769</td>
    </tr>
    <tr>
      <th>5</th>
      <td>0.86581</td>
      <td>0.85902</td>
      <td>0.92650</td>
      <td>0.87183</td>
      <td>0.88884</td>
      <td>0.90265</td>
      <td>0.83639</td>
      <td>0.84571</td>
      <td>0.81680</td>
      <td>0.72195</td>
      <td>...</td>
      <td>3.12787</td>
      <td>3.15687</td>
      <td>3.15293</td>
      <td>3.15320</td>
      <td>3.10823</td>
      <td>3.11501</td>
      <td>3.07410</td>
      <td>3.07994</td>
      <td>3.04942</td>
      <td>3.08351</td>
    </tr>
    <tr>
      <th>6</th>
      <td>1.00245</td>
      <td>1.00915</td>
      <td>0.93379</td>
      <td>0.87686</td>
      <td>0.88900</td>
      <td>0.91012</td>
      <td>0.86089</td>
      <td>0.86265</td>
      <td>0.84522</td>
      <td>0.81661</td>
      <td>...</td>
      <td>NaN</td>
      <td>1.08195</td>
      <td>1.06572</td>
      <td>1.05168</td>
      <td>1.04775</td>
      <td>1.05017</td>
      <td>1.07009</td>
      <td>1.06074</td>
      <td>1.06170</td>
      <td>1.06389</td>
    </tr>
  </tbody>
</table>
<p>5 rows × 213 columns</p>
</div>




```python
data1 = np.zeros((len(df),13))
df_ = pd.DataFrame(data1,columns=["t","t-1","t-2","t-3","t-4","t-5","t-6","t-7","t-8","t-9","t-10","t-11","t-12"])

for i in range(len(df)):
    print('working on', i)
    data2 = np.zeros((213,14))
    df_1 = pd.DataFrame(data2,columns=["t-12","t-11","t-10","t-9","t-8","t-7","t-6","t-5","t-4","t-3","t-2","t-1","t","t+1"])

    for j in range(213):
        for k in range(14):
            if j+k+1<213 and df.iloc[i][j+k] != None:
                df_1.iloc[j][k]=df.iloc[i][j+k]
            else:
                df_1.iloc[j][k] = None

    df_2=df_1.dropna()
    x=df_2[["t","t-1","t-2","t-3","t-4","t-5","t-6","t-7","t-8","t-9","t-10","t-11","t-12"]]
    y=df_2[["t+1"]]
    
    if x.empty == False:

        model=LinearRegression()
        model.fit(x,y)

        b = model.coef_

        for k in range(13):
            df_.iloc[i][k]=b[0][k]
    
    if x.empty == True:
        for k in range(13):
            df_.iloc[i][k]=None


    df_.to_csv("2_tsreg.csv")
```

```python
df1=df_.dropna()
```


```python
beta=df1.mean()
```


```python
t=df1.mean()/df1.std()
```

故  
$\bar\beta_{t}=0.845900$, 
$\bar\beta_{t-1}=-0.005500$, 
$\bar\beta_{t-2}=0.026300$, 
$\bar\beta_{t-3}=-0.026700$, 
$\bar\beta_{t-4}=0.027400$, 
$\bar\beta_{t-5}=-0.010000$, 
$\bar\beta_{t-6}=0.001700$, 
$\bar\beta_{t-7}=-0.034000$, 
$\bar\beta_{t-8}=0.018900$, 
$\bar\beta_{t-9}=-0.018100$, 
$\bar\beta_{t-10}=0.013400$, 
$\bar\beta_{t-11}=0.000500$, 
$\bar\beta_{t-12}=0.001900$, 

$t_{t}=1.575700$, 
$t_{t-1}=-0.014700$, 
$t_{t-2}=0.063700$, 
$t_{t-3}=-0.076900$, 
$t_{t-4}=0.070200$, 
$t_{t-5}=-0.029600$, 
$t_{t-6}=0.004500$, 
$t_{t-7}=-0.118900$, 
$t_{t-8}=0.039200$, 
$t_{t-9}=-0.031700$, 
$t_{t-10}=0.029400$, 
$t_{t-11}=0.000900$, 
$t_{t-12}=0.004900$.
