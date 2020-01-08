---
title: 【Python】检验size effect
layout: post
---

这里的size effect是指[Fama-French三因子模型](https://baike.baidu.com/item/Fama-French%E4%B8%89%E5%9B%A0%E5%AD%90%E6%A8%A1%E5%9E%8B/7262839?fr=aladdin)当中的市值因子。市值就是股票价格乘以股票总量，有两种类型：总市值指股票价格乘以发行总股数，流通市值指股票价格乘以流通股数。本文检验的是总市值。关于size effect的一般结论是，公司市值越小，收益率越高。（详情请见[Fama, E. F. , & French, K. R. . (1992). The cross-section of expected stock returns. The Journal of Finance, 47(2), 427-465.](10.1111/j.1540-6261.1992.tb04398.x)）

这篇论文虽然是学习资产定价领域的经典必读作品，但是并不是本文的主题（虽然本文为了解释清楚到底发生了什么包含了一些相关信息）。这篇文章的主要目的是*从非常新手的角度*（包含了非常多的絮絮叨叨和各种文档链接）熟悉python的相关操作，**不构成任何形式的投资建议**~~（因为看起来显著可能实际上是哪里算错了）~~。

主要步骤包括：

1. [处理数据](#1.-%E5%A4%84%E7%90%86%E6%95%B0%E6%8D%AE)
    1. [读取数据](#1.A.-%E8%AF%BB%E5%8F%96%E6%95%B0%E6%8D%AE)：本文使用的数据是1991年-2019年的个股月度交易数据。（来自于国泰安数据库）
    2. [筛选数据](#1.B.-%E7%AD%9B%E9%80%89%E6%95%B0%E6%8D%AE)：只包括A股和创业板~~（并不在意B股如何）~~
    3. [转换数据类型](#1.C.-%E8%BD%AC%E6%8D%A2%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B)（因为一开始每一列都有str所以读进来是object导致需要强行转换成能看的形式）~~顺带折腾一下datetime之类的玩意儿~~
    4. 储存数据~~（备份以防万一吧可能）~~
2. [计算](#2.-%E8%AE%A1%E7%AE%97)
    1. [分组](#2.A.-%E5%88%86%E7%BB%84)：每年六月，按照市值从小到大划分为十组
    2. [计算组合收益](#2.B.-%E8%AE%A1%E7%AE%97%E7%BB%84%E5%90%88%E6%94%B6%E7%9B%8A)：计算每一组的按市值加权的组合收益
3. [分析结果](#3.-%E5%88%86%E6%9E%90%E7%BB%93%E6%9E%9C)（看组合收益是否显著不为0）

【Ver2更新】并不熟悉组合收益之类概念的朋友请戳[Appendix1](#Appendix1)，好奇如何作为策略操作的朋友请戳[Appendix2](#Appendix2)

-----------------------

## 1. 处理数据

### 1.A. 读取数据


```python
import pandas as pd
import numpy as np
from scipy import stats
import os
```

导入需要的包。

[pandas](https://pandas.pydata.org/)是人见人爱的处理表格的包。

[numpy](https://numpy.org/)和[scipy](https://www.scipy.org/)是科学计算的包。

[os](https://docs.python.org/3/library/os.html)在这里只是用来切换路径~~（打酱油）~~



```python
dataLib = "YourDataPath"

os.chdir(dataLib)
data = pd.read_csv('TRD_Mnth.txt',sep = '\t',encoding = 'gb2312',low_memory= False)
```

1. `os.chdir(path)`: 将工作路径变更到path
2. [`pd.read_csv(filepath, sep='\t', encoding = 'gb2312', low_memory = False)`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_csv.html)
    1. `filepath`：文件路径
    2. `sep='\t'`：分隔符为`'\t'`
    3. `encoding = 'gb2312'`：编码方式为gb2312
    4. `low_memory = False`：避免mixed type警告（这可能是因为国泰安这个数据它就是很喜欢第一行英文第二行中文第三行中文单位什么的）


```python
data = data.iloc[2:]
data.head()
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
      <th>Opndt</th>
      <th>Mopnprc</th>
      <th>Clsdt</th>
      <th>Mclsprc</th>
      <th>Mnshrtrd</th>
      <th>Mnvaltrd</th>
      <th>Msmvosd</th>
      <th>Msmvttl</th>
      <th>Ndaytrd</th>
      <th>Mretwd</th>
      <th>Mretnd</th>
      <th>Markettype</th>
      <th>Capchgdt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2</th>
      <td>000001</td>
      <td>1991-04</td>
      <td>03</td>
      <td>49.000</td>
      <td>30</td>
      <td>43.680</td>
      <td>13400</td>
      <td>615000.000</td>
      <td>1157520.00</td>
      <td>2118487.47</td>
      <td>20</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>4</td>
      <td>1991-04-03</td>
    </tr>
    <tr>
      <th>3</th>
      <td>000001</td>
      <td>1991-05</td>
      <td>02</td>
      <td>43.460</td>
      <td>31</td>
      <td>38.340</td>
      <td>187800</td>
      <td>7675000.000</td>
      <td>1016010.00</td>
      <td>1859496.56</td>
      <td>24</td>
      <td>-.122253</td>
      <td>-.122253</td>
      <td>4</td>
      <td>1991-04-03</td>
    </tr>
    <tr>
      <th>4</th>
      <td>000001</td>
      <td>1991-06</td>
      <td>01</td>
      <td>38.530</td>
      <td>28</td>
      <td>33.990</td>
      <td>30600</td>
      <td>1094000.000</td>
      <td>900735.00</td>
      <td>1648520.81</td>
      <td>23</td>
      <td>-.113459</td>
      <td>-.113459</td>
      <td>4</td>
      <td>1991-04-03</td>
    </tr>
    <tr>
      <th>5</th>
      <td>000001</td>
      <td>1991-07</td>
      <td>01</td>
      <td>33.650</td>
      <td>31</td>
      <td>29.540</td>
      <td>6100</td>
      <td>194043.000</td>
      <td>782810.00</td>
      <td>1432695.05</td>
      <td>16</td>
      <td>-.130921</td>
      <td>-.130921</td>
      <td>4</td>
      <td>1991-04-03</td>
    </tr>
    <tr>
      <th>6</th>
      <td>000001</td>
      <td>1991-08</td>
      <td>01</td>
      <td>29.390</td>
      <td>31</td>
      <td>15.000</td>
      <td>3243100</td>
      <td>49576242.000</td>
      <td>674833.82</td>
      <td>1346274.65</td>
      <td>15</td>
      <td>-.411588</td>
      <td>-.411587</td>
      <td>4</td>
      <td>1991-08-01</td>
    </tr>
  </tbody>
</table>
</div>



`data.iloc[2:]`：选取2及之后行（详见[pd.DataFrame.iloc](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.iloc.html)）

其中部分指标及其中文名称：

名称 | 中文名称
:-- | :--
Stkcd | 证券代码
Trdmnt | 交易月份
Msmvttl | 月个股总市值
Mretwd | 考虑现金红利再投资的月个股回报率
Markettype | 市场类型

### 1.B. 筛选数据


```python
data = data.sort_values(['Stkcd','Trdmnt'])
```

[`data.sort_values(['Stkcd','Trdmnt'])`](https://pandas.pydata.org/pandas-docs/version/0.19/generated/pandas.DataFrame.sort_values.html)：根据Stkcd与Trdmnt进行排序


```python
data = data[data.Markettype.isin(['1','4','16'])]
```

1=SH.A, 2=SH.B, 4=SZ.A, 8=SZ.B, 16=SZ.创业板

1. `data.Markettype`：选取data中的Markettype列
2. [`Series.isin(values)`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.isin.html)：检查Series中的值是否在values当中
3. `data[data.Markettype.isin(['1', '4', '16'])]`：选取data中Markettype为1,4,16的行（详见[indexing#indexing with isin](https://pandas.pydata.org/pandas-docs/stable/user_guide/indexing.html#indexing-with-isin)）

### 1.C. 转换数据类型


```python
for i in data:
    data[i] = pd.to_numeric(data[i],errors = 'ignore')
```

1. `for i in data`：对于data中的所有列名
2. [`pd.to_numeric(data[i],errors = 'ignore')`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.to_numeric.html)尝试将类型转换为数字
3. 这一步前后可以用[`data.dtypes`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.dtypes.html)查看data中各列的类型


```python
data['tmidx'] = pd.to_datetime(data.Trdmnt)
```

1. [`pd.to_datetime(data.Trdmnt)`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.to_datetime.html)：将data中Trdmnt列的数据转换为np.datetime64格式
2. `data['tmidx'] = Series`：在data中建立tmidx列，列的值为Series

（[datetime](https://docs.python.org/3.3/library/datetime.html#module-datetime), [np.datetime64](https://docs.scipy.org/doc/numpy/reference/arrays.datetime.html)以及其中的time, date, datetime, timedelta之类的各种转换令人头大……建议通读这些东西的文档并善用搜索引擎（每次都是搞不定就搜索导致现在也没完全搞清楚.jpg））


```python
data = data[data.tmidx <= '2018-12']
```

选取data中tmidx在2018年12月之前的数据


```python
data = data.sort_values(['Stkcd','tmidx'])
```


```python
data.to_stata('mRet.dta')
```

将data保存为stata数据格式的文件，命名为mRet.dta（详见[pd.DataFrame.to_stata](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.to_stata.html)）

保存为csv格式的话数字似乎又会全部变成str（尤其是好不容易折腾完的datetimelike一类的东西变成str简直原地gg）所以现在姑且存成dta（还可以试着用stata进行自我检验）~~（其实是不知道还有什么合适的格式）~~

---------

## 2. 计算

这里是一些相关的论文细节：每年六月，按照市值大小划分为十组股票组合（市值从小到大排序，前百分之十为第一组，百分之十到百分之二十为第二组，以此类推）

然后这一年七月到下一年六月这一段时间里，就按照这个分组，计算每一个股票组合的收益率（按市值加权）

### 2.A. 分组


```python
data = data[data.tmidx.dt.month == 6]
```

留下月份为6的数据（详见[pandas.Series.dt](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.dt.html)）


```python
data = data.sort_values(['Trdmnt','Stkcd'])
```


```python
data.head()
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
      <th>Opndt</th>
      <th>Mopnprc</th>
      <th>Clsdt</th>
      <th>Mclsprc</th>
      <th>Mnshrtrd</th>
      <th>Mnvaltrd</th>
      <th>Msmvosd</th>
      <th>Msmvttl</th>
      <th>Ndaytrd</th>
      <th>Mretwd</th>
      <th>Mretnd</th>
      <th>Markettype</th>
      <th>Capchgdt</th>
      <th>tmidx</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>4</th>
      <td>1</td>
      <td>1991-06</td>
      <td>1</td>
      <td>38.53</td>
      <td>28</td>
      <td>33.99</td>
      <td>30600</td>
      <td>1094000.0</td>
      <td>900735.00</td>
      <td>1648520.81</td>
      <td>23</td>
      <td>-0.113459</td>
      <td>-0.113459</td>
      <td>4</td>
      <td>1991-04-03</td>
      <td>1991-06-01</td>
    </tr>
    <tr>
      <th>349</th>
      <td>2</td>
      <td>1991-06</td>
      <td>10</td>
      <td>7.50</td>
      <td>28</td>
      <td>6.55</td>
      <td>1626500</td>
      <td>10941000.0</td>
      <td>370194.03</td>
      <td>504156.83</td>
      <td>15</td>
      <td>-0.303809</td>
      <td>-0.303809</td>
      <td>4</td>
      <td>1991-06-08</td>
      <td>1991-06-01</td>
    </tr>
    <tr>
      <th>815</th>
      <td>4</td>
      <td>1991-06</td>
      <td>3</td>
      <td>9.80</td>
      <td>28</td>
      <td>5.40</td>
      <td>510500</td>
      <td>4414000.0</td>
      <td>27000.00</td>
      <td>67500.00</td>
      <td>11</td>
      <td>-0.454545</td>
      <td>-0.454545</td>
      <td>4</td>
      <td>1991-01-14</td>
      <td>1991-06-01</td>
    </tr>
    <tr>
      <th>1153</th>
      <td>5</td>
      <td>1991-06</td>
      <td>3</td>
      <td>10.45</td>
      <td>27</td>
      <td>9.40</td>
      <td>60000</td>
      <td>592000.0</td>
      <td>401149.70</td>
      <td>846000.00</td>
      <td>15</td>
      <td>-0.109005</td>
      <td>-0.109005</td>
      <td>4</td>
      <td>1990-12-10</td>
      <td>1991-06-01</td>
    </tr>
    <tr>
      <th>2422</th>
      <td>9</td>
      <td>1991-06</td>
      <td>25</td>
      <td>4.30</td>
      <td>28</td>
      <td>4.80</td>
      <td>1981900</td>
      <td>10312000.0</td>
      <td>405168.00</td>
      <td>1080144.00</td>
      <td>4</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>4</td>
      <td>1991-06-25</td>
      <td>1991-06-01</td>
    </tr>
  </tbody>
</table>
</div>




```python
def rank(x):
    q = {}
    q[0] = x.Msmvttl.quantile(0)
    x.loc[x.Msmvttl == q[0],'rank'] = 1
    for i in range(1,11):
        q[i] = x.Msmvttl.quantile(i/10)
        x.loc[(x.Msmvttl >= q[i-1]) & (x.Msmvttl <= q[i]),'rank'] = i
    return x

data = data.groupby('tmidx').apply(lambda x: rank(x))
```

将数据按照tmidx分组，对于每一组，按照Msmvttl大小分为十组。百分比排位（由小到大）与组别对应关系如下：

Rank | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
--- | --- | --- | --- | --- | --- | --- | --- | --- | --- | ---
Percent | $$[0,0.1]$$ | $$(0.1,0.2]$$ | $$(0.2,0.3]$$ | $$(0.3,0.4]$$ | $$(0.4,0.5]$$ | $$(0.5,0.6]$$ | $$(0.6,0.7]$$ | $$(0.7,0.8]$$ | $$(0.8,0.9]$$ | $$(0.9,1]$$ 



```python
data['ranktime'] = data.tmidx.dt.year
```


```python
data = data[['Stkcd','ranktime','rank']]
```


```python
data = data.sort_values(['Stkcd','ranktime'])
```


```python
data.to_stata('rank.dta')
```

### 2.B. 计算组合收益


```python
mRet = pd.read_stata('mRet.dta')
```

读取一下之前处理过的月收益数据


```python
mRet['ranktime'] = mRet.tmidx-np.timedelta64(6,'M')
mRet['ranktime'] = mRet.ranktime.dt.year
```

这里稍微处理了一下。

因为t年6月的分组（ranktime记为t）在t年7月到t+1年6月生效，所以这里把月份往回推六个月，也就是把t年7月到t+1年6月变换成t年1月到t年12月，这样就可以直接用year参数输出对应排序的年份（也就是t）。


```python
mRet = mRet.sort_values(['Stkcd','ranktime'])

rank = pd.read_stata('rank.dta')

data = pd.merge(mRet,rank, on = ['Stkcd','ranktime'],validate = 'm:1',indicator = True)
data = data[data['_merge'].isin(['both','left_only'])]
data = data.drop(columns = ['_merge'])
```

把月收益数据与分组结果合并一下


```python
data = data.sort_values(['Stkcd','tmidx'])
```


```python
data['mettl1'] = data.groupby('Stkcd').Msmvttl.shift(1)
```

1. `data.groupby('Stkcd')`：根据Stkcd分组（详见[pd.DataFrame.groupby](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.groupby.html)）
2. `data.groupby('Stkcd').Msmvttl.shift(1)`：对于每一组Stkcd，将其中的Msmvttl进行一阶滞后（详见[pd.DataFrame.shift](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.shift.html)）

这里是要按上个月的总市值进行加权来计算组合收益率。以下是一个推导可以不用理它。

> 假设$t-1$月末组合中资产i总价值为$A_{t-1,i}$，$t$月末资产i总价值为$A_{t,i}$，$t$月资产i收益率为$r_{t,i}$
> 
> 又假设$t-1$月末整个组合的资产总价值为$A_{t-1}$，$t$月末整个组合的资产为$A_t$，$t$月的组合收益率为$r_t$
> 
> 则
> 
> $$
 A_t - A_{t-1}= \sum A_{t,i} - A_{t-1}= \sum (A_{t-1,i}\times r_{t,i})
 $$
> 
> $$
 r_t = \frac{A_t - A_{t-1}}{A_{t-1}} = \sum (\frac{A_{t-1,i}}{A_{t-1}}\times r_{t,i})
 $$


```python
data = data.sort_values(['tmidx','Stkcd'])
data = data.dropna()

def retvwttl1(x):
    w = x.mettl1/x.mettl1.sum()
    x['retvwttl'] = sum(w*x.Mretwd)
    return x

data = data.groupby(['tmidx','rank']).apply(lambda x: retvwttl1(x))
```

按照上面那个推导算每个组合的收益率（retvwttl）

apply表示对于groupby返回的所有组，都执行一个函数。详见[pd.DataFrame.apply](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.apply.html)


```python
data.head()
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
      <th>index_x</th>
      <th>Stkcd</th>
      <th>Trdmnt</th>
      <th>Opndt</th>
      <th>Mopnprc</th>
      <th>Clsdt</th>
      <th>Mclsprc</th>
      <th>Mnshrtrd</th>
      <th>Mnvaltrd</th>
      <th>Msmvosd</th>
      <th>...</th>
      <th>Mretwd</th>
      <th>Mretnd</th>
      <th>Markettype</th>
      <th>Capchgdt</th>
      <th>tmidx</th>
      <th>ranktime</th>
      <th>index_y</th>
      <th>rank</th>
      <th>mettl1</th>
      <th>retvwttl</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>7</td>
      <td>1</td>
      <td>1991-09</td>
      <td>2</td>
      <td>15.00</td>
      <td>28</td>
      <td>14.50</td>
      <td>7240500.0</td>
      <td>102706985.0</td>
      <td>652339.35</td>
      <td>...</td>
      <td>-0.033333</td>
      <td>-0.033333</td>
      <td>4</td>
      <td>1991-08-01</td>
      <td>1991-09-01</td>
      <td>1991</td>
      <td>4</td>
      <td>10.0</td>
      <td>1346274.65</td>
      <td>0.131735</td>
    </tr>
    <tr>
      <th>328</th>
      <td>352</td>
      <td>2</td>
      <td>1991-09</td>
      <td>2</td>
      <td>6.30</td>
      <td>30</td>
      <td>4.70</td>
      <td>4362600.0</td>
      <td>14893175.0</td>
      <td>265635.41</td>
      <td>...</td>
      <td>-0.253968</td>
      <td>-0.253968</td>
      <td>4</td>
      <td>1991-06-08</td>
      <td>1991-09-01</td>
      <td>1991</td>
      <td>349</td>
      <td>6.0</td>
      <td>484914.21</td>
      <td>-0.253968</td>
    </tr>
    <tr>
      <th>751</th>
      <td>818</td>
      <td>4</td>
      <td>1991-09</td>
      <td>2</td>
      <td>4.05</td>
      <td>30</td>
      <td>3.95</td>
      <td>730500.0</td>
      <td>3143950.0</td>
      <td>19750.00</td>
      <td>...</td>
      <td>-0.024691</td>
      <td>-0.024691</td>
      <td>4</td>
      <td>1991-01-14</td>
      <td>1991-09-01</td>
      <td>1991</td>
      <td>815</td>
      <td>4.0</td>
      <td>50625.00</td>
      <td>-0.024691</td>
    </tr>
    <tr>
      <th>1062</th>
      <td>1156</td>
      <td>5</td>
      <td>1991-09</td>
      <td>2</td>
      <td>7.04</td>
      <td>29</td>
      <td>6.31</td>
      <td>61500.0</td>
      <td>389300.0</td>
      <td>269282.41</td>
      <td>...</td>
      <td>-0.123611</td>
      <td>-0.123611</td>
      <td>4</td>
      <td>1990-12-10</td>
      <td>1991-09-01</td>
      <td>1991</td>
      <td>1153</td>
      <td>7.0</td>
      <td>648000.00</td>
      <td>-0.123611</td>
    </tr>
    <tr>
      <th>2213</th>
      <td>2425</td>
      <td>9</td>
      <td>1991-09</td>
      <td>2</td>
      <td>3.55</td>
      <td>29</td>
      <td>3.55</td>
      <td>7647300.0</td>
      <td>26923480.0</td>
      <td>299655.50</td>
      <td>...</td>
      <td>-0.013889</td>
      <td>-0.013889</td>
      <td>4</td>
      <td>1991-06-25</td>
      <td>1991-09-01</td>
      <td>1991</td>
      <td>2422</td>
      <td>9.0</td>
      <td>810108.00</td>
      <td>-0.013889</td>
    </tr>
  </tbody>
</table>
<p>5 rows × 22 columns</p>
</div>




```python
data = data[['tmidx','rank','retvwttl']]
data = data.sort_values(['tmidx','rank'])

data = data.drop_duplicates(['tmidx','rank'])
data = data.sort_values(['tmidx','rank'])

data = data[data['rank'].isna().values == False]
data = data[['tmidx','rank','retvwttl']]
data = data.sort_values(['rank','tmidx'])
```

整理一下数据，没有分组的就不要了（真的有没有分组的吗）


```python
df = data.pivot(index = 'tmidx', columns = 'rank',values = 'retvwttl')
```

建立一个以tmidx为索引，rank的值为列，显示retvwttl值的数据透视表（详见[pandas.DataFrame.pivot](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.pivot.html)）


```python
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
      <th>rank</th>
      <th>1.0</th>
      <th>2.0</th>
      <th>3.0</th>
      <th>4.0</th>
      <th>5.0</th>
      <th>6.0</th>
      <th>7.0</th>
      <th>8.0</th>
      <th>9.0</th>
      <th>10.0</th>
    </tr>
    <tr>
      <th>tmidx</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1991-09-01</th>
      <td>0.186075</td>
      <td>0.196129</td>
      <td>-0.004902</td>
      <td>-0.024691</td>
      <td>-0.068472</td>
      <td>-0.253968</td>
      <td>-0.123611</td>
      <td>-0.045661</td>
      <td>-0.013889</td>
      <td>0.131735</td>
    </tr>
    <tr>
      <th>1991-10-01</th>
      <td>0.213267</td>
      <td>0.196332</td>
      <td>0.182266</td>
      <td>1.329114</td>
      <td>0.124791</td>
      <td>2.595745</td>
      <td>0.071315</td>
      <td>0.220229</td>
      <td>1.042254</td>
      <td>0.417515</td>
    </tr>
    <tr>
      <th>1991-11-01</th>
      <td>0.209971</td>
      <td>0.183950</td>
      <td>0.148611</td>
      <td>0.173913</td>
      <td>0.178227</td>
      <td>0.005917</td>
      <td>0.136095</td>
      <td>0.196050</td>
      <td>0.462069</td>
      <td>0.108951</td>
    </tr>
    <tr>
      <th>1991-12-01</th>
      <td>0.144783</td>
      <td>0.138614</td>
      <td>0.116082</td>
      <td>0.101852</td>
      <td>0.184293</td>
      <td>0.120588</td>
      <td>0.041667</td>
      <td>0.082801</td>
      <td>0.113208</td>
      <td>0.175486</td>
    </tr>
    <tr>
      <th>1992-01-01</th>
      <td>0.108877</td>
      <td>0.093645</td>
      <td>0.072589</td>
      <td>0.004202</td>
      <td>0.161256</td>
      <td>-0.356955</td>
      <td>0.080000</td>
      <td>0.030387</td>
      <td>0.012712</td>
      <td>0.118184</td>
    </tr>
  </tbody>
</table>
</div>



-------------------

## 3. 分析结果


```python
df['smb'] = df[1]-df[10]
```

计算SMB组合（就是买入size最小的卖出size最大的）收益率~~（目前是不能卖空但是就是看看情况）~~


```python
df = df[(df.index >= '1991-07') & (df.index <= '2018-06')]
```

截取一段时间


```python
for i in range(1,11):
    (stat, p) = stats.ttest_1samp(df[i].values,0,nan_policy = 'omit')
    print("""
Quantile = {}
t-statistic = {}
pvalue = {}""".format(i, stat, p))

(stat, p) = stats.ttest_1samp(df['smb'].values,0,nan_policy = 'omit')
print("""
SMB
t-statistic = {}
pvalue = {}""".format(stat, p))
```

    
    Quantile = 1
    t-statistic = 3.72124764487418
    pvalue = 0.00023399449753634408
        
    
    Quantile = 2
    t-statistic = 3.0975254121202456
    pvalue = 0.0021237432229232562
        
    
    Quantile = 3
    t-statistic = 2.8455766574300876
    pvalue = 0.004718100284720906
        
    
    Quantile = 4
    t-statistic = 2.7145363090899193
    pvalue = 0.006995647888051754
        
    
    Quantile = 5
    t-statistic = 2.508504851260939
    pvalue = 0.012618586188016869
        
    
    Quantile = 6
    t-statistic = 2.1680511448330977
    pvalue = 0.030891510473261607
        
    
    Quantile = 7
    t-statistic = 1.9463135004658156
    pvalue = 0.052489348390464145
        
    
    Quantile = 8
    t-statistic = 2.1079497855772567
    pvalue = 0.035810238077175656
        
    
    Quantile = 9
    t-statistic = 2.5552453906281394
    pvalue = 0.011072038141564072
        
    
    Quantile = 10
    t-statistic = 1.8408585598592682
    pvalue = 0.06656503859324056
        
    
    SMB
    t-statistic = 3.502614037827681
    pvalue = 0.0005260472702248968
    
    

进行t检验（详见[scipy.stats.ttest_1samp](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.ttest_1samp.html)）

---------------------------

## Appendix1

### 组合

*组合*（portfolio），或者说*股票组合*，指投资者持有的证券。可以简单地理解成很多不同公司的股票。

### 收益率

*收益率*（return），或者说*收益*、*回报率*，分为考虑现金红利再投资的个股回报率和不考虑现金红利再投资的个股回报率。本文中个股收益指考虑现金红利再投资的月个股回报率（Mretwd），计算方法为：

$$
r_{i,t} = \frac{P_{i,t}}{P_{i,t-1}}-1
$$

其中$r_{i,t}$为股票i在t月的考虑现金红利再投资的月个股回报率，$P_{i,t}$为股票i在t月的最后一个交易日的日收盘价。

### t检验

本文中的t检验是为了验证这些组合的平均收益率是否显著不等于0。t值越大p值越小，当$p<=a\%$的时候，就可以说在$(1-a)\%$的置信区间上，平均收益率显著不等于0（但是这里并没有用超额收益率所以并不一定能跑赢无风险收益率）。~~超额收益率、无风险收益率就自行搜索引擎吧跟这里关系不大~~

## Appendix2

再次声明，本文**不构成任何形式的投资建议**，只是为了增加一下对概念的理解进行一个模拟操作的讨论。

> 每年六月，按照市值大小划分为十组股票组合（市值从小到大排序，前百分之十为第一组，百分之十到百分之二十为第二组，以此类推）
> 
> 然后这一年七月到下一年六月这一段时间里，就按照这个分组，计算每一个股票组合的收益率（按市值加权）

例如投资市值最小的第一组股票组合，就需要每年六月给所有股票的市值由小到大进行排序，买前百分之十的股票。由于这里是市值加权，所以买入的股票数量正比于该股票的市值权重。注意这里只需要每年调整一次就好了，不需要为了保持市值权重每月调仓，简单地理解就是市值加权随着市场价格浮动，同时持有的股票组合中的权重也是随市场价格浮动的。~~不需要证明的话可以跳过证明部分~~如果需要证明的话$\Rightarrow$

### 证明

假设目标组合中只有A、B两支股票。

#### 在t月

在t月最后一个交易日，相关信息如下：

公司 | A | B 
----- | ----- | -----
股票发行总数 | $$N_A$$ | $$N_B$$
股价 | $$P_{A,t}$$ | $$P_{B,t}$$
市值权重 | $$\frac{N_A \times P_{A, t}}{M_t}$$ | $$\frac{N_B \times P_{B, t}}{M_t}$$

其中$$M_t = N_A \times P_{A,t} + N_B \times P_{B,t}$$

投资者按市值权重买入A、B，假设总资产为$I_t$,则持有A股票数量$$n_A = \frac{N_A \times I_t}{M_t}$$，持有B股票数量$$n_B = \frac{N_B \times I_t}{M_t}$$

#### 在t+1月

在t+1月的最后一个交易日，相关信息变为：

公司 | A | B 
--- | --- | ---
股票发行总数 | $$N_A$$ | $$N_B$$
股价 | $$P_{A,t+1}$$ | $$P_{B,t+1}$$
市值权重 | $$\frac{N_A \times P_{A,t+1}}{M_{t+1}}$$ | $$\frac{N_B \times P_{B,t+1}}{M_{t+1}}$$

其中$$M_{t+1} = N_A \times P_{A,{t+1}} + N_B \times P_{B,{t+1}}$$

此时投资者总资产为$$I_{t+1} = n_A \times P_{A,t+1} + n_B \times P_{B,t+1}$$，其中A股票权重
$$w_A = \frac{n_A \times P_{A,t+1}}{n_A \times P_{A,t+1} + n_B \times P_{B,t+1}}$$

$$w_A = \frac{\frac{N_A \times I_t}{M_t} \times P_{A,t+1}}{\frac{N_A \times I_t}{M_t} \times P_{A,t+1} + \frac{N_B \times I_t}{M_t} \times P_{B,t+1}} $$

$$w_A = \frac{N_A \times P_{A,t+1}}{N_A \times P_{A,{t+1}} + N_B \times P_{B,{t+1}}} $$

所以一直是跟市场的市值权重保持一致的！

## 致谢

最后感谢不愿透露姓名的@liqinyuan1211对本文的proofreading?以及【提出了各种作为可爱萌新的疑惑】帮助本文成为一个新手向应该有的样子。
