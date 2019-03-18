---
title: 【API&Python】世界银行数据下载
layout: post
---

作业需要，从世界银行World Development Indicators [WDI)数据库下载1990年至2018年export ratio, import ratio, household consumption, government expenditure 以及 gdp per capita。

由于WDI的QUERY界面体验太差，所以需要用到API来观察数据库中的指标，选定指标后下载所需的数据，再用Python筛选所需国家。

## 第一步：打开世界银行WDI数据库及API帮助文档

1. 搜索world bank，打开结果中的[world bank open data](https://data.worldbank.org/)，再打开网页上的，中的链接[WDI](http://datatopics.worldbank.org/world-development-indicators/)。Acess Data中有三个选项，第一个Open data & data bank里的链接指向令人绝望的Query界面，有兴趣可以尝试[Open data](https://databank.worldbank.org/data/source/world-development-indicators)。第二个选项Bulk downloads含有数据库的csv以及xlsx版本的下载链接，我尝试了一个晚上发现都下不下来（然而IMF的Bulk downloads就可以选择指标，时间段以及国家，非常好用），有兴趣可以尝试[Excel download](http://databank.worldbank.org/data/download/WDI_excel.zip)，作为对比也附上IMF的[Bulk download]()。

2. 点击链接[API documentation](https://datahelpdesk.worldbank.org/knowledgebase/topics/125589-developer-information)
   1. 打开[API Basic Call Structures](https://datahelpdesk.worldbank.org/knowledgebase/articles/898581-api-basic-call-structures)，基本上绝大部分问题都能够在这里找到答案，比如怎样限定数据的年份，国家，下载的格式之类的。
   2. 打开[Indicator API Queries](https://datahelpdesk.worldbank.org/knowledgebase/articles/898599-indicator-api-queries)，其中提供了查询所有指标的链接[ http://api.worldbank.org/v2/indicator]( http://api.worldbank.org/v2/indicator)

## 第二步，研究API帮助文档，搜索所需指标

1. 发现WDI作为数据库id=2（这个是在world bank里面直接搜索World Development Indicators然后筛选出data看到的[World Development Indicators (WDI) | Data Catalog](https://datacatalog.worldbank.org/dataset/world-development-indicators)，里面overview写的Harvest Source ID: 2），所以确定参数之一source=2。（以及这里同样写了Update Frequency: Quarterly但是我的经验是一限定Q就找不到任何东西)

2. 按照[Indicator API Queries](https://datahelpdesk.worldbank.org/knowledgebase/articles/898599-indicator-api-queries)的指导，打开[https://api.worldbank.org/v2/source/2/indicator?per_page=2000](https://api.worldbank.org/v2/source/2/indicator?topic=3&per_page=2000)观察WDI中的所有指标（其中，per_page限定每页显示的结果条数。为了方便ctrl-F查找，根据结果第一行的total=“”可以进行调整（当然修改page也行就是找起来麻烦））。

3. 按Ctrl+F，输入需要查的关键词，不断回车直到找到满意的指标。如输入gdp per capita，找到指标GDP per capita, PPP (constant 2011 international $)，获得其id：`<wb:indicator id="NY.GDP.PCAP.PP.KD"> `，有兴趣也可以关注一下
   ```
   <wb:sourceNote>
    GDP per capita based on purchasing power parity [PPP). PPP GDP is gross domestic product converted to international dollars using purchasing power parity rates. An international dollar has the same purchasing power over GDP as the U.S. dollar has in the United States. GDP at purchaser's prices is the sum of gross value added by all resident producers in the economy plus any product taxes and minus any subsidies not included in the value of the products. It is calculated without making deductions for depreciation of fabricated assets or for depletion and degradation of natural resources. Data are in constant 2011 international dollars.
    </wb:sourceNote>
    ```
   
## 第三步，下载数据

按照[API documentation](https://datahelpdesk.worldbank.org/knowledgebase/topics/125589-developer-information)的指导，打开[https://api.worldbank.org/v2/country/all/indicator/NY.GDP.PCAP.PP.KD?date=1990:2018&source=2&downloadformat=excel](https://api.worldbank.org/v2/country/all/indicator/NY.GDP.PCAP.PP.KD?date=1990:2018&source=2&downloadformat=excel)下载xlsx数据

## 第四步，筛选数据

1. 打开下载下来的数据，把中间的有效部分复制到新的data.xlsx文件中（保留原始数据文件以防概率很高的bug），把Country Name改成country（筛选要用，懒得思考怎么包含空格）

2. 敲代码进行筛选（一个个手动戳也行就是比较麻烦）
   ```
    df_=pd.read_excel('data.xlsx')
    df_.head()

    df2=df_(df_.country=='') #建立新的dataframe

    # 需要保留的国家名单
    list3 =['Australia','Belgium','Denmark','Finland','France','Germany','Greece','Iceland','Ireland','Israel','Italy','Japan','Korea, Rep.','Netherlands','New Zealand','Norway','Portugal','Singapore','Spain','Sweden','Switzerland','United Kingdom','Argentina','Brazil','Chile','Malaysia','Mexico','South Africa','Uruguay','Colombia','Ecuador','Indonesia','Morocco','Philippines','Thailand','Turkey','India','China','Canada','United States']

    # 筛选
    for i in list3:
        df1=df_[df_.country==i]
        print(df1)
        df2=df2.append(df1,ignore_index=True)
    
    # 保存
    writer = pd.ExcelWriter('/path/data1.xlsx')
    df2.to_excel(writer)# 担心中文乱码请在括号中加上,encoding='gb2332'
    writer.save()
   ```

3. 再用excel修修整整大概就能用了吧。