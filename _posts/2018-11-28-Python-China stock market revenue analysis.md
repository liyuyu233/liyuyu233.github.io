---
title: 【Python&Investment】中国A股市场年化收益率统计
layout: post
---


- [A股年化收益率统计](#a%E8%82%A1%E5%B9%B4%E5%8C%96%E6%94%B6%E7%9B%8A%E7%8E%87%E7%BB%9F%E8%AE%A1)
  - [方法一：对wind终端导出的数据进行处理](#%E6%96%B9%E6%B3%95%E4%B8%80%E5%AF%B9wind%E7%BB%88%E7%AB%AF%E5%AF%BC%E5%87%BA%E7%9A%84%E6%95%B0%E6%8D%AE%E8%BF%9B%E8%A1%8C%E5%A4%84%E7%90%86)
    - [第一步：下载年化收益率数据](#%E7%AC%AC%E4%B8%80%E6%AD%A5%E4%B8%8B%E8%BD%BD%E5%B9%B4%E5%8C%96%E6%94%B6%E7%9B%8A%E7%8E%87%E6%95%B0%E6%8D%AE)
    - [第二步：找到年化收益率超过百分之三十的公司](#%E7%AC%AC%E4%BA%8C%E6%AD%A5%E6%89%BE%E5%88%B0%E5%B9%B4%E5%8C%96%E6%94%B6%E7%9B%8A%E7%8E%87%E8%B6%85%E8%BF%87%E7%99%BE%E5%88%86%E4%B9%8B%E4%B8%89%E5%8D%81%E7%9A%84%E5%85%AC%E5%8F%B8)
    - [第三步：进行行业分析](#%E7%AC%AC%E4%B8%89%E6%AD%A5%E8%BF%9B%E8%A1%8C%E8%A1%8C%E4%B8%9A%E5%88%86%E6%9E%90)
  - [方法二：下载股价日度数据进行计算（失败了）](#%E6%96%B9%E6%B3%95%E4%BA%8C%E4%B8%8B%E8%BD%BD%E8%82%A1%E4%BB%B7%E6%97%A5%E5%BA%A6%E6%95%B0%E6%8D%AE%E8%BF%9B%E8%A1%8C%E8%AE%A1%E7%AE%97%E5%A4%B1%E8%B4%A5%E4%BA%86)
    - [第一步：下载股价日度数据](#%E7%AC%AC%E4%B8%80%E6%AD%A5%E4%B8%8B%E8%BD%BD%E8%82%A1%E4%BB%B7%E6%97%A5%E5%BA%A6%E6%95%B0%E6%8D%AE)
    - [第二步：一个个计算每年的收益率](#%E7%AC%AC%E4%BA%8C%E6%AD%A5%E4%B8%80%E4%B8%AA%E4%B8%AA%E8%AE%A1%E7%AE%97%E6%AF%8F%E5%B9%B4%E7%9A%84%E6%94%B6%E7%9B%8A%E7%8E%87)
- [A股年化收益率分布](#a%E8%82%A1%E5%B9%B4%E5%8C%96%E6%94%B6%E7%9B%8A%E7%8E%87%E5%88%86%E5%B8%83)

# A股年化收益率统计
主要是找出A股年化收益率连续三年超过百分之三十的股票，并统计其行业分布。
 
## 方法一：对wind终端导出的数据进行处理

### 第一步：下载年化收益率数据

找到一个wind终端，用尝试法疯狂下载。~~也可以直接从同学那里拷贝~~

这个方法可能存在的问题是，wind的计算方法可能没有考虑转股分红之类的事件，只是简单粗暴的用了年收盘价进行计算。  

### 第二步：找到年化收益率超过百分之三十的公司

```
from openpyxl import Workbook
import pandas as pd
df = pd.read_excel("test.xlsx")
wb = Workbook()
ws = wb.active
ws.title = "收益率"
ws["A1"]= '股票代码'

for i in range(18):
    ws["%c1"% (66 + i)].value= 2001 + i

# 顺手算了一个平均年化收益率
i=1
ws["Y1"].value="= AVERAGE(A%d：X%d)" % (i,i)

i=2
while i <= df.max_row:
    df["U%d"% i]="=AVERAGE(C%d:T%d)"%(i,i)

# 检验并记录有多少年超过30%
    index1=[] # 建一个列表
    for j in range(18):
        if df["%c%d" % (67+j, i)].value != None and df["%c%d" % (67+j, i)].value >= 30:
            index1.append('3')
        else:
            index1.append('0')
    j=0 # 开始记录
    while j+2 < len(index1):
        if index1[j]=='3' and index1[j+1]=='3' and index1[j+2]=='3':
            if j+4< len(index1):
                if index1[j+3]=='3' and index1[j+4]=='3':
                    df["V%d"% i ]= "%d~%d"% (2001+j,2001+j+4)
                    j += 2
            else:
                df["V%d"% i]="%d~%d"% (2001+ j, 2001+j+2)
            j += 2
        j += 1

# 输出记录表格
wb.save('test1.xlsx')
```
### 第三步：进行行业分析

将上一步得到的表格用excel筛选出连续多年超过30%的公司，导出为revenue3.csv。下载股票相关信息（[参考网站](http://webapi.cninfo.com.cn/#/dataBrowse)），这里选取了股票代码、证券简称、机构名称、证监会一级行业名称、证监会二级行业名称。

```
from openpyxl import Workbook
import pandas as pd
df1 = pd.read_csv('revenue3.csv',encoding='gb2312')
df2 = pd.read_excel('A股行业信息.xlsx')
wb = Workbook()
ws = wb.active
ws["A1"] = "股票代码"
ws["B1"] = "证券简称"
ws["C1"] = "机构名称"
ws["D1"] = "证监会一级行业名称"
ws["E1"] = "证监会二级行业名称"
ws["F1"] = "年化收益增长率率超过0.3的年份"

i=0
while i < len(df1):

    name=df1.iloc[i][1]
    print("working on",name)
    df3=df2[df2["证券简称"]==name]

    ws["A%d"%(i+2)].value = df1.iloc[i][0]

    j=0
    while j < 4:
        data = df3.iloc[0][j+1]
        ws["%c%d"%((66+j),(i+2))] = data
        j += 1

    ws["F%d"%(i+2)].value = df1.iloc[i][21]

    i +=1

wb.save('行业-年化收益率连年超过0.3.xlsx')

```

接下来的过程基本上就是excel建模法。

## 方法二：下载股价日度数据进行计算（失败了）
### 第一步：下载股价日度数据
代码来源于[CSDN](https://blog.csdn.net/xun527/article/details/79942322)。有改动。

```
import urllib.request

import re
 


stock_CodeUrl = 'http://quote.eastmoney.com/stocklist.html'
 
 


# 获取股票代码列表

def urlTolist(url):

    allCodeList = []

    html = urllib.request.urlopen(url).read()

    html = html.decode('gbk')

    s = r'<li><a target="_blank" href="http://quote.eastmoney.com/\S\S(.*?).html">'

    pat = re.compile(s)

    code = pat.findall(html)

    for item in code:
 
       if item[0] == '6' or item[0] == '3' or item[0] == '0':

            allCodeList.append(item)

    return allCodeList
 
 


allCodelist = urlTolist(stock_CodeUrl)

for code in allCodelist:

    print('正在获取%s股票数据...' % code)

    if code[0] == '6':

        url = 'http://quotes.money.163.com/service/chddata.html?code=0' + code + \
  	 '&end=20181031&fields=TCLOSE;HIGH;LOW;TOPEN;LCLOSE;CHG;PCHG;TURNOVER;VOTURNOVER;VATURNOVER;TCAP;MCAP'
# 这里的end代表结束日期


    else:

        url = 'http://quotes.money.163.com/service/chddata.html?code=1' + code + \
              '&end=20181031&fields=TCLOSE;HIGH;LOW;TOPEN;LCLOSE;CHG;PCHG;TURNOVER;VOTURNOVER;VATURNOVER;TCAP;MCAP'

    urllib.request.urlretrieve(url, 'd:\\all_stock_data\\' + code + '.csv'r)  # 可以加一个参数dowmback显示下载进度


```
可以获得A股股票的日度数据，按照股票代码.csv一个个放着。

### 第二步：一个个计算每年的收益率
需要解释的是，这里的收益率是用每年第一天的开盘价与每年最后一天的收盘价计算的。具体的公式为
$$
年化收益率 = (收盘价-开盘价)/开盘价
$$


但这段代码有两个问题：
* 遍历走到到某一个文件的时候突然无法打开.csv文件
* 选取的每年第一天是固定的（实际上是通过000001进行测试得到的时间点），遇到某些股票处于种种原因没有这一天的情况会造成数据缺失。

所以这种方法被放弃了。
```
import os
data_folder='all_stock_data'
import pandas as pd

# 记录表格
from openpyxl import Workbook
wb = Workbook()
# 记录表格格式
sheet = wb.active
sheet.title = "收益率"
sheet["A1"] = '股票代码'
sheet["B1"] = '名称'
sheet["K1"] = '平均年化收益率'
sheet["L1"] = '连续超过30%的年份'
sheet["M1"] = '连续超过50%的年份'
for i in range(8):
    sheet["%c1"% (67 + i)].value= 2018 - i 
wb.save('test.xlsx')

# 循环模块
i=1 #表格行数
for root, dirs, files in os.walk(data_folder):
    for filename in files:
        file=os.path.splitext(filename)
        filename1,type=file
      
        if type=='.csv':
            fullpath = os.path.join(root,filename)
            # 打开文件
            i += 1 
            df = pd.read_csv(fullpath,encoding='gb2312')
            df1=df[['日期','股票代码','开盘价','收盘价','名称']]
            # 输出并记录代码
            print("working on", df1.iloc[0][4])
            sheet["A%d"% i] = df1.iloc[0][1]
            sheet["B%d"% i] = df1.iloc[0][4]

            # 计算收益率
            if df1[df['日期']=='2018-10-31'].empty == False and df1[df['日期']=='2018-01-02'].empty == False:
                df2 = df1[df['日期'] == '2018-01-02']
                df3 = df1[df['日期']=='2018-10-31']
                begin = df2.iloc[0][2]
                end = df3.iloc[0][3]
                r=(end-begin)/begin
                sheet["C%d"% i].value = r
            if df1[df['日期']=='2017-12-29'].empty == False and df1[df['日期']== '2017-01-03'].empty == False:
                df2 = df1[df['日期'] == '2017-01-03']
                df3 = df1[df['日期']=='2017-12-29']
                begin = df2.iloc[0][2]
                end = df3.iloc[0][3]
                r=(end-begin)/begin
                sheet["D%d"% i].value = r
            if df1[df['日期']=='2016-12-30'].empty == False and df1[df['日期']== '2016-01-04'].empty == False:
                df2 = df1[df['日期'] == '2016-01-04']
                df3 = df1[df['日期']=='2016-12-30']
                begin = df2.iloc[0][2]
                end = df3.iloc[0][3]
                r=(end-begin)/begin
                sheet["E%d"% i].value = r
            if df1[df['日期']=='2015-12-31'].empty == False and df1[df['日期']== '2015-01-05'].empty == False:
                df2 = df1[df['日期'] == '2015-01-05']
                df3 = df1[df['日期']=='2015-12-31']
                begin = df2.iloc[0][2]
                end = df3.iloc[0][3]
                r=(end-begin)/begin
                sheet["F%d"% i].value = r
            if df1[df['日期']=='2014-12-31'].empty == False and df1[df['日期']== '2014-01-02'].empty == False:
                df2 = df1[df['日期'] == '2014-01-02']
                df3 = df1[df['日期']=='2014-12-31']
                begin = df2.iloc[0][2]
                end = df3.iloc[0][3]
                r=(end-begin)/begin
                sheet["G%d"% i].value = r
            if df1[df['日期']=='2013-12-31'].empty == False and df1[df['日期']== '2013-01-04'].empty == False:
                df2 = df1[df['日期'] == '2013-01-04']
                df3 = df1[df['日期']=='2013-12-31']
                begin = df2.iloc[0][2]
                end = df3.iloc[0][3]
                r=(end-begin)/begin
                sheet["H%d"% i].value = r
            if df1[df['日期']=='2012-12-31'].empty == False and df1[df['日期']==  '2012-01-04'].empty == False:
                df2 = df1[df['日期'] ==  '2012-01-04']
                df3 = df1[df['日期']=='2012-12-31']
                begin = df2.iloc[0][2]
                end = df3.iloc[0][3]
                r=(end-begin)/begin
                sheet["I%d"% i].value = r
            if df1[df['日期']=='2011-12-30'].empty == False and df1[df['日期']== '2011-01-04'].empty == False:
                df2 = df1[df['日期'] == '2011-01-04']
                df3 = df1[df['日期']== '2011-12-30']
                begin = df2.iloc[0][2]
                end = df3.iloc[0][3]
                r=(end-begin)/begin
                sheet["J%d"% i].value = r

            # 计算平均年化收益率
            sheet["K%d"% i].value="=AVERAGE(A%d：J%d)"% (i,i)

            # 检验并记录有多少年超过30%
            index1=[] # 建一个列表
            for j in range(8):
                if sheet["%c%d" % (67+j, i)].value != None and sheet["%c%d" % (67+j, i)].value >= 0.3:
                    index1.append('3')
                else:
                    index1.append('0')
            j=0 # 开始记录
            while j+2 < len(index1):
                if index1[j]=='3' and index1[j+1]=='3' and index1[j+2]=='3':
                    if j+4< len(index1):
                        if index1[j+3]=='3' and index1[j+4]=='3':
                            sheet["L%d"% i ]= "%d~%d"% (2018-j-4,2018-j)
                            j += 2
                    else:
                        sheet["L%d"% i]="%d~%d"% (2018-j-2,2018-j)
                    j += 2
                j += 1

             # 检验并记录有多少年超过50%
            index2=[] # 建一个列表
            for j in range(8):
                if sheet["%c%d" % (67+j, i)].value != None and sheet["%c%d" % (67+j, i)].value >= 0.5:
                    index2.append('5')
                else:
                    index2.append('0')
            j=0 # 开始记录
            while j+2 < len(index2):
                if index2[j]=='5' and index2[j+1]=='5' and index2[j+2]=='5':
                    if j+4< len(index2):
                        if index2[j+3]=='5' and index2[j+4]=='5':
                            sheet["M%d"% i ]= "%d~%d"% (2018-j-4,2018-j)                        
                            j += 2
                    else:
                        sheet["M%d"% i]="%d~%d"% (2018-j-2,2018-j)
                    j += 2
                j += 1

```
# A股年化收益率分布

利用上一部分顺手算的平均年化收益率，可以统计其年化收益率区间分布。

```
from openpyxl import Workbook
import pandas as pd
df = pd.read_excel("test1.xlsx")
wb = Workbook()
ws = wb.active
ws["A1"] = "区间"
ws["A2"] = "小于-100%"
ws["A3"] = "[-100%,-90%)"
ws["A4"] = "[-90%,-80%)"
ws["A5"] = "[-80%,-70%)"
ws["A6"] = "[-70%,-60%)"
ws["A7"] = "[-60%,-50%)"
ws["A8"] = "[-50%,-40%)"
ws["A9"] = "[-40%,-30%)"
ws["A10"] = "[-30%,-20%)"
ws["A11"] = "[-20%,-10%)"
ws["A12"] = "[-10%,0)"
ws["A13"] = "[0,10%)"
ws["A14"] = "[10,20%)"
ws["A15"] = "[20,30%)"
ws["A16"] = "[30,40%)"
ws["A17"] = "[40,50%)"
ws["A18"] = "[50,60%)"
ws["A19"] = "[60,70%)"
ws["A20"] = "[70,80%)"
ws["A21"] = "[80,90%)"
ws["A22"] = "[90,100%)"
ws["A23"] = "大于100%"

i=0

while i < 3561:
    print('working on',df.iloc[i][1] )
    r=df.iloc[i][20]
    if r< -100:
        ws["B2"].value += 1
    if -100<=r<-90:
        ws["B4"].value += 1
    if -90<=r<-80:
        ws["B5"].value += 1
    if -80<=r<-70:
        ws["B6"].value += 1
    if -70<=r<-60:
        ws["B7"].value += 1
    if -60<=r<-50:
        ws["B8"].value += 1
    if -50<=r<-40:
        ws["B9"].value += 1
    if -40<=r<-30:
        ws["B10"].value += 1
    if -30<=r<-20:
        ws["B11"].value += 1
    if -20<=r<-10:
        ws["B12"].value += 1
    if -10<=r<0:
        ws["B13"].value += 1
    if 0<=r<10:
        ws["B14"].value += 1
    if 10<=r<20:
        ws["B15"].value += 1
    if 20<=r<30:
        ws["B16"].value += 1
    if 30<=r<40:
        ws["B17"].value += 1
    if 40<=r<50:
        ws["B18"].value += 1
    if 50<=r<60:
        ws["B19"].value += 1
    if 60<=r<70:
        ws["B20"].value += 1
    if 70<=r<80:
        ws["B21"].value += 1
    if 80<=r<90:
        ws["B22"].value += 1
    if 90<=r<100:
        ws["B23"].value += 1
    if r>100:
        ws["B3"].value += 1
    i+=1

# 输出记录表格
wb.save('年化收益率分布.xlsx')
```

最后用excel画个好看的表就行。