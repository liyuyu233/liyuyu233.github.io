---
title: 【Python】构建市场组合
layout: post
---

步骤：

1. 读取数据
2. 整理数据
3. 加权平均

使用到的数据：

字段名称 | 中文名称
--- | ---
Stkcd | 证券代码
Trdmnt | 交易月份
Mopnprc | 月开盘价
Mclsprc | 月收盘价
Msmvosd | 月个股流通市值
Mretwd | 考虑现金红利再投资的月个股回报率

## 导入包


```python
import pandas as pd
import numpy as np
```

`pandas`：详见[pandas](https://pandas.pydata.org/)

[pandas与Stata的比较](https://pandas.pydata.org/docs/getting_started/comparison/comparison_with_stata.html)

`numpy`：详见[numpy](https://numpy.org/)

## 读取数据


```python
datafile = "C:/Users/Administrator/Desktop/TRD_Mnth.txt"
data = pd.read_csv(datafile, sep='\t', encoding='gb2312', skiprows=[1,2])
```

* `datafile`：文件
* `sep='\t'`：分隔符为`'\t'`
* `encoding='gb2312'`：编码方式为gb2312
* `skiprows=[1,2]`：跳过第1、2行
* 详见[pd.read_csv](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_csv.html)


```python
data.head(4)# 显示前4行
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
      <th>Ahshrtrd_M</th>
      <th>Ahvaltrd_M</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>1991-04</td>
      <td>3</td>
      <td>49.00</td>
      <td>30</td>
      <td>43.68</td>
      <td>13400</td>
      <td>615000.0</td>
      <td>1157520.00</td>
      <td>2118487.47</td>
      <td>20</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>4</td>
      <td>1991-04-03</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>1</th>
      <td>3</td>
      <td>1991-07</td>
      <td>3</td>
      <td>7.10</td>
      <td>31</td>
      <td>5.20</td>
      <td>4676000</td>
      <td>24964075.0</td>
      <td>125547.62</td>
      <td>222124.92</td>
      <td>25</td>
      <td>NaN</td>
      <td>NaN</td>
      <td>4</td>
      <td>1991-07-03</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>1991-08</td>
      <td>1</td>
      <td>5.15</td>
      <td>31</td>
      <td>4.95</td>
      <td>2790000</td>
      <td>14240100.0</td>
      <td>119511.68</td>
      <td>211445.83</td>
      <td>27</td>
      <td>-0.048077</td>
      <td>-0.048077</td>
      <td>4</td>
      <td>1991-07-03</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>3</th>
      <td>3</td>
      <td>1991-09</td>
      <td>2</td>
      <td>4.90</td>
      <td>29</td>
      <td>4.70</td>
      <td>4339500</td>
      <td>19773650.0</td>
      <td>113475.74</td>
      <td>200766.75</td>
      <td>25</td>
      <td>-0.050505</td>
      <td>-0.050505</td>
      <td>4</td>
      <td>1991-07-03</td>
      <td>NaN</td>
      <td>NaN</td>
    </tr>
  </tbody>
</table>
</div>



## 整理数据

* 筛选股票：选出A股市场数据
* 筛选时间：选出2019-12之前的数据
* 处理缺失值

### 筛选股票


```python
# 1=SH.A, 2=SH.B, 4=SZ.A, 8=SZ.B, 16=SZ.创业板
data = data[data.Markettype.isin([1, 4, 16])]
```

`data.Markettype`：选取data中的Markettype列

`Series.isin(values)`：检查Series中的值是否在values当中（详见[pd.Series.isin](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.isin.html)）

`data[data.Markettype.isin([1, 4, 16])]`：选取data中Markettype为1,4,16的行（详见[indexing#indexing with isin](https://pandas.pydata.org/pandas-docs/stable/user_guide/indexing.html#indexing-with-isin)）

### 筛选时间


```python
data['tmidx'] = pd.to_datetime(data.Trdmnt)
```

`pd.to_datetime(data.Trdmnt)`：将data中Trdmnt列的数据转换为datetime格式（详见[pd.to_datetime](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.to_datetime.html)）

`data['tmidx'] = Series`：在data中建立tmidx列，列的值为Series


```python
data = data[data.tmidx <= '2019-12']
```

选取data中tmidx在2019年12月之前的数据

### 处理缺失值


```python
data = data[['Stkcd', 'tmidx', 'Mopnprc', 'Mclsprc', 'Msmvosd', 'Mretwd']]
print('处理前数据量：',len(data))
data = data.dropna()
print('处理后数据量：',len(data))
```

    处理前数据量： 514915
    处理后数据量： 511112


`data[['Stkcd', 'tmidx', 'Mopnprc', 'Mclsprc', 'Msmvosd', 'Mretwd']]`：选取data的Stkcd, tmidx, Mopnprc, Mclsprc, Msmvosd, Mretwd列（详见[indexing#basics](https://pandas.pydata.org/pandas-docs/stable/user_guide/indexing.html#basics)）

## 加权平均

* 计算权重
* 进行加权

### 计算权重

1. 使用上个交易月的流通市值（Msmvosd1）进行加权
2. 如果Msmvosd1缺失，则使用$\text{Msmvosd}/\text{Mclsprc}*\text{Mopnprc}$对缺失值进行估计
3. t月的个股权重为t-1月个股流通市值占t-1月所有A股总流通市值的比例

#### 上个交易月的流通市值


```python
data = data.sort_values(['Stkcd','tmidx'])
data['msmvosd1'] = data.groupby('Stkcd').Msmvosd.shift(1)
```

`data.sort_values(['Stkcd','tmidx'])`：根据Stkcd与tmidx进行排序（详见[pd.DataFrame.sort_values](https://pandas.pydata.org/pandas-docs/version/0.19/generated/pandas.DataFrame.sort_values.html)）

`data.groupby('Stkcd')`：根据Stkcd分组（详见[pd.DataFrame.groupby](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.groupby.html)）

`data.groupby('Stkcd').Msmvosd.shift(1)`：对于每一组Stkcd，将其中的Msmvosd进行一阶滞后（详见[pd.DataFrame.shift](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.shift.html)）

p.s. 这里实际上使用的是上个交易月的数据进行加权。但是考虑到如果停牌的话实际上也买不了，所以应该在上一步不drop缺失值，而是在这一步之后drop（不考虑进这个月的组合）


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
      <th>tmidx</th>
      <th>Mopnprc</th>
      <th>Mclsprc</th>
      <th>Msmvosd</th>
      <th>Mretwd</th>
      <th>msmvosd1</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>169348</th>
      <td>1</td>
      <td>1991-05-01</td>
      <td>43.46</td>
      <td>38.34</td>
      <td>1016010.00</td>
      <td>-0.122253</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>169349</th>
      <td>1</td>
      <td>1991-06-01</td>
      <td>38.53</td>
      <td>33.99</td>
      <td>900735.00</td>
      <td>-0.113459</td>
      <td>1016010.00</td>
    </tr>
    <tr>
      <th>169350</th>
      <td>1</td>
      <td>1991-07-01</td>
      <td>33.65</td>
      <td>29.54</td>
      <td>782810.00</td>
      <td>-0.130921</td>
      <td>900735.00</td>
    </tr>
    <tr>
      <th>301445</th>
      <td>1</td>
      <td>1991-08-01</td>
      <td>29.39</td>
      <td>15.00</td>
      <td>674833.82</td>
      <td>-0.411588</td>
      <td>782810.00</td>
    </tr>
    <tr>
      <th>301446</th>
      <td>1</td>
      <td>1991-09-01</td>
      <td>15.00</td>
      <td>14.50</td>
      <td>652339.35</td>
      <td>-0.033333</td>
      <td>674833.82</td>
    </tr>
  </tbody>
</table>
</div>




```python
data2 = data[data.msmvosd1.isna()].copy()
data2['msmvosd1'] = data2.Msmvosd/data2.Mclsprc*data2.Mopnprc

data.loc[data.msmvosd1.isna(),'msmvosd1'] = data2.msmvosd1
```

处理缺失值。

`data2 = data[data.msmvosd1.isna()].copy()`：找出并复制data中所有msmvosd1缺失的行（详见[pd.DataFrame.isna](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.isna.html)）

`data.loc[data.msmvosd1.isna(),'msmvosd1'] = data2.msmvosd1`：对data中msmvosd1为缺失值的所有行，将它们的msmvod1赋值为data2的msmvosd1（详见[pd.DataFrame.loc](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.loc.html)）

p.s.与上一个p.s.中提及的问题一样，如果上个月停牌/没有发行的话，实际上是在上个月底进行无法买卖的。所以这里应该直接drop会比较好。

#### 加权


```python
def retwosd(x):
    x['retwosd'] = sum(x.Mretwd*x.msmvosd1)/sum(x.msmvosd1)
    return x

data = data.groupby('tmidx').apply(lambda x: retwosd(x))
```

对于`data.groupby('tmidx')`分出来的组，每一组分别计算加权平均：
$$
\text{retwosd}_t = \frac{\sum_{i = 1}^{n_t}\text{Mretwd}_{i,t} \times \text{msmvosd1}_{i,t}}{\sum_{i = 1}^{n_t}\text{msmvosd1}_{i,t}}
$$

`data.groupby('tmidx').apply(lambda x: retwosd(x))`：对按tmidx分出来的每一组数据x，执行retwosd(x)函数。详见[pd.DataFrame.apply](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.apply.html)


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
      <th>tmidx</th>
      <th>Mopnprc</th>
      <th>Mclsprc</th>
      <th>Msmvosd</th>
      <th>Mretwd</th>
      <th>msmvosd1</th>
      <th>retwosd</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>169348</th>
      <td>1</td>
      <td>1991-05-01</td>
      <td>43.46</td>
      <td>38.34</td>
      <td>1016010.00</td>
      <td>-0.122253</td>
      <td>1151690.00</td>
      <td>-0.074411</td>
    </tr>
    <tr>
      <th>169349</th>
      <td>1</td>
      <td>1991-06-01</td>
      <td>38.53</td>
      <td>33.99</td>
      <td>900735.00</td>
      <td>-0.113459</td>
      <td>1016010.00</td>
      <td>-0.079348</td>
    </tr>
    <tr>
      <th>169350</th>
      <td>1</td>
      <td>1991-07-01</td>
      <td>33.65</td>
      <td>29.54</td>
      <td>782810.00</td>
      <td>-0.130921</td>
      <td>900735.00</td>
      <td>-0.081504</td>
    </tr>
    <tr>
      <th>301445</th>
      <td>1</td>
      <td>1991-08-01</td>
      <td>29.39</td>
      <td>15.00</td>
      <td>674833.82</td>
      <td>-0.411588</td>
      <td>782810.00</td>
      <td>-0.084203</td>
    </tr>
    <tr>
      <th>301446</th>
      <td>1</td>
      <td>1991-09-01</td>
      <td>15.00</td>
      <td>14.50</td>
      <td>652339.35</td>
      <td>-0.033333</td>
      <td>674833.82</td>
      <td>-0.024954</td>
    </tr>
  </tbody>
</table>
</div>



## 整理保存


```python
data = data[['tmidx','retwosd']]
data = data.sort_values('tmidx')
data = data.drop_duplicates(['tmidx'])
```

`data.drop_duplicates(['tmidx'])`：去掉data中tmidx重复的行（详见[pd.DataFrame.drop_duplicates](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.drop_duplicates.html)）


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
      <th>tmidx</th>
      <th>retwosd</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>268331</th>
      <td>1991-01-01</td>
      <td>0.029997</td>
    </tr>
    <tr>
      <th>165573</th>
      <td>1991-02-01</td>
      <td>0.010093</td>
    </tr>
    <tr>
      <th>116556</th>
      <td>1991-03-01</td>
      <td>-0.099663</td>
    </tr>
    <tr>
      <th>165723</th>
      <td>1991-04-01</td>
      <td>-0.079652</td>
    </tr>
    <tr>
      <th>165919</th>
      <td>1991-05-01</td>
      <td>-0.074411</td>
    </tr>
  </tbody>
</table>
</div>




```python
data.to_csv('mMktRet.csv', index=False)
```

将data保存为文本格式的文件，命名为mMktRet.csv（详见[pd.DataFrame.to_csv](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.to_csv.html)）
