
- [Matlab语法](#matlab语法)
    - [变量和赋值语句](#变量和赋值语句)
        - [变量](#变量)
            - [命名规则](#命名规则)
            - [特殊变量表](#特殊变量表)
        - [MATLAB表达式](#matlab表达式)
    - [数学函数](#数学函数)
    - [数组](#数组)
        - [创建简单的数组](#创建简单的数组)
        - [数组元素的访问](#数组元素的访问)
        - [数组的方向](#数组的方向)
        - [数组的运算](#数组的运算)
            - [标量-数组运算](#标量-数组运算)
            - [数组-数组运算](#数组-数组运算)
    - [矩阵](#矩阵)
        - [矩阵的建立](#矩阵的建立)
        - [矩阵中元素的操作](#矩阵中元素的操作)
            - [矩阵的运算](#矩阵的运算)
    - [M文件](#m文件)
    - [控制流](#控制流)
- [Matlab 例子](#matlab-例子)
    - [含字母方程求导](#含字母方程求导)
    - [含字母方程求极限](#含字母方程求极限)
        - [x -> 0](#x---0)
        - [x -> Inf](#x---inf)
    - [迭代法](#迭代法)
        - [Bisection method](#bisection-method)
        - [Newton's method](#newtons-method)
        - [Secant method](#secant-method)

# Matlab语法

## 变量和赋值语句

* 变量 = 表达式
* 表达式
  * 用运算符将有关运算量连接起来的式子，结果是一个矩阵
  * 将表达式的值赋给 MATLAB 的永久变量 ans
  * 如果在语句的最后加分号，那么 MATLAB 仅仅执行赋值操作，不再显示运算的结果
  * 在一条语句中，如果表达式太复杂，一行写不下，可以加上三个小黑点（续行符）并按下回车键，然后接下去再写

### 变量

#### 命名规则

1. 变量名必须是不含空格的单个词；
2. 变量名区分大小写；
3. 变量名最多不超过19个字符；
4. 变量名必须以字母打头，之后可以是任意字母、数字或下划线，变量名中不允许使用标点符号. 

#### 特殊变量表

```

ans     用于结果的缺省变量名
pi      圆周率
eps     计算机的最小数
flop    浮点运算数
inf     无穷大，如1/0
NaN     not a number，如0/0
i, j    i=j= sqrt(-1)
nargin  所用函数的输入变量数目
nargout 所用函数的输出变量数目
realmin 最小可用正实数
realmax 最大可用正实数

```

### MATLAB表达式

* 算数表达式：
  * 运算符：+（加）、-（减）、*（乘）、/（右除）、\（左除）、^（乘方）
  * 对于矩阵来说，左除和右除表示两种不同的除数矩阵和被除数矩阵的关系
* 关系表达式：运算符有<（小于）、<=（小于或等于）、>（大于）、>=（大于或等于）、==（等于）、~=（不等于）
* 逻辑表达式：运算符有&（与）、|（或）和~（非）
* 冒号表达式
  * 格式：
    ```
    e1:e2:e3 
    % e1 为初始值；e2 为步长；e3 为终止值 
    % 冒号表达式可以产生一个由 e1 开始到 e3 结束，以步长 e2 自增的行向量
    ```
  * 产生向量
  * 拆分矩阵

## 数学函数

```

sin(x)  正弦函数
cos(x)  余弦函数
tan(x)  正切函数
abs(x)  绝对值
min(x)  最小值
sqrt(x) 开平方
log(x)  自然对数
sign(x) 符号函数
asin(x) 反正弦函数
acos(x) 反余弦函数
atan(x) 反正切函数
max(x)  最大值
sum(x)  元素的总和
exp(x)  以e为底的指数
log10(x)    以10为底的对数
fix(x)  取整
diff(f(x))  求导    
pretty(ans) 将当前变量显示为常用书面形式

```

## 数组

### 创建简单的数组

```

x=[a  b  c  d  e  f]    
% 创建包含指定元素的行向量.

x=first：last   
% 创建从first开始，加1计数，到last结束的行向量.

x=first：increment：last  
% 创建从first开始，加increment计数，到last结束的行向量.

x=linspace(first，last，n） 
% 创建从first开始，到last结束，有n个元素的行向量.

x=logspace(first，last，n） 
% 创建从first开始，到last结束，有n个元素的对数分隔行向量. 

```

### 数组元素的访问

```

x(i)
% 访问数组x的第i个元素. 

x(a ：b ：c)
% 访问数组x的第a个元素开始，以步长b到第c个元素(但不超过c),b可以为负数，b缺省时为1. 

x([a  b  c  d]) 
% 提取数组x的第a、b、c、d个元素构成一个新的数组 [x(a) x(b) x(c) x(d)].    

```

### 数组的方向

前面例子中的数组都是一行数列，是行方向分布的. 称之为行向量. 数组也可以是列向量，它的数组操作和运算与行向量是一样的，唯一的区别是结果以列形式显示.  
产生列向量的方法：

```

c=[1；2；3；4]
% 直接产生

b=[1 2 3 4]; c=b′
% 转置产生

% 以空格或逗号分隔的元素指定的是不同列的元素，而以分号分隔的元素指定了不同行的元素. 

```

### 数组的运算

#### 标量-数组运算

```

% a=[a1,a2,…,an], c是标量.

a+c=[a1+c,a2+c,…,an+c]
a.*c=[a1*c,a2*c,…,an*c]
a./c= [a1/c,a2/c,…,an/c] % 右除
a.\c= [c/a1,c/a2,…,c/an] % 左除
a.^c= [a1^c,a2^c,…,an^c]
c.^a= [c^a1,c^a2,…,c^an] 

```

#### 数组-数组运算

当两个数组有相同维数时，加、减、乘、除、幂运算可按元素对元素方式进行，不同大小或维数的数组是不能进行运算的.

```

a=[a1,a2,…,an], b=[b1,b2,…,bn]

a+b= [a1+b1,a2+b2,…,an+bn]
a.*b= [a1*b1,a2*b2,…,an*bn]
a./b= [a1/b1,a2/b2,…,an/bn]
a.\b=[b1/a1,b2/a2,…,bn/an]
a.^b=[a1^b1,a2^b2,…,an^bn]

```          

## 矩阵

### 矩阵的建立

* 直接输入法：将矩阵的元素用方括号括起来，按矩阵行的顺序输入各元素，同一行的各元素之间用空格或逗号分隔，不同行的元素之间用分号分隔。（也可以用回车键代替分号）

  ```

  键入 A = [1 2 3; 4 5 6; 7 8 9] 
  或者键入 A = [1, 2, 3,; 4, 5, 6,; 7, 8, 9]
  或者键入 A = [1 2
               3 4]

  ```

* 利用函数建立数值矩阵

  ```

  c=ones(m，n)     
  % 产生一个m行n列的元素全为1的矩阵
  
  b=zeros(m，n)   
  % 产生一个m行n列的零矩阵

  a=[  ]                   
  % 产生一个空矩阵，当对一项操作无结果时，返回空矩阵，空矩阵的大小为零 

  d=eye(m，n)      
  % 产生一个m行n列的单位矩阵

  ```

### 矩阵中元素的操作

```

% 矩阵A的第r行
A（r，：）

% 矩阵A的第r列
A（：，r）

% 依次提取矩阵A的每一列，将A拉伸为一个列向量
A（：）

% 取矩阵A的第i1~i2行、第j1~j2列构成新矩阵
A(i1:i2, j1:j2)

% 以逆序提取矩阵A的第i1~i2行，构成新矩阵
A(i2:-1：i1，：）

% 以逆序提取矩阵A的第j1~j2列，构成新矩阵
A(:,j2:-1：j1）

% 删除A的第i1~i2行，构成新矩阵
A(i1:i2，：)=[]

% 删除A的第j1~j2列，构成新矩阵
A(:,j1:j2)=[]

% 将矩阵A和B拼接成新矩阵
[A  B]；[A；B]

```

#### 矩阵的运算

```

% 加法
A+B

% 乘法
A*B

% 方阵的行列式
det(A)

% 方阵的逆
inv(A)

% 方阵的特征值与特征向量
[V，D]=eig[A]

```

## M文件

MATLAB的内部函数是有限的，有时为了研究某一个函数的各种性态，需要为MATLAB定义新函数，为此必须编写函数文件. 函数文件是文件名后缀为M的文件，这类文件的第一行必须是一特殊字符function开始，格式为：  

```

    function    因变量名=函数名（自变量名）

```

函数值的获得必须通过具体的运算实现，并赋给因变量.  

M文件建立方法：
1. 在MATLAB中，点:File→New → M-file
2. 在编辑窗口中输入程序内容
3. 点File → Save，存盘，M文件名必须与函数名一致.

MATLAB的应用程序也以M文件保存.

## 控制流

MATLAB提供三种决策或控制流结构：for循环、while循环、if-else-end结构.   
这些结构经常包含大量的MATLAB命令，故经常出现在MATLAB程序中，而不是直接加在MATLAB提示符下.  

```

% for循环
for  x=array
    {commands}
end
% 在for和end语句之间的命令串{commands}按数组(array)中的每一列执行一次. 在每一次迭代中，x被指定为数组的下一列，即在第n次循环中，x=array(：，n)

``` 

```

% while循环
while (expression)
    {commands}
end
% 只要在表达式(expression)里的所有元素为真，就执行while和end语句之间的命令串{commands}. 

```

```

% if-else-end结构
if  (expression)
    {commands}
end

if   （expression1）
    {commands1}
else  if  （expression2）
     {commands2} 
else if  （expression3）
        {commands3} 
else if  ……
…………………………………
else
{commands} 
end
end
end
……
          end

% 如果在表达式(expression)里的所有元素为真，就执行if和end语句之间的命令串{commands}. 

```

# Matlab 例子

## 含字母方程求导

```

>> syms x 
% 再写fx
>> diff(fx,x);
>> pretty (ans)

``` 

## 含字母方程求极限

### x -> 0

```

>> syms x 
% 再写fx
>> limit(fx,x,0);
>> pretty(ans)

```

### x -> Inf

```

>> syms x 
% 再写fx
>> limit(fx,x,inf); 
>> pretty(ans)

```

## 迭代法

### Bisection method

```

% 建立f(x)函数
function f=f(x)
% 写fx
% 建立需要求解的函数
function f0=f0(x)
C=f(x);
f0=C-C0; % C0是目标值
% 用二分法求解
function x=bisect(a, b, e)
fa=f0(a);
fb=f0(b);
if fa*fb>0 error;
end
k=0;
while (b-a)>e
    x=(a+b)/2;
    fx=f0(x);
    if fa*fx<0
        b=x;
        fb=fx;
    else 
        a=x;
        fa=fx;
    end
k=k+1;
end
k
format long, x % 输出格式：小数点后面多几位
% 再计算
>> bisect(0.15,0.25,1e-8)

```

### Newton's method 

```

%导函数
function f1=f1(x)
syms x1
dy=diff(f(x1),x1);
x1=x;
f1=eval(dy);
% 用牛顿法求解
function x=Newtons(x0,e)
x=x0-f(x0)/f1(x0);
i=0;
while abs(x-x0)>e
    x0=x;
    x=x0-f(x0)/f1(x0);    
    i=i+1;
end
i
format long, x
% 求解
>> Newtons(0.15,1e-8)

```

### Secant method

```

% 割线法
function x=secant(x1,x2,e)
i=0
while abs(x2-x1)>e
    x=x2-f(x2)/((f(x2)-f(x1))/(x2-x1));    
    x2=x1;
    x1=x;
    i=i+1;
end
i
format long, x
% 求解

>> secant(0.15,0.25,1e-8)

```