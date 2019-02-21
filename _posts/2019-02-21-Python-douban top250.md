---
title: 【Python】豆瓣电影Top250
layout: post
---

爬虫，豆瓣电影Top250，代码及结果

- [代码](#%E4%BB%A3%E7%A0%81)
- [结果输出](#%E7%BB%93%E6%9E%9C%E8%BE%93%E5%87%BA)

## 代码
```python
import requests
from bs4 import BeautifulSoup
#需要爬取的网页链接，一共有十个，每个有25部电影
url_list=[]
for i in range(10):
    url = 'https://movie.douban.com/top250?start={}&filter='.format(i*25)
    url_list.append(url)

info = []

#开始爬
for URL in url_list:
    re = requests.get(URL)
    soup = BeautifulSoup(re.text,'html.parser')
    Tags = soup.find('ol',class_='grid_view')
    Tags = Tags.find_all('li')
    for Tag in Tags:
        name = Tag.find('div',class_='hd')
        name = name.text
        name = name[2:-1]#去掉前面的两个\n和最后的一个\n
        name = ' '.join(name.split())#去掉结果中的\xa0
        rank = Tag.find('div',class_='pic')
        url = rank.find('a')
        url = url['href']
        rank = rank.find('em')
        rank = rank.text
        rating = Tag.find('span',class_='rating_num')
        rating = rating.text
        quote = Tag.find('p',class_='quote')
        try:
            quote = quote.text
            info.append('{} [{}]({}) {} “{}”\n\n'.format(rank,name,url,rating,quote))
        except AttributeError:#有的片子没有推荐语
            info.append('{} [{}]({}) {} \n\n'.format(rank,name,url,rating))
            

with open('C:/Users/Administrator/Desktop/douban.md','w',encoding = 'utf-8') as file1:
    for i in info:
        file1.write(i)

```

## 结果输出
1 [肖申克的救赎 / The Shawshank Redemption / 月黑高飞(港) / 刺激1995(台) [可播放]](https://movie.douban.com/subject/1292052/) 9.6 “
希望让人自由。
”

2 [霸王别姬 / 再见，我的妾 / Farewell My Concubine [可播放]](https://movie.douban.com/subject/1291546/) 9.6 “
风华绝代。
”

3 [这个杀手不太冷 / Léon / 杀手莱昂 / 终极追杀令(台) [可播放]](https://movie.douban.com/subject/1295644/) 9.4 “
怪蜀黍和小萝莉不得不说的故事。
”

4 [阿甘正传 / Forrest Gump / 福雷斯特·冈普 [可播放]](https://movie.douban.com/subject/1292720/) 9.4 “
一部美国近现代史。
”

5 [美丽人生 / La vita è bella / 一个快乐的传说(港) / Life Is Beautiful [可播放]](https://movie.douban.com/subject/1292063/) 9.5 “
最美的谎言。
”

6 [泰坦尼克号 / Titanic / 铁达尼号(港 / 台) [可播放]](https://movie.douban.com/subject/1292722/) 9.3 “
失去的才是永恒的。 
”

7 [千与千寻 / 千と千尋の神隠し / 神隐少女(台) / Spirited Away](https://movie.douban.com/subject/1291561/) 9.3 “
最好的宫崎骏，最好的久石让。 
”

8 [辛德勒的名单 / Schindler's List / 舒特拉的名单(港) / 辛德勒名单 [可播放]](https://movie.douban.com/subject/1295124/) 9.5 “
拯救一个人，就是拯救整个世界。
”

9 [盗梦空间 / Inception / 潜行凶间(港) / 全面启动(台) [可播放]](https://movie.douban.com/subject/3541415/) 9.3 “
诺兰给了我们一场无法盗取的梦。
”

10 [忠犬八公的故事 / Hachi: A Dog's Tale / 忠犬小八(台) / 秋田犬八千(港) [可播放]](https://movie.douban.com/subject/3011091/) 9.3 “
永远都不能忘记你所爱的人。
”

11 [机器人总动员 / WALL·E / 瓦力(台) / 太空奇兵·威E(港) [可播放]](https://movie.douban.com/subject/2131459/) 9.3 “
小瓦力，大人生。
”

12 [三傻大闹宝莱坞 / 3 Idiots / 三个傻瓜(台) / 作死不离3兄弟(港)](https://movie.douban.com/subject/3793023/) 9.2 “
英俊版憨豆，高情商版谢耳朵。
”

13 [海上钢琴师 / La leggenda del pianista sull'oceano / 声光伴我飞(港) / 一九零零的传奇 [可播放]](https://movie.douban.com/subject/1292001/) 9.2 “
每个人都要走一条自己坚定了的路，就算是粉身碎骨。 
”

14 [放牛班的春天 / Les choristes / 歌声伴我心(港) / 唱诗班男孩 [可播放]](https://movie.douban.com/subject/1291549/) 9.3 “
天籁一般的童声，是最接近上帝的存在。 
”

15 [楚门的世界 / The Truman Show / 真人Show(港) / 真人戏 [可播放]](https://movie.douban.com/subject/1292064/) 9.2 “
如果再也不能见到你，祝你早安，午安，晚安。
”

16 [大话西游之大圣娶亲 / 西遊記大結局之仙履奇緣 / 西游记完结篇仙履奇缘 / 齐天大圣西游记 [可播放]](https://movie.douban.com/subject/1292213/) 9.2 “
一生所爱。
”

17 [星际穿越 / Interstellar / 星际启示录(港) / 星际效应(台) [可播放]](https://movie.douban.com/subject/1889243/) 9.2 “
爱是一种力量，让我们超越时空感知它的存在。
”

18 [龙猫 / となりのトトロ / 邻居托托罗 / 邻家的豆豆龙 [可播放]](https://movie.douban.com/subject/1291560/) 9.2 “
人人心中都有个龙猫，童年就永远不会消失。
”

19 [教父 / The Godfather / Mario Puzo's The Godfather [可播放]](https://movie.douban.com/subject/1291841/) 9.2 “
千万不要记恨你的对手，这样会让你失去理智。
”

20 [熔炉 / 도가니 / 无声呐喊(港) / 漩涡](https://movie.douban.com/subject/5912992/) 9.3 “
我们一路奋战不是为了改变世界，而是为了不让世界改变我们。
”

21 [无间道 / 無間道 / Infernal Affairs / Mou gaan dou [可播放]](https://movie.douban.com/subject/1307914/) 9.1 “
香港电影史上永不过时的杰作。
”

22 [当幸福来敲门 / The Pursuit of Happyness / 寻找快乐的故事(港) / 追求快乐 [可播放]](https://movie.douban.com/subject/1849031/) 9.0 “
平民励志片。 
”

23 [疯狂动物城 / Zootopia / 优兽大都会(港) / 动物方城市(台) [可播放]](https://movie.douban.com/subject/25662329/) 9.2 “
迪士尼给我们营造的乌托邦就是这样，永远善良勇敢，永远出乎意料。
”

24 [怦然心动 / Flipped / 萌动青春 / 青春萌动 [可播放]](https://movie.douban.com/subject/3319755/) 9.0 “
真正的幸福是来自内心深处。
”

25 [触不可及 / Intouchables / 闪亮人生(港) / 逆转人生(台)](https://movie.douban.com/subject/6786002/) 9.2 “
满满温情的高雅喜剧。
”

26 [乱世佳人 / Gone with the Wind / 飘 [可播放]](https://movie.douban.com/subject/1300267/) 9.2 “
Tomorrow is another day.
”

27 [蝙蝠侠：黑暗骑士 / The Dark Knight / 蝙蝠侠前传2：黑暗骑士 / 黑暗骑士(台) [可播放]](https://movie.douban.com/subject/1851857/) 9.1 “
无尽的黑暗。
”

28 [活着 / 人生 / Lifetimes](https://movie.douban.com/subject/1292365/) 9.2 “
张艺谋最好的电影。
”

29 [少年派的奇幻漂流 / Life of Pi / 少年Pi的奇幻漂流 / 漂流少年Pi [可播放]](https://movie.douban.com/subject/1929463/) 9.0 “
瑰丽壮观、无人能及的冒险之旅。
”

30 [天堂电影院 / Nuovo Cinema Paradiso / 星光伴我心(港) / 新天堂乐园(台)](https://movie.douban.com/subject/1291828/) 9.2 “
那些吻戏，那些青春，都在影院的黑暗里被泪水冲刷得无比清晰。
”

31 [鬼子来了 / Devils on the Doorstep](https://movie.douban.com/subject/1291858/) 9.2 “
对敌人的仁慈，就是对自己残忍。
”

32 [十二怒汉 / 12 Angry Men / 12怒汉 / 十二怒汉 [可播放]](https://movie.douban.com/subject/1293182/) 9.4 “
1957年的理想主义。 
”

33 [控方证人 / Witness for the Prosecution / 雄才伟略 / 情妇](https://movie.douban.com/subject/1296141/) 9.6 “
比利·怀德满分作品。
”

34 [指环王3：王者无敌 / The Lord of the Rings: The Return of the King / 魔戒三部曲：王者再临(台 / 港) [可播放]](https://movie.douban.com/subject/1291552/) 9.1 “
史诗的终章。
”

35 [天空之城 / 天空の城ラピュタ / Tenkû no shiro Rapyuta / Laputa: Castle in the Sky](https://movie.douban.com/subject/1291583/) 9.1 “
对天空的追逐，永不停止。 
”

36 [飞屋环游记 / Up / 冲天救兵(港) / 天外奇迹(台) [可播放]](https://movie.douban.com/subject/2129039/) 8.9 “
最后那些最无聊的事情，才是最值得怀念的。 
”

37 [搏击俱乐部 / Fight Club / 搏击会(港) / 斗阵俱乐部(台)](https://movie.douban.com/subject/1292000/) 9.0 “
邪恶与平庸蛰伏于同一个母体，在特定的时间互相对峙。
”

38 [大话西游之月光宝盒 / 西遊記第壹佰零壹回之月光寶盒 / 西游记101回月光宝盒 / 齐天大圣东游记 [可播放]](https://movie.douban.com/subject/1299398/) 8.9 “
旷古烁今。
”

39 [摔跤吧！爸爸 / Dangal / 我和我的冠军女儿(台) / 打死不离3父女(港) [可播放]](https://movie.douban.com/subject/26387939/) 9.0 “
你不是在为你一个人战斗，你要让千千万万的女性看到女生并不是只能相夫教子。
”

40 [罗马假日 / Roman Holiday / 金枝玉叶(港) / 罗马假期(台) [可播放]](https://movie.douban.com/subject/1293839/) 9.0 “
爱情哪怕只有一天。
”

41 [哈尔的移动城堡 / ハウルの動く城 / 呼啸山城 / 霍尔的移动城堡](https://movie.douban.com/subject/1308807/) 9.0 “
带着心爱的人在天空飞翔。
”

42 [窃听风暴 / Das Leben der Anderen / 他人的生活 / 别人的生活 [可播放]](https://movie.douban.com/subject/1900841/) 9.1 “
别样人生。
”

43 [闻香识女人 / Scent of a Woman / 女人香 / 女人的芳香 [可播放]](https://movie.douban.com/subject/1298624/) 9.0 “
史上最美的探戈。
”

44 [辩护人 / 변호인 / 逆权大状(港) / 正义辩护人(台)](https://movie.douban.com/subject/21937445/) 9.2 “
电影的现实意义大过电影本身。
”

45 [两杆大烟枪 / Lock, Stock and Two Smoking Barrels / 够姜四小强(港) / 两根枪管(台) [可播放]](https://movie.douban.com/subject/1293350/) 9.1 “
4个臭皮匠顶个诸葛亮，盖·里奇果然不是盖的。
”

46 [飞越疯人院 / One Flew Over the Cuckoo's Nest / 飞越杜鹃窝(台) / 飞越喜鹊巢](https://movie.douban.com/subject/1292224/) 9.1 “
自由万岁。
”

47 [死亡诗社 / Dead Poets Society / 暴雨骄阳(港) / 春风化雨(台) [可播放]](https://movie.douban.com/subject/1291548/) 9.0 “
当一个死水般的体制内出现一个活跃的变数时，所有的腐臭都站在了光明的对面。
”

48 [V字仇杀队 / V for Vendetta / V煞(港) / V怪客(台) [可播放]](https://movie.douban.com/subject/1309046/) 8.8 “
一张面具背后的理想与革命。
”

49 [指环王2：双塔奇兵 / The Lord of the Rings: The Two Towers / 魔戒二部曲：双城奇谋 / 指环王II：双塔 [可播放]](https://movie.douban.com/subject/1291572/) 9.0 “
承前启后的史诗篇章。
”

50 [教父2 / The Godfather: Part Ⅱ / 教父续集 / 教父II [可播放]](https://movie.douban.com/subject/1299131/) 9.1 “
优雅的孤独。
”

51 [末代皇帝 / The Last Emperor / 末代皇帝溥仪(港) [可播放]](https://movie.douban.com/subject/1293172/) 9.1 “
“不要跟我比惨，我比你更惨”再适合这部电影不过了。
”

52 [指环王1：魔戒再现 / The Lord of the Rings: The Fellowship of the Ring / 魔戒首部曲：魔戒现身 / 指环王I：护戒使者 [可播放]](https://movie.douban.com/subject/1291571/) 9.0 “
传说的开始。
”

53 [海豚湾 / The Cove / 血色海湾(台) / 海湾 [可播放]](https://movie.douban.com/subject/3442220/) 9.3 “
海豚的微笑，是世界上最高明的伪装。
”

54 [素媛 / 소원 / 许愿 / 希望：为爱重生(台)](https://movie.douban.com/subject/21937452/) 9.2 “
受过伤害的人总是笑得最开心，因为他们不愿意让身边的人承受一样的痛苦。
”

55 [饮食男女 / 飲食男女 / Eat Drink Man Woman](https://movie.douban.com/subject/1291818/) 9.1 “
人生不能像做菜，把所有的料都准备好了才下锅。
”

56 [美丽心灵 / A Beautiful Mind / 有你终生美丽(港) / 美丽境界(台) [可播放]](https://movie.douban.com/subject/1306029/) 8.9 “
爱是一切逻辑和原由。
”

57 [情书 / Love Letter / When I Close My Eyes / Letters of Love [可播放]](https://movie.douban.com/subject/1292220/) 8.9 “
暗恋的极致。
”

58 [狮子王 / The Lion King / 狮子王3D [可播放]](https://movie.douban.com/subject/1301753/) 8.9 “
动物版《哈姆雷特》。
”

59 [钢琴家 / The Pianist / 战地琴声(台) / 战地琴人 [可播放]](https://movie.douban.com/subject/1296736/) 9.1 “
音乐能化解仇恨。
”

60 [美国往事 / Once Upon a Time in America / 四海兄弟(台) / 义薄云天(港)](https://movie.douban.com/subject/1292262/) 9.1 “
往事如烟，无处祭奠。
”

61 [本杰明·巴顿奇事 / The Curious Case of Benjamin Button / 奇幻逆缘(港) / 班杰明的奇幻旅程(台) [可播放]](https://movie.douban.com/subject/1485260/) 8.8 “
在时间之河里感受溺水之苦。
”

62 [小鞋子 / بچههای آسمان / 天堂的孩子 / 小童鞋 [可播放]](https://movie.douban.com/subject/1303021/) 9.2 “
奔跑的孩子是天使。
”

63 [寻梦环游记 / Coco / 可可夜总会(台) / 玩转极乐园(港) [可播放]](https://movie.douban.com/subject/20495023/) 9.0 “
死亡不是真的逝去，遗忘才是永恒的消亡。
”

64 [黑客帝国 / The Matrix / 廿二世纪杀人网络(港) / 骇客任务(台) [可播放]](https://movie.douban.com/subject/1291843/) 8.9 “
视觉革命。
”

65 [西西里的美丽传说 / Malèna / 真爱伴我行(台) / 玛莲娜 [可播放]](https://movie.douban.com/subject/1292402/) 8.8 “
美丽无罪。
”

66 [七宗罪 / Se7en / 火线追缉令(台) / 7宗罪 [可播放]](https://movie.douban.com/subject/1292223/) 8.8 “
警察抓小偷，老鼠玩死猫。
”

67 [致命魔术 / The Prestige / 顶尖对决(台) / 死亡魔法(港) [可播放]](https://movie.douban.com/subject/1780330/) 8.8 “
孪生蝙蝠侠大战克隆金刚狼。
”

68 [让子弹飞 / 让子弹飞一会儿 / 火烧云 [可播放]](https://movie.douban.com/subject/3742360/) 8.7 “
你给我翻译翻译，神马叫做TMD的惊喜。
”

69 [看不见的客人 / Contratiempo / 佈局(台) / 死无对证(港) [可播放]](https://movie.douban.com/subject/26580232/) 8.7 “
你以为你以为的就是你以为的。
”

70 [拯救大兵瑞恩 / Saving Private Ryan / 雷霆救兵(港) / 抢救雷恩大兵(台) [可播放]](https://movie.douban.com/subject/1292849/) 8.9 “
美利坚精神输出大片No1.
”

71 [被嫌弃的松子的一生 / 嫌われ松子の一生 / 花样奇缘(港) / 令人讨厌的松子的一生(台) [可播放]](https://movie.douban.com/subject/1787291/) 8.9 “
以戏谑来戏谑戏谑。
”

72 [大闹天宫 / 大闹天宫 上下集 / The Monkey King [可播放]](https://movie.douban.com/subject/1418019/) 9.3 “
经典之作，历久弥新。
”

73 [哈利·波特与魔法石 / Harry Potter and the Sorcerer's Stone / 哈利波特1：神秘的魔法石(港 / 台) [可播放]](https://movie.douban.com/subject/1295038/) 8.9 “
童话世界的开端。
”

74 [音乐之声 / The Sound of Music / 仙乐飘飘处处闻(港) / 真善美(台) [可播放]](https://movie.douban.com/subject/1294408/) 9.0 “
用音乐化解仇恨，让歌声串起美好。
”

75 [低俗小说 / Pulp Fiction / 黑色追緝令(台) / 危险人物(港) [可播放]](https://movie.douban.com/subject/1291832/) 8.8 “
故事的高级讲法。
”

76 [天使爱美丽 / Le fabuleux destin d'Amélie Poulain / 艾蜜莉的异想世界(台) / 天使艾米莉 [可播放]](https://movie.douban.com/subject/1292215/) 8.7 “
法式小清新。 
”

77 [勇敢的心 / Braveheart / 惊世未了缘(港) / 梅尔吉勃逊之英雄本色(台) [可播放]](https://movie.douban.com/subject/1294639/) 8.8 “
史诗大片的典范。
”

78 [沉默的羔羊 / The Silence of the Lambs / 沉默的羔羊 [可播放]](https://movie.douban.com/subject/1293544/) 8.8 “
安东尼·霍普金斯的顶级表演。
”

79 [剪刀手爱德华 / Edward Scissorhands / 幻海奇缘(港) / 剪刀手爱德华 [可播放]](https://movie.douban.com/subject/1292370/) 8.7 “
浪漫忧郁的成人童话。
”

80 [蝴蝶效应 / The Butterfly Effect / 蝴蝶效应 [可播放]](https://movie.douban.com/subject/1292343/) 8.7 “
人的命运被自己瞬间的抉择改变。
”

81 [春光乍泄 / 春光乍洩 / 一起快乐 / Happy Together](https://movie.douban.com/subject/1292679/) 8.9 “
爱情纠缠，男女一致。
”

82 [猫鼠游戏 / Catch Me If You Can / 逍遥法外 / 神鬼交锋(台) [可播放]](https://movie.douban.com/subject/1305487/) 8.8 “
骗子大师和执著警探的你追我跑故事。 
”

83 [心灵捕手 / Good Will Hunting / 骄阳似我(港) / 心灵捕手 [可播放]](https://movie.douban.com/subject/1292656/) 8.8 “
人生中应该拥有这样的一段豁然开朗。
”

84 [入殓师 / おくりびと / 礼仪师之奏鸣曲(港) / 礼仪师(台)](https://movie.douban.com/subject/2149806/) 8.8 “
死可能是一道门，逝去并不是终结，而是超越，走向下一程。
”

85 [布达佩斯大饭店 / The Grand Budapest Hotel / 布达佩斯大酒店(港) / 欢迎来到布达佩斯大饭店(台) [可播放]](https://movie.douban.com/subject/11525673/) 8.8 “
小清新的故事里注入了大历史的情怀。
”

86 [禁闭岛 / Shutter Island / 不赦岛(港) / 隔离岛(台) [可播放]](https://movie.douban.com/subject/2334904/) 8.7 “
昔日翩翩少年，今日大腹便便。
”

87 [穿条纹睡衣的男孩 / The Boy in the Striped Pajamas / 穿条纹衣服的男孩 / 穿条纹衣的男孩 [可播放]](https://movie.douban.com/subject/3008247/) 9.0 “
尽管有些不切实际的幻想，这部电影依旧是一部感人肺腑的佳作。
”

88 [幽灵公主 / もののけ姫 / 魔法公主 / 幽灵少女](https://movie.douban.com/subject/1297359/) 8.8 “
人与自然的战争史诗。
”

89 [阳光灿烂的日子 / In the Heat of the Sun](https://movie.douban.com/subject/1291875/) 8.8 “
一场华丽的意淫。
”

90 [玛丽和马克思 / Mary and Max / 巧克力情缘(台) / 同是天涯寂寞客 [可播放]](https://movie.douban.com/subject/3072124/) 8.9 “
你是我最好的朋友，你是我唯一的朋友 。
”

91 [第六感 / The Sixth Sense / 灵异第六感 / 鬼眼 [可播放]](https://movie.douban.com/subject/1297630/) 8.8 “
深入内心的恐怖，出人意料的结局。
”

92 [阿凡达 / Avatar / 天神下凡(港) / 化身 [可播放]](https://movie.douban.com/subject/1652587/) 8.6 “
绝对意义上的美轮美奂。
”

93 [狩猎 / Jagten / 谎言的烙印(台) / 诬网(港) [可播放]](https://movie.douban.com/subject/6985810/) 9.1 “
人言可畏。
”

94 [致命ID / Identity / 杀人游戏 / 致命身份 [可播放]](https://movie.douban.com/subject/1297192/) 8.7 “
最不可能的那个人永远是最可能的。
”

95 [重庆森林 / 重慶森林 / Chungking Express](https://movie.douban.com/subject/1291999/) 8.7 “
寂寞没有期限。
”

96 [断背山 / Brokeback Mountain / 断臂山 / BBM](https://movie.douban.com/subject/1418834/) 8.7 “
每个人心中都有一座断背山。
”

97 [加勒比海盗 / Pirates of the Caribbean: The Curse of the Black Pearl / 加勒比海盗1：黑珍珠号的诅咒 / 神鬼奇航：鬼盗船魔咒(台) [可播放]](https://movie.douban.com/subject/1298070/) 8.7 “
约翰尼·德普的独角戏。
”

98 [摩登时代 / Modern Times / The Masses / Temps modernes, Les [可播放]](https://movie.douban.com/subject/1294371/) 9.2 “
大时代中的人生，小人物的悲喜。
”

99 [告白 / 自白 / 母亲 [可播放]](https://movie.douban.com/subject/4268598/) 8.7 “
没有一人完全善，也没有一人完全恶。
”

100 [大鱼 / Big Fish / 大鱼奇缘(港) / 大智若鱼(台) [可播放]](https://movie.douban.com/subject/1291545/) 8.8 “
抱着梦想而活着的人是幸福的，怀抱梦想而死去的人是不朽的。
”

101 [一一 / Yi yi / Yi yi: A One and a Two](https://movie.douban.com/subject/1292434/) 9.0 “
我们都曾经是一一。
”

102 [喜剧之王 / 喜劇之王 / King of Comedy](https://movie.douban.com/subject/1302425/) 8.6 “
我是一个演员。
”

103 [消失的爱人 / Gone Girl / 失踪的女孩 / 失踪女孩 [可播放]](https://movie.douban.com/subject/21318488/) 8.7 “
年度最佳date movie。
”

104 [射雕英雄传之东成西就 / 射鵰英雄傳之東成西就 / 东成西就 / 大英雄 (日本)](https://movie.douban.com/subject/1316510/) 8.7 “
百看不厌。 
”

105 [甜蜜蜜 / Comrades: Almost a Love Story](https://movie.douban.com/subject/1305164/) 8.8 “
相逢只要一瞬间，等待却像是一辈子。
”

106 [阳光姐妹淘 / 써니 / 阳光姊妹淘(港) / 桑尼](https://movie.douban.com/subject/4917726/) 8.8 “
再多各自牛逼的时光，也比不上一起傻逼的岁月。 
”

107 [爱在黎明破晓前 / Before Sunrise / 情留半天(港) / 爱在黎明破晓时(台) [可播放]](https://movie.douban.com/subject/1296339/) 8.8 “
缘分是个连绵词，最美不过一瞬。
”

108 [小森林 夏秋篇 / リトル・フォレスト 夏・秋 / 小森食光 / 夏秋篇(台) [可播放]](https://movie.douban.com/subject/25814705/) 8.9 “
那些静得只能听见呼吸的日子里，你明白孤独即生活。
”

109 [侧耳倾听 / 耳をすませば / 心之谷 / 梦幻街少女](https://movie.douban.com/subject/1297052/) 8.8 “
少女情怀总是诗。
”

110 [红辣椒 / パプリカ / 盗梦侦探 / 帕布莉卡](https://movie.douban.com/subject/1865703/) 8.9 “
梦的勾结。
”

111 [倩女幽魂 / 倩女幽魂(87版) / 倩女幽魂：妖魔道 [可播放]](https://movie.douban.com/subject/1297447/) 8.7 “
两张绝世的脸。 
”

112 [恐怖直播 / 더 테러 라이브 / 死亡“动”新闻(港) / 恐怖攻击直播(台) [可播放]](https://movie.douban.com/subject/21360417/) 8.7 “
恐怖分子的“秋菊打官司”。
”

113 [上帝之城 / Cidade de Deus / 无主之城 (港) / 无法无天 (台)](https://movie.douban.com/subject/1292208/) 8.9 “
被上帝抛弃了的上帝之城。
”

114 [风之谷 / 風の谷のナウシカ / 风谷少女 / Kaze no tani no Naushika](https://movie.douban.com/subject/1291585/) 8.8 “
动画片的圣经。
”

115 [超脱 / Detachment / 人间师格(台) [可播放]](https://movie.douban.com/subject/5322596/) 8.8 “
穷尽一生，我们要学会的，不过是彼此拥抱。
”

116 [爱在日落黄昏时 / Before Sunset / 日落巴黎(港) / 爱在日落巴黎时(台) [可播放]](https://movie.douban.com/subject/1291990/) 8.8 “
九年后的重逢是世俗和责任的交叠，没了悸动和青涩，沧桑而温暖。
”

117 [请以你的名字呼唤我 / Call Me by Your Name / 以你的名字呼唤我(港 / 台)](https://movie.douban.com/subject/26799731/) 8.8 “
沉醉在电影的情感和视听氛围中无法自拔。
”

118 [驯龙高手 / How to Train Your Dragon / 驯龙记(港) [可播放]](https://movie.douban.com/subject/2353023/) 8.7 “
和谐的生活离不开摸头与被摸头。
”

119 [菊次郎的夏天 / 菊次郎の夏 / Kikujirô no natsu / 菊次郎的夏天 [可播放]](https://movie.douban.com/subject/1293359/) 8.8 “
从没见过那么流氓的温柔，从没见过那么温柔的流氓。
”

120 [幸福终点站 / The Terminal / 机场客运站(港) / 航站情缘(台) [可播放]](https://movie.douban.com/subject/1292274/) 8.7 “
有时候幸福需要等一等。 
”

121 [哈利·波特与死亡圣器(下) / Harry Potter and the Deathly Hallows: Part 2 / 哈利波特7：死神的圣物2(港 / 台) [可播放]](https://movie.douban.com/subject/3011235/) 8.7 “
10年的完美句点。
”

122 [杀人回忆 / 살인의 추억 / 谋杀回忆 / 杀手回忆录](https://movie.douban.com/subject/1300299/) 8.7 “
关于连环杀人悬案的集体回忆。
”

123 [神偷奶爸 / Despicable Me / 卑鄙的我 / 坏蛋奖门人(港) [可播放]](https://movie.douban.com/subject/3287562/) 8.5 “
Mr. I Don't Care其实也有Care的时候。
”

124 [小森林 冬春篇 / リトル・フォレスト 冬・春 / 小森食光 / 冬春篇(台) [可播放]](https://movie.douban.com/subject/25814707/) 9.0 “
尊敬他人，尊敬你生活的这片土地，明白孤独是人生的常态。
”

125 [借东西的小人阿莉埃蒂 / 借りぐらしのアリエッティ / 借物少女艾莉缇(台) / 借东西的小矮人亚莉亚蒂(港)](https://movie.douban.com/subject/4202302/) 8.7 “
曾经的那段美好会沉淀为一辈子的记忆。
”

126 [7号房的礼物 / 7번방의 선물 / 戆爸的礼物(港) / 7号囚房的礼物](https://movie.douban.com/subject/10777687/) 8.8 “
《我是山姆》的《美丽人生》。
”

127 [怪兽电力公司 / Monsters, Inc. / 怪兽公司(港) / 怪物公司 [可播放]](https://movie.douban.com/subject/1291579/) 8.6 “
不要给它起名字，起了名字就有感情了。
”

128 [岁月神偷 / 歲月神偷 / 1969太空漫游 / Echoes Of The Rainbow](https://movie.douban.com/subject/3792799/) 8.6 “
岁月流逝，来日可追。
”

129 [七武士 / 七人の侍 / 七侠四义(港) / The Seven Samurai [可播放]](https://movie.douban.com/subject/1295399/) 9.2 “
时代悲歌。
”

130 [萤火之森 / 蛍火の杜へ / 萤火之社 / Hotarubi no mori e [可播放]](https://movie.douban.com/subject/5989818/) 8.8 “
触不到的恋人。
”

131 [超能陆战队 / Big Hero 6 / 大英雄联盟(港) / 大英雄天团(台) [可播放]](https://movie.douban.com/subject/11026735/) 8.6 “
Balalala~~~
”

132 [唐伯虎点秋香 / 唐伯虎點秋香 / Flirting Scholar [可播放]](https://movie.douban.com/subject/1306249/) 8.5 “
华太师是黄霑，吴镇宇四大才子之一。
”

133 [电锯惊魂 / Saw / 夺魂锯(台) / 恐惧斗室(港)](https://movie.douban.com/subject/1417598/) 8.7 “
真相就在眼前。
”

134 [真爱至上 / Love Actually / 爱是您，爱是我(台) / 真的恋爱了(港) [可播放]](https://movie.douban.com/subject/1292401/) 8.5 “
爱，是个动词。
”

135 [蝙蝠侠：黑暗骑士崛起 / The Dark Knight Rises / 蝙蝠侠前传3：黑暗骑士崛起 / 黑暗骑士：黎明升起(台) [可播放]](https://movie.douban.com/subject/3395373/) 8.7 “
诺兰就是保证。
”

136 [谍影重重3 / The Bourne Ultimatum / 叛谍追击3：最后通牒(港) / 神鬼认证：最后通牒 (台) [可播放]](https://movie.douban.com/subject/1578507/) 8.7 “
像吃了苏打饼一样干脆的电影。
”

137 [疯狂原始人 / The Croods / 古鲁家族(港 / 台) [可播放]](https://movie.douban.com/subject/1907966/) 8.7 “
老少皆宜，这就是好莱坞动画的魅力。
”

138 [萤火虫之墓 / 火垂るの墓 / 再见萤火虫(港) / 萤火挽歌](https://movie.douban.com/subject/1293318/) 8.7 “
幸福是生生不息，却难以触及的远。 
”

139 [喜宴 / 囍宴 / The Wedding Banquet](https://movie.douban.com/subject/1303037/) 8.9 “
中国家庭的喜怒哀乐忍。
”

140 [东邪西毒 / 東邪西毒 / Ashes of Time [可播放]](https://movie.douban.com/subject/1292328/) 8.6 “
电影诗。
”

141 [贫民窟的百万富翁 / Slumdog Millionaire / 贫民百万富翁(台) / 一百万零一夜(港)](https://movie.douban.com/subject/2209573/) 8.5 “
上帝之城+猜火车+阿甘正传+开心辞典=山寨富翁
”

142 [黑天鹅 / Black Swan / 夺命黑天鹅 / 霸王别鹅(豆友译名) [可播放]](https://movie.douban.com/subject/1978709/) 8.5 “
黑暗之美。
”

143 [记忆碎片 / Memento / 失忆 / 记忆拼图(台) [可播放]](https://movie.douban.com/subject/1304447/) 8.6 “
一个针管引发的血案。
”

144 [英雄本色 / A Better Tomorrow / Gangland Boss [可播放]](https://movie.douban.com/subject/1297574/) 8.6 “
英雄泪短，兄弟情长。 
”

145 [无人知晓 / 誰も知らない / 谁知赤子心(港) / 无人知晓的夏日清晨(台) [可播放]](https://movie.douban.com/subject/1292337/) 9.1 “
我的平常生活就是他人的幸福。
”

146 [心迷宫 / 殡棺 / The Coffin in the Mountain [可播放]](https://movie.douban.com/subject/25917973/) 8.7 “
荒诞讽刺，千奇百巧，抽丝剥茧，百转千回。
”

147 [傲慢与偏见 / Pride & Prejudice / 傲慢与偏见2005 / Pride And Prejudice [可播放]](https://movie.douban.com/subject/1418200/) 8.5 “
爱是摈弃傲慢与偏见之后的曙光。
”

148 [雨人 / Rain Man / 手足情未了 / 手足情深 [可播放]](https://movie.douban.com/subject/1291870/) 8.7 “
生活在自己的世界里，也可以让周围的人显得可笑和渺小。
”

149 [血战钢锯岭 / Hacksaw Ridge / 钢锯岭 / 钢铁英雄(台) [可播放]](https://movie.douban.com/subject/26325320/) 8.7 “
优秀的战争片不会美化战场，不会粉饰死亡，不会矮化敌人，不会无视常识，最重要的，不会宣扬战争。
”

150 [荒蛮故事 / Relatos salvajes / 蛮荒故事 / 生命中最抓狂的小事(台) [可播放]](https://movie.douban.com/subject/24750126/) 8.8 “
始于荒诞，止于更荒诞。
”

151 [时空恋旅人 / About Time / 时空旅恋人 / 回到最爱的一天(港) [可播放]](https://movie.douban.com/subject/10577869/) 8.7 “
把每天当作最后一天般珍惜度过，积极拥抱生活，就是幸福。
”

152 [纵横四海 / 緃横四海 / Once a Thief [可播放]](https://movie.douban.com/subject/1295409/) 8.7 “
香港浪漫主义警匪动作片的巅峰之作。
”

153 [卢旺达饭店 / Hotel Rwanda / 卢安达饭店(台)](https://movie.douban.com/subject/1291822/) 8.9 “
当这个世界闭上双眼，他却敞开了怀抱。
”

154 [教父3 / The Godfather: Part III / 教父第三集 / 教父 III [可播放]](https://movie.douban.com/subject/1294240/) 8.8 “
任何信念的力量，都无法改变命运。
”

155 [玩具总动员3 / Toy Story 3 / 反斗奇兵3(港) / 玩具的故事3 [可播放]](https://movie.douban.com/subject/1858711/) 8.8 “
跨度十五年的欢乐与泪水。
”

156 [达拉斯买家俱乐部 / Dallas Buyers Club / 续命枭雄(港) / 药命俱乐部(台) [可播放]](https://movie.douban.com/subject/1793929/) 8.7 “
Jared Leto的腿比女人还美！
”

157 [海边的曼彻斯特 / Manchester by the Sea / 情系海边之城(港) [可播放]](https://movie.douban.com/subject/25980443/) 8.6 “
我们都有权利不与自己的过去和解。
”

158 [花样年华 / 花樣年華 / In the Mood for Love [可播放]](https://movie.douban.com/subject/1291557/) 8.6 “
偷情本没有这样美。
”

159 [完美的世界 / A Perfect World / 强盗保镳 [可播放]](https://movie.douban.com/subject/1300992/) 9.0 “
坏人的好总是比好人的好来得更感人。
”

160 [海洋 / Océans / Oceans / 海洋 [可播放]](https://movie.douban.com/subject/3443389/) 9.0 “
大海啊，不全是水。
”

161 [虎口脱险 / La grande vadrouille / 横冲直撞出重围(港) / 大進擊(台) [可播放]](https://movie.douban.com/subject/1296909/) 8.9 “
永远看不腻的喜剧。
”

162 [恋恋笔记本 / The Notebook / 深情日记 / 写我情真 [可播放]](https://movie.douban.com/subject/1309163/) 8.5 “
爱情没有那么多借口，如果不能圆满，只能说明爱的不够。 
”

163 [你看起来好像很好吃 / おまえうまそうだな / 你看起来很好吃(台) / 你看上去好像很好吃 [可播放]](https://movie.douban.com/subject/4848115/) 8.8 “
感情不分食草或者食肉。
”

164 [燃情岁月 / Legends of the Fall / 秋日传奇 / 真爱一世情(台) [可播放]](https://movie.douban.com/subject/1295865/) 8.7 “
传奇，不是每个人都可以拥有。
”

165 [二十二 / Twenty Two / 22 [可播放]](https://movie.douban.com/subject/26430107/) 8.7 “
有一些东西不应该被遗忘。
”

166 [头脑特工队 / Inside Out / 玩转脑朋友(港) / 脑筋急转弯(台) [可播放]](https://movie.douban.com/subject/10533913/) 8.7 “
愿我们都不用长大，每一座城堡都能永远存在。
”

167 [冰川时代 / Ice Age / 冰河世纪 / 冰原历险记 [可播放]](https://movie.douban.com/subject/1291578/) 8.5 “
松鼠才是角儿。
”

168 [雨中曲 / Singin' in the Rain / 雨中情 / 万花嬉春 [可播放]](https://movie.douban.com/subject/1293460/) 9.0 “
骨灰级歌舞片。
”

169 [被解救的姜戈 / Django Unchained / 被解放的姜戈 / 决杀令(台) [可播放]](https://movie.douban.com/subject/6307447/) 8.6 “
热血沸腾，那个低俗、性感的无耻混蛋又来了。
”

170 [我是山姆 / I Am Sam / 不一样的爸爸(港) / 他不笨，他是我爸爸(台) [可播放]](https://movie.douban.com/subject/1306861/) 8.9 “
爱并不需要智商 。
”

171 [无敌破坏王 / Wreck-It Ralph / 破坏王拉尔夫 / 破坏王大冒险 [可播放]](https://movie.douban.com/subject/6534248/) 8.7 “
迪士尼和皮克斯拿错剧本的产物。
”

172 [人工智能 / Artificial Intelligence: AI / AI人工智慧 [可播放]](https://movie.douban.com/subject/1302827/) 8.6 “
对爱的执着，可以超越一切。
”

173 [穿越时空的少女 / 時をかける少女 / 跳跃吧！时空少女(台) / Toki o kakeru shôjo [可播放]](https://movie.douban.com/subject/1937946/) 8.6 “
爱上未来的你。 
”

174 [魂断蓝桥 / Waterloo Bridge / 滑铁卢桥 / 断桥残梦 [可播放]](https://movie.douban.com/subject/1293964/) 8.8 “
中国式内在的美国电影。
”

175 [爆裂鼓手 / Whiplash / 鼓动真我(港) / 进击的鼓手(台)](https://movie.douban.com/subject/25773932/) 8.6 “
这个世界从不善待努力的人，努力了也不一定会成功，但是知道自己在努力，就是活下去的动力。
”

176 [猜火车 / Trainspotting / 迷幻列车(港) / 定位的火车 [可播放]](https://movie.douban.com/subject/1292528/) 8.5 “
不可猜的青春迷笛。 
”

177 [你的名字。 / 君の名は。 / 你的名字 / 君之名 [可播放]](https://movie.douban.com/subject/26683290/) 8.4 “
穿越错位的时空，仰望陨落的星辰，你没留下你的名字，我却无法忘记那句“我爱你”。
”

178 [未麻的部屋 / Perfect Blue / 蓝色的恐惧 / 蓝色恐惧](https://movie.douban.com/subject/1395091/) 8.9 “
好的剧本是，就算你猜到了结局也猜不到全部。
”

179 [模仿游戏 / The Imitation Game / 解码游戏(港) / 模拟游戏 [可播放]](https://movie.douban.com/subject/10463953/) 8.6 “
他给机器起名“克里斯托弗”，因为这是他初恋的名字。
”

180 [罗生门 / 羅生門 / Rashomon [可播放]](https://movie.douban.com/subject/1291879/) 8.7 “
人生的N种可能性。
”

181 [一个叫欧维的男人决定去死 / En man som heter Ove / 明天别再来敲门(台) / 想死冇咁易(港) [可播放]](https://movie.douban.com/subject/26628357/) 8.8 “
惠及一生的美丽。
”

182 [房间 / Room / 不存在的房间(台) / 抖室(港) [可播放]](https://movie.douban.com/subject/25724855/) 8.8 “
被偷走的岁月，被伤害的生命，被禁锢的灵魂，终将被希望和善意救赎。
”

183 [阿飞正传 / 阿飛正傳 / Days of Being Wild [可播放]](https://movie.douban.com/subject/1305690/) 8.5 “
王家卫是一种风格，张国荣是一个代表。
”

184 [忠犬八公物语 / ハチ公物語 / 八千公物语 / 阿八的故事 [可播放]](https://movie.douban.com/subject/1959195/) 9.1 “
养狗三日，便会对你终其一生。
”

185 [完美陌生人 / Perfetti sconosciuti / 完美谎情(港) / 波动的信息分享 [可播放]](https://movie.douban.com/subject/26614893/) 8.5 “
来啊，互相伤害啊！
”

186 [香水 / Perfume: The Story of a Murderer / 香水：一个杀人犯的故事 / 香水：一个谋杀犯的故事 [可播放]](https://movie.douban.com/subject/1760622/) 8.4 “
一个单凭体香达到高潮的男人。
”

187 [恐怖游轮 / Triangle / 汪洋血迷宮(台) / 轮回三角](https://movie.douban.com/subject/3011051/) 8.4 “
不要企图在重复中寻找已经失去的爱。
”

188 [魔女宅急便 / 魔女の宅急便 / 魔女琪琪(台) / 小魔女限时专送](https://movie.douban.com/subject/1307811/) 8.5 “
宫崎骏的电影总让人感觉世界是美好的，阳光明媚的。
”

189 [浪潮 / Die Welle / 恶魔教室(台) / 白恤暴潮(港)](https://movie.douban.com/subject/2297265/) 8.7 “
世界离独裁只有五天。
”

190 [朗读者 / The Reader / 为爱朗读(台) / 读爱(港)](https://movie.douban.com/subject/2213597/) 8.5 “
当爱情跨越年龄的界限，它似乎能变得更久远一点，成为一种责任，一种水到渠成的相濡以沫。 
”

191 [三块广告牌 / Three Billboards Outside Ebbing, Missouri / 意外(台) / 广告牌杀人事件(港) [可播放]](https://movie.douban.com/subject/26611804/) 8.7 

192 [可可西里 / Kekexili: Mountain Patrol [可播放]](https://movie.douban.com/subject/1308857/) 8.7 “
坚硬的信仰。
”

193 [哪吒闹海 / Prince Nezha's Triumph Against Dragon King / Nezha nao hai [可播放]](https://movie.douban.com/subject/1307315/) 8.9 “
想你时你在闹海。
”

194 [黑客帝国3：矩阵革命 / The Matrix Revolutions / 骇客任务完结篇：最后战役 / 廿二世纪杀人网络3：惊变世纪 [可播放]](https://movie.douban.com/subject/1302467/) 8.6 “
不得不说，《黑客帝国》系列是商业片与科幻、哲学完美结合的典范。
”

195 [战争之王 / Lord of War / 军火之王(台 / 港)](https://movie.douban.com/subject/1419936/) 8.6 “
做一颗让别人需要你的棋子。
”

196 [谍影重重 / The Bourne Identity / 叛谍追击(港) / 神鬼认证(台) [可播放]](https://movie.douban.com/subject/1304102/) 8.5 “
哗啦啦啦啦，天在下雨，哗啦啦啦啦，云在哭泣……找自己。
”

197 [谍影重重2 / The Bourne Supremacy / 叛谍追击2：机密圈套(港) / 神鬼认证：神鬼疑云(台) [可播放]](https://movie.douban.com/subject/1308767/) 8.6 “
谁说王家卫镜头很晃？
”

198 [海街日记 / 海街diary / 海街女孩日记(港) / Kamakura Diary [可播放]](https://movie.douban.com/subject/25895901/) 8.7 “
是枝裕和的家庭习作。
”

199 [地球上的星星 / Taare Zameen Par / 心中的小星星(台) / 每一个孩子都是特别的](https://movie.douban.com/subject/2363506/) 8.9 “
天使保护事件始末。
”

200 [牯岭街少年杀人事件 / 牯嶺街少年殺人事件 / A Brighter Summer Day](https://movie.douban.com/subject/1292329/) 8.8 “
弱者送给弱者的一刀。
”

201 [一次别离 / جدایی نادر از سیمین / 分居风暴(台) / 伊朗式分居(港) [可播放]](https://movie.douban.com/subject/5964718/) 8.7 “
只有有信仰的人才能说出事实真相。
”

202 [追随 / Following / 跟踪(台) / 致命追踪](https://movie.douban.com/subject/1397546/) 8.9 “
诺兰的牛逼来源于内心散发出的恐惧。
”

203 [青蛇 / Green Snake](https://movie.douban.com/subject/1303394/) 8.5 “
人生如此，浮生如斯。谁人言，花彼岸，此生情长意短。谁都是不懂爱的罢了。
”

204 [惊魂记 / Psycho / 精神病患者 / 触目惊心 [可播放]](https://movie.douban.com/subject/1293181/) 8.9 “
故事的反转与反转，分裂电影的始祖。
”

205 [撞车 / Crash / 冲击效应 / 冲撞 [可播放]](https://movie.douban.com/subject/1388216/) 8.6 “
天使与魔鬼的冲撞。
”

206 [再次出发之纽约遇见你 / Begin Again / 再次出发 / 歌曲改变人生 [可播放]](https://movie.douban.com/subject/6874403/) 8.5 “
爱我就给我看你的播放列表。
”

207 [小萝莉的猴神大叔 / Bajrangi Bhaijaan / 娃娃返乡任务(台) / 宝莱坞之钢铁奶爸(台) [可播放]](https://movie.douban.com/subject/26393561/) 8.5 “
宝莱坞的萝莉与大叔。
”

208 [源代码 / Source Code / 启动原始码(台) / 危机解密(港)](https://movie.douban.com/subject/3075287/) 8.4 “
邓肯·琼斯继《月球》之后再度奉献出一部精彩绝伦的科幻佳作。
”

209 [终结者2：审判日 / Terminator 2: Judgment Day / 终结者2 / 终结者2：末日审判 [可播放]](https://movie.douban.com/subject/1291844/) 8.6 “
少见的超越首部的续集，动作片中的经典。
”

210 [疯狂的石头 / Crazy Stone](https://movie.douban.com/subject/1862151/) 8.4 “
中国版《两杆大烟枪》。
”

211 [步履不停 / 歩いても 歩いても / 横山家之味(港) / 步伐不停 [可播放]](https://movie.douban.com/subject/2222996/) 8.8 “
日本的家庭电影已经是世界巅峰了，步履不停是巅峰中的佳作。
”

212 [梦之安魂曲 / Requiem for a Dream / 噩梦挽歌(台) / 迷上瘾(港) [可播放]](https://movie.douban.com/subject/1292270/) 8.7 “
一场没有春天的噩梦。
”

213 [新龙门客栈 / 新龍門客棧 / New Dragon Gate Inn [可播放]](https://movie.douban.com/subject/1292287/) 8.5 “
嬉笑怒骂，调风动月。
”

214 [初恋这件小事 / สิ่งเล็กเล็กที่เรียกว่า...รัก / 初恋那件小事(港) / 暗恋那点小事 [可播放]](https://movie.douban.com/subject/4739952/) 8.3 “
黑小鸭速效美白记。
”

215 [东京物语 / 東京物語 / 东京故事 / Tokyo Story [可播放]](https://movie.douban.com/subject/1291568/) 9.2 “
东京那么大，如果有一天走失了，恐怕一辈子不能再相见。
”

216 [爱在午夜降临前 / Before Midnight / 爱在午夜希腊时(台) / 情约半生(港) [可播放]](https://movie.douban.com/subject/10808442/) 8.8 “
所谓爱情，就是话唠一路，都不会心生腻烦，彼此嫌弃。
”

217 [城市之光 / City Lights / City Lights: A Comedy Romance in Pantomime / Lichter der Großstadt [可播放]](https://movie.douban.com/subject/1293908/) 9.3 “
永远的小人物，伟大的卓别林。
”

218 [无耻混蛋 / Inglourious Basterds / 恶棍特工(台) / 希魔撞正杀人狂(港) [可播放]](https://movie.douban.com/subject/1438652/) 8.5 “
昆汀同学越来越变态了，比北野武还杜琪峰。
”

219 [绿里奇迹 / The Green Mile / 绿色奇迹(台) / 绿色英里 [可播放]](https://movie.douban.com/subject/1300374/) 8.7 “
天使暂时离开。
”

220 [这个男人来自地球 / The Man from Earth / 地球不死人(港) / 这个人来自洞穴 [可播放]](https://movie.douban.com/subject/2300586/) 8.5 “
科幻真正的魅力不是视觉效果能取代的。 
”

221 [天书奇谭 / The Legend of Sealed Book / Secrets of the Heavenly Book [可播放]](https://movie.douban.com/subject/1428581/) 9.1 “
传奇的年代，醉人的童话。
”

222 [彗星来的那一夜 / Coherence / 相干性 / 相干效应 [可播放]](https://movie.douban.com/subject/25807345/) 8.5 “
小成本大魅力。
”

223 [E.T. 外星人 / E.T.: The Extra-Terrestrial / 外星人E.T. / 外星人 [可播放]](https://movie.douban.com/subject/1294638/) 8.5 “
生病的E.T.皮肤的颜色就像柿子饼。
”

224 [末路狂花 / Thelma & Louise / 塞尔玛与路易丝 / 末路狂花](https://movie.douban.com/subject/1291992/) 8.7 “
没有了退路，只好飞向自由。
”

225 [勇闯夺命岛 / The Rock / 石破天惊 / 绝地任务 [可播放]](https://movie.douban.com/subject/1292728/) 8.6 “
类型片的极致。 
”

226 [血钻 / Blood Diamond / 血腥钻石 / 滴血钻石 [可播放]](https://movie.douban.com/subject/1428175/) 8.6 “
每个美丽事物背后都是滴血的现实。
”

227 [变脸 / Face/Off / 夺面双雄 [可播放]](https://movie.douban.com/subject/1292659/) 8.4 “
当发哥的风衣、墨镜出现在了凯奇身上⋯⋯
”

228 [秒速5厘米 / 秒速5センチメートル / 秒速五厘米 / 秒速5公分 [可播放]](https://movie.douban.com/subject/2043546/) 8.3 “
青春就是放弃和怀念。
”

229 [聚焦 / Spotlight / 焦点追击(港) / 惊爆焦点(台) [可播放]](https://movie.douban.com/subject/25954475/) 8.8 “
新闻人的理性求真。
”

230 [发条橙 / A Clockwork Orange / 发条桔子 / 发条橙子](https://movie.douban.com/subject/1292233/) 8.5 “
我完全康复了。
”

231 [黄金三镖客 / Il buono, il brutto, il cattivo. / 好·坏·丑 / 独行侠决斗地狱门(港)](https://movie.douban.com/subject/1401118/) 9.1 “
最棒的西部片。
”

232 [海蒂和爷爷 / Heidi / 飘零燕(港) / 海蒂 [可播放]](https://movie.douban.com/subject/25958717/) 9.1 

233 [卡萨布兰卡 / Casablanca / 北非谍影(港) / 卡萨布兰卡 [可播放]](https://movie.douban.com/subject/1296753/) 8.6 “
世界上有那么多女人那么多酒馆，但她偏偏走进我的这家。
”

234 [2001太空漫游 / 2001: A Space Odyssey / 2001：星际漫游 / 2001：太空奥德赛 [可播放]](https://movie.douban.com/subject/1292226/) 8.7 “
现代科幻电影的开山之作，最伟大导演的最伟大影片。
”

235 [非常嫌疑犯 / The Usual Suspects / 刺激惊爆点(台) / 普通嫌疑犯 [可播放]](https://movie.douban.com/subject/1292214/) 8.6 “
我不信仰上帝，但我敬畏上帝。
”

236 [黑鹰坠落 / Black Hawk Down / 黑鹰降落 / 黑鹰计划 [可播放]](https://movie.douban.com/subject/1291824/) 8.6 “
还原真实而残酷的战争。
”

237 [国王的演讲 / The King's Speech / 皇上无话儿(港) / 王者之声：宣战时刻(台) [可播放]](https://movie.douban.com/subject/4023638/) 8.3 “
皇上无话儿。
”

238 [美国丽人 / American Beauty / 美丽有罪(港) / 美国心·玫瑰情(台) [可播放]](https://movie.douban.com/subject/1292062/) 8.5 “
每个人的内心都是深不可测的大海。 
”

239 [我爱你 / 그대를 사랑합니다 / 爱你 / 爱，是一生相伴(台) [可播放]](https://movie.douban.com/subject/5908478/) 9.0 “
你要相信，这世上真的有爱存在，不管在什么年纪 
”

240 [碧海蓝天 / Le grand bleu / 碧海情深 / 夜海倾情](https://movie.douban.com/subject/1300960/) 8.7 “
在那片深蓝中，感受来自大海的忧伤寂寞与美丽自由。
”

241 [千钧一发 / Gattaca / 变种异煞 / 自然人 [可播放]](https://movie.douban.com/subject/1300117/) 8.7 “
一部能引人思考的科幻励志片。
”

242 [遗愿清单 / The Bucket List / 玩转身前事(港) / 一路玩到挂(台) [可播放]](https://movie.douban.com/subject/1867345/) 8.5 “
用剩余不多的时间，去燃烧整个生命。
”

243 [海盗电台 / The Boat That Rocked / 出位乐人谷(港) / 海盗电波 [可播放]](https://movie.douban.com/subject/3007773/) 8.6 “
生命不止，摇滚不死。
”

244 [荒野生存 / Into the Wild / 浪荡天涯(港) / 阿拉斯加之死(台) [可播放]](https://movie.douban.com/subject/1905462/) 8.6 “
出门必备：本草纲目。
”

245 [英国病人 / The English Patient / 英伦情人(台) / 别问我是谁(港) [可播放]](https://movie.douban.com/subject/1291853/) 8.5 “
In memory, love lives forever...
”

246 [荒岛余生 / Cast Away / 浩劫重生(台) / 劫后重生(港) [可播放]](https://movie.douban.com/subject/1298653/) 8.5 “
一个人的独角戏。
”

247 [疯狂的麦克斯4：狂暴之路 / Mad Max: Fury Road / 末日先锋：战甲飞车(港) / 疯狂麦斯：愤怒道(台) [可播放]](https://movie.douban.com/subject/3592854/) 8.6 

248 [枪火 / 鎗火 / The Mission](https://movie.douban.com/subject/1300741/) 8.7 “
一群演技精湛的戏骨，奉献出一个精致的黑帮小品，成就杜琪峰群戏的巅峰之作。
”

249 [勇士 / Warrior / 勇者无敌(台) / 钢铁斗士(港) [可播放]](https://movie.douban.com/subject/3217169/) 8.9 “
热血沸腾，相当完美的娱乐拳击大餐。
”

250 [攻壳机动队 / 攻殻機動隊 / Ghost in the Shell](https://movie.douban.com/subject/1291936/) 8.9 “
上承《银翼杀手》，下启《黑客帝国》。
”

