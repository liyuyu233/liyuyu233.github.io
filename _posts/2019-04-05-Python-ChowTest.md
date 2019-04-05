---
title: 【Python】邹至庄检验
layout: post
---

这里做的是股市晴雨表效应，研究了全球的一些国家。这里的邹至庄检验是为了研究危机前后晴雨表效应是否发生了变化。

# 邹至庄检验

## 简介

根据维基百科：

> 邹检验（英语：Chow test）是一种统计和计量经济的检验。它可以测试两组不同数据的线性回归系数是否相等。在时间序列分析中，邹检验被普遍地用来检验结构性变化是否存在。邹检验是由经济学家邹至庄于1960年发明的。


这里分别对滞后一阶、二阶、三阶、四阶进行回归。先回归了约束模型：$Y=\beta X+\epsilon$，得到残差平方和SSR_r，再回归了无约束模型$Y=\beta_1 X_1+ \epsilon_1$和$Y=\beta_2 X_2+ \epsilon_2$得到残差平方和SSR_1，SSR_2,其中$X_1=(x_1,\cdots,x_t)^T$,$X_2=(x_{t+1},\cdots,x_n)^T$，t是截点（危机发生）。在这里选择的t是2007Q4。再根据公式:

$$
F=\frac{[SSR_r-(SSR_1+SSR_2)]}{SSR_1+SSR_2} \times \frac{n-2k}{k}
$$

计算得到F值，从而得到相应的p值。

回归结果显著（p<0.01）国家如下：

滞后阶数 | 国家
--- | ---
一阶 | Germany,Switherland
二阶 | United States
三阶 | Belgium, France, Italy, Netherlands, Sweden, Philippines
四阶 | Korea, Republic of

## 代码


```python
"""
整理数据·约束模型
"""

import pandas as pd
import numpy as np

#读取数据
index=pd.read_excel('0 change_rate_r.xlsx')
gdp=pd.read_excel('0 GDP增长率.xlsx')

# 国家名单
list1 =['Australia','Belgium','Denmark','Finland','France','Germany','Greece','Iceland','Ireland','Israel','Italy','Japan','Korea, Republic of','Netherlands','New Zealand','Norway','Portugal','Singapore','Spain','Sweden','Switzerland','United Kingdom','Argentina','Brazil','Chile','Malaysia','Mexico','South Africa','Uruguay','Colombia','Ecuador','Indonesia','Morocco','Philippines','Thailand','Turkey','India','China','Canada','United States']


for i in list1:
    # 选出某一国家的数据
    x=index[index.country==i]
    y=gdp[gdp.country==i]

    x=x.iloc[:,1:]
    x=np.array(x)
    x=x[0]

    # 建立新的表格存储数据
    data1 = np.zeros((len(index.T)-1,5))
    df_ = pd.DataFrame(data1,columns=["index","t+1","t+2","t+3","t+4"])
    df_['index']=pd.Series(x)# 将市场回报率存储在index列

    for j in range(1,5):
        t=y.iloc[:,5+j:]# 滞后j期的数据存在t+j列
        t=np.array(t)
        t=t[0]
        df_['t+'+str(j)]=pd.Series(t)

    # 保存数据
    writer = pd.ExcelWriter(str(i)+'.xlsx')
    df_.to_excel(writer,index=False)
    writer.save()

"""
整理数据·无约束模型
"""

# 截取某段时间的数值，其他时间取为0
import pandas as pd
import numpy as np

index=pd.read_excel('0 change_rate_r.xlsx')
gdp=pd.read_excel('0 GDP增长率.xlsx')

list1 =['Australia','Belgium','Denmark','Finland','France','Germany','Greece','Iceland','Ireland','Israel','Italy','Japan','Korea, Republic of','Netherlands','New Zealand','Norway','Portugal','Singapore','Spain','Sweden','Switzerland','United Kingdom','Argentina','Brazil','Chile','Malaysia','Mexico','South Africa','Uruguay','Colombia','Ecuador','Indonesia','Morocco','Philippines','Thailand','Turkey','India','China','Canada','United States']

def reform(x,y,start,end):
    x=x.iloc[:,start:end]
    x=np.array(x)
    x=x[0]

    data1 = np.zeros((len(index.T)-1,5))
    df= pd.DataFrame(data1,columns=["index","t+1","t+2","t+3","t+4"])
    df['index']=pd.Series(x)
    for j in range(1,5):
        if end+5+j>117:
            t=y.iloc[:,start+5+j:]
        else:
            t=y.iloc[:,start+5+j:end+5+j]#从1991Q1+i开始
        t=np.array(t)
        t=t[0]
        df['t+'+str(j)]=pd.Series(t)
    return df

def save(df,i,k):
    writer = pd.ExcelWriter(str(i)+'_'+str(k)+'.xlsx')
    df.to_excel(writer,index=False)
    writer.save()
        
for i in list1:
    print(i)
    x=index[index.country==i]
    y=gdp[gdp.country==i]

def Reform(breakpoint):
    for i in list1:
        print(i)
        x=index[index.country==i]
        y=gdp[gdp.country==i]

        for k in range(1,3):
            if k == 1:
                df=reform(x,y,1,breakpoint)
            if k == 2:
                df=reform(x,y,breakpoint,len(x.T))

            save(df,i,k)

# 以2007Q4为截点
Reform(72)

"""
进行有约束回归，无约束回归，得到Chow检验统计量
"""

wb = Workbook()
ws = wb.active
list1 =['Australia','Belgium','Denmark','Finland','France','Germany','Greece','Iceland','Ireland','Israel','Italy','Japan','Korea, Republic of','Netherlands','New Zealand','Norway','Portugal','Singapore','Spain','Sweden','Switzerland','United Kingdom','Argentina','Brazil','Chile','Malaysia','Mexico','South Africa','Uruguay','Ecuador','Indonesia','Morocco','Philippines','Thailand','Turkey','India','China','Canada','United States']
for i in range(1,len(list1)+1):
    ws.cell(row=i+1, column=1).value=list1[i-1]

for k in range(4):
    for i in range(1,3):
        ws.cell(row=1,column=k*10+i*3-1).value=str(k+1)+':beta'+str(i)
        ws.cell(row=1,column=k*10+i*3).value=str(k+1)+':t'+str(i)
        ws.cell(row=1,column=k*10+i*3+1).value=str(k+1)+':std'+str(i)
    ws.cell(row=1,column=k*10+8).value=str(k+1)+':Chow_p(>F)'
    ws.cell(row=1,column=k*10+9).value=str(k+1)+':beta'
    ws.cell(row=1,column=k*10+10).value=str(k+1)+':R2'
    ws.cell(row=1,column=k*10+11).value=str(k+1)+':std'

# 回归
def regression(data,i):
    x=np.array(data[['index']])
    t=np.array(data[['t+'+str(i)]])
    X=sm.add_constant(x)
    model=sm.OLS(t,X)
    fit = model.fit()
    return fit

# 循环，回归，并计算Chow检验统计量
for c in range(len(list1)):
    i=list1[c]
    print(i)

    data=pd.read_excel(str(i)+'.xlsx')
    data1=pd.read_excel(str(i)+'_'+str(1)+'.xlsx')
    data2=pd.read_excel(+str(i)+'_'+str(2)+'.xlsx')

    data = data.dropna()
    data1 = data1.dropna()
    data2 = data2.dropna()

    for k in range(1,5):

        fit=regression(data,k)
        ws.cell(row=c+2,column=(k-1)*10+9).value=fit.params[1]
        ws.cell(row=c+2,column=(k-1)*10+10).value=fit.rsquared
        ws.cell(row=c+2,column=(k-1)*10+11).value=fit.bse[1]

        indicator=0

        try:
            fit1=regression(data1,k)
            ws.cell(row=c+2,column=(k-1)*10+3-1).value=fit1.params[1]
            ws.cell(row=c+2,column=(k-1)*10+3).value=fit1.pvalues[1]
            ws.cell(row=c+2,column=(k-1)*10+3+1).value=fit1.bse[1]

        except ValueError:
            indicator=1

        try:
            fit2=regression(data2,k)
            ws.cell(row=c+2,column=(k-1)*10+6-1).value=fit2.params[1]
            ws.cell(row=c+2,column=(k-1)*10+6).value=fit2.pvalues[1]
            ws.cell(row=c+2,column=(k-1)*10+6+1).value=fit2.bse[1]
        except ValueError:
            indicator=1

        if indicator==0:
            SSR_r=fit.ssr
            SSR_u=fit1.ssr+fit2.ssr
            Chow_Fvalue=(SSR_r-SSR_u)*(len(data)-2)/SSR_u
            Chow_f_pvalue=f.sf(Chow_Fvalue,1,(len(data)-2))

            ws.cell(row=c+2,column=(k-1)*10+8).value=Chow_f_pvalue

wb.save('test1.xlsx')

```
