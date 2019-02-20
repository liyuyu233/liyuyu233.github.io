---
title: 【Mathjax】公式简介
layout: post
---
Modified from [MathJax与LaTex公式简介 (转载)](http://www.cnblogs.com/linxd/p/4955530.html)

## Content
- [Content](#content)
- [括号](#%E6%8B%AC%E5%8F%B7)
- [求和与积分](#%E6%B1%82%E5%92%8C%E4%B8%8E%E7%A7%AF%E5%88%86)
- [分式和根式](#%E5%88%86%E5%BC%8F%E5%92%8C%E6%A0%B9%E5%BC%8F)
- [字体](#%E5%AD%97%E4%BD%93)
- [特殊函数和符号](#%E7%89%B9%E6%AE%8A%E5%87%BD%E6%95%B0%E5%92%8C%E7%AC%A6%E5%8F%B7)
  - [希腊字母](#%E5%B8%8C%E8%85%8A%E5%AD%97%E6%AF%8D)
  - [空间](#%E7%A9%BA%E9%97%B4)
  - [顶部符号](#%E9%A1%B6%E9%83%A8%E7%AC%A6%E5%8F%B7)
  - [转义](#%E8%BD%AC%E4%B9%89)
- [表格](#%E8%A1%A8%E6%A0%BC)
- [矩阵](#%E7%9F%A9%E9%98%B5)
  - [加括号](#%E5%8A%A0%E6%8B%AC%E5%8F%B7)
  - [省略元素](#%E7%9C%81%E7%95%A5%E5%85%83%E7%B4%A0)
  - [增广矩阵](#%E5%A2%9E%E5%B9%BF%E7%9F%A9%E9%98%B5)
  - [对齐的公式](#%E5%AF%B9%E9%BD%90%E7%9A%84%E5%85%AC%E5%BC%8F)
  - [分类表达式](#%E5%88%86%E7%B1%BB%E8%A1%A8%E8%BE%BE%E5%BC%8F)
- [空间问题](#%E7%A9%BA%E9%97%B4%E9%97%AE%E9%A2%98)
  - [不要在指数或者积分中使用`\frac`](#%E4%B8%8D%E8%A6%81%E5%9C%A8%E6%8C%87%E6%95%B0%E6%88%96%E8%80%85%E7%A7%AF%E5%88%86%E4%B8%AD%E4%BD%BF%E7%94%A8frac)
  - [使用`\mid`代替`|`作为分隔符](#%E4%BD%BF%E7%94%A8mid%E4%BB%A3%E6%9B%BF%E4%BD%9C%E4%B8%BA%E5%88%86%E9%9A%94%E7%AC%A6)
  - [多重积分](#%E5%A4%9A%E9%87%8D%E7%A7%AF%E5%88%86)
  - [连分数](#%E8%BF%9E%E5%88%86%E6%95%B0)
  - [方程组](#%E6%96%B9%E7%A8%8B%E7%BB%84)
- [颜色](#%E9%A2%9C%E8%89%B2)
- [公式标记与引用](#%E5%85%AC%E5%BC%8F%E6%A0%87%E8%AE%B0%E4%B8%8E%E5%BC%95%E7%94%A8)

## 括号

* 小括号与方括号：使用原始的`()`，`[]`即可，如`(2+3)[4+4]`: $(2+3)[4+4]$
* 大括号：由于大括号{}被用来分组，因此需要使用`\{`和`\}`表示大括号，也可以使用`\lbrace`和`\rbrace`来表示。如
 
  `\{a*b\}`: 
  $$\{a*b\}$$
  
  `\lbrace a*b \rbrace` : 
  $$\lbrace a*b \rbrace$$
  
* 尖括号：使用`\langle`和`\rangle`表示左尖括号和右尖括号。如`\langle x \rangle` : $\langle x \rangle$
* 上取整：使用`\lceil`和`\rceil`表示。如`\lceil x \rceil`：$\lceil x \rceil$
* 下取整：使用`\lfloor`和`\rfloor`表示。如`\lfloor x \rfloor`：$\lfloor x \rfloor$
* 不可见括号：使用`.`表示

需要注意的是，原始符号并不会随着公式大小缩放，可以使用`\left(...\right)`来自适应地调整括号大小。如下，

$$
\lbrace\sum_{i=0}^0 i^2 = \frac{(n^2+n)(2n+2)}{6}\rbrace\tag{1.1}
$$

$$
\left\lbrace\sum_{i=0}^0 i^2 = \frac{(n^2+n)(2n+2)}{6}\right\rbrace\tag{1.2}
$$

```
$$
\lbrace\sum_{i=0}^0 i^2 = \frac{(n^2+n)(2n+2)}{6}\rbrace\tag{1.1}
$$

$$
\left\lbrace\sum_{i=0}^0 i^2 = \frac{(n^2+n)(2n+2)}{6}\right\rbrace\tag{1.2}
$$
```

## 求和与积分
`\sum`用来表示求和符号，其下标表示求和下限，上标表示上限。如`\sum_1^n`: $\sum_1^n$。
`\int`用来表示积分符号，同样地，其上下标表示积分的上下限。如`\int_1^\infty`: $\int_1^\infty$。
与此类似的符号还有：`\prod`:$\prod$ , `\bigcup`: $\bigcup$ , `\bigcap`:$\bigcap$ , `\iint`:$\iint$。

## 分式和根式
分式的表示：
 
* 第一种，使用`\frac ab` , `\frac`作用于其后的两个组`a` , `b` ，结果为$\frac ab$。如果你的分子或分母不是单个字符，请使用`{...}`来分组。
* 第二种，使用`\over`来分隔一个组的前后两部分，如 `{a+1 \over b+1}`: ${a+1 \over b+1}$

根式使用`\sqrt`表示，如：`\sqrt[4]{\frac xy}` : $\sqrt[4]{\frac xy}$

## 字体
* 使用`\mathbb`或`\Bbb`显示黑板粗体字，此字体经常用来表示实数、整数、有理数、复数。如 

```
   $$\mathbb{ABCDEFGHIJKLMNOPQRSTUVWXYZ}$$
   $$\mathbb{abcdefghijklmnopqrstuvwxyz}$$
```

   $$\mathbb{ABCDEFGHIJKLMNOPQRSTUVWXYZ}$$
   $$\mathbb{abcdefghijklmnopqrstuvwxyz}$$

* 使用`\mathbf`显示黑体字，如

```
   $$\mathbf{ABCDEFGHIJKLMNOPQRSTUVWXYZ}$$
   $$\mathbf{abcdefghijklmnopqrstuvwxyz}$$
```

   $$\mathbf{ABCDEFGHIJKLMNOPQRSTUVWXYZ}$$
   $$\mathbf{abcdefghijklmnopqrstuvwxyz}$$

* 使用`\mathtt`显示打印机字体，如 

```
   $$\mathtt{ABCDEFGHIJKLMNOPQRSTUVWXYZ}$$
   $$\mathtt{abcdefghijklmnopqrstuvwxyz}$$
```

   $$\mathtt{ABCDEFGHIJKLMNOPQRSTUVWXYZ}$$
   $$\mathtt{abcdefghijklmnopqrstuvwxyz}$$

* 使用\mathrm显示罗马字体，如 

```
   $$\mathrm{ABCDEFGHIJKLMNOPQRSTUVWXYZ}$$
   $$\mathrm{abcdefghijklmnopqrstuvwxyz}$$
```

   $$\mathrm{ABCDEFGHIJKLMNOPQRSTUVWXYZ}$$
   $$\mathrm{abcdefghijklmnopqrstuvwxyz}$$

* 使用\mathscr显示手写体，如

```
   $$\mathscr{ABCDEFGHIJKLMNOPQRSTUVWXYZ}$$
   $$\mathscr{abcdefghijklmnopqrstuvwxyz}$$
```

   $$\mathscr{ABCDEFGHIJKLMNOPQRSTUVWXYZ}$$
   $$\mathscr{abcdefghijklmnopqrstuvwxyz}$$

* 使用\mathfrak显示Fraktur字母（一种德国字体），如 


```
   $$\mathfrak{ABCDEFGHIJKLMNOPQRSTUVWXYZ}$$
   $$\mathfrak{abcdefghijklmnopqrstuvwxyz}$$
```

   $$\mathfrak{ABCDEFGHIJKLMNOPQRSTUVWXYZ}$$
   $$\mathfrak{abcdefghijklmnopqrstuvwxyz}$$

## 特殊函数和符号

* 常见的三角函数，如 `\sin x`: $\sin x$ , `\arctan x`: $\arctan x$ , `\lim\limits_{1\to\infty}`: $\lim\limits_{1\to\infty}$
* 比较运算符：`\lt \gt \le \ge \neq` : $\lt$ $\gt$ $\le$ $\ge$ $\neq$。可以在这些运算符前面加上`\not`，如`\not\lt` : $\not\lt$
* `\times \div \pm \mp` 表示：$\times$ $\div$ $\pm$ $\mp$，`\cdot`表示居中的点，`x \cdot y` ：$x \cdot y$
* 集合关系与运算：`\cup \cap \setminus \subset \subseteq \subsetneq \supset \in \notin \emptyset \varnothing` : $\cup$ $\cap$ $\setminus$ $\subset$ $\subseteq$ $\subsetneq$ $\supset$ $\in$ $\notin$ $\emptyset$ $\varnothing$
* 表示排列使用`\binom{n+1}{2k}`或`{n+1 \choose 2k}`：$\binom{n+1}{2k}$ ${n+1 \choose 2k}$
* 箭头：`\to \rightarrow \leftarrow \Rightarrow \Leftarrow \mapsto`: $\to$ $\rightarrow$ $\leftarrow$ $\Rightarrow$ $\Leftarrow$ $\mapsto$
* 逻辑运算符：`\land \lor \lnot \forall \exists \top \bot \vdash \vDash`：$\land$ $\lor$ $\lnot$ $\forall$ $\exists$ $\top$ $\bot$ $\vdash$ $\vDash$
* `\star \ast \oplus \circ \bullet` : $\star$ $\ast$ $\oplus$ $\circ$ $\bullet$
* `\approx \sim \cong \equiv \prec` : $\approx$ $\sim$ $\cong$ $\equiv$ $\prec$
*  `\infty \aleph_o \nabla \partial \Im \Re` : $\infty$ $\aleph_o$ $\nabla$ $\partial$ $\Im$ $\Re$
* 模运算 `\pmod` , 如 `a \equiv b \pmod n` : $a \equiv b \pmod n$
* `\ldots`与`\cdots`，其区别是dots的位置不同，ldots位置稍低，cdots位置居中。
 
  ```
  $$a_1 + a_2 + \cdots + a_n , a_1, a_2, \ldots , a_n$$
  ```

  $$a_1 + a_2 + \cdots + a_n , a_1, a_2, \ldots , a_n$$

使用[Detexify](http://detexify.kirelabs.org/classify.html)，你可以在网页上画出符号，Detexify会给出相似的符号及其代码。这是一个方便的功能，但是不能保证它给出的符号可以在MathJax中使用，你可以参考[supported-latex-commands](http://docs.mathjax.org/en/latest/tex.html#supported-latex-commands)确定MathJax是否支持此符号。
### 希腊字母
大写的希腊字母：将代码的首字母大写即可。

代码 | 大写 | 小写
--- | --- | ---
`\alpha` | $\Alpha$ | $\alpha$
`\beta` | $\Beta$ | $\beta$
`\gamma` | $\Gamma$ | $\gamma$
`\delta` | $\Delta$ | $\delta$
`\epsilon` | $\Epsilon$ | $\epsilon$
`\zeta` | $\Zeta$ | $\zeta$
`\nu` | $\Nu$ | $\nu$
`\xi` | $\Xi$ | $\xi$
`omicron` | $\Omicron$ | $\omicron$
`\pi` | $\Pi$ | $\pi$
`\rho` | $\Rho$ | $\rho$
`\sigma` | $\Sigma$ | $\sigma$
`\eta` | $\Eta$ | $\eta$
`\theta` | $\Theta$ | $\theta$
`\iota` | $\Iota$ | $\iota$
`\kappa` | $\Kappa$ | $\kappa$
`\lambda` | $\Lambda$ | $\lambda$
`\mu` | $\Mu$ | $\mu$
`\tau` | $\Tau$ | $\tau$
`\upsilon` | $\Upsilon$ | $\upsilon$
`\phi` | $\Phi$ | $\phi$
`\chi` | $\Chi$ | $\chi$
`\psi` | $\Psi$ | $\psi$
`\omega` | $\Omega$ | $\omega$

* 一些希腊字母具有变体形式，如`\epsilon \varepsilon` : $\epsilon$ $\varepsilon$ , `\phi \varphi` : $\phi$ $\varphi$

### 空间

通常MathJax通过内部策略自己管理公式内部的空间，因此`a   b`与`a      b`都会显示为$ab$。可以通过在ab间加入\,增加些许间隙，`\;`增加较宽间隙，`\quad`与`\qquad`会增加更大的间隙，如 `c \; a \quad b`: $c \; a \quad b$

### 顶部符号

对于单字符，`\hat` :  $\hat x$ ;
对于多字符，`\widehat` : $\widehat {xy}$
类似的还有 `\overline` , `\vec` , `\overrightarrow` ,`widetilde`, `\dot` , `\ddot` : $\overline {xyz}$ $\vec a$ $\overrightarrow x$ $\widetilde a$ $\dot x$ $\ddot x$

### 转义

一些MathJax使用的特殊字符，可以使用\转义为原来的含义，如`\$`表示$ , `\_`表示下划线。

## 表格

使用`$$\begin{array}{列样式}...\end{array}$$`这样的形式来创建表格，列样式可以是`clr`表示居中，左，右对齐，还可以使用`|`表示一条竖线。表格中各行使用`\\`分隔，各列使用`&`分隔，使用`\hline`在本行前加入一条直线。例如 

```
$$
\begin{array}{c|lcr} 
n & \text{Left} & \text{Center} & \text{Right} \\ 
\hline 
1 & 0.24 & 1 & 125 \\ 
2 & -1 & 189 & -8 \\ 
3 & -20 & 2000 & 1+10i \\ 
\end{array}
$$
``` 

结果：

$$
\begin{array}{c|lcr} 
n & \text{Left} & \text{Center} & \text{Right} \\ 
\hline 
1 & 0.24 & 1 & 125 \\ 
2 & -1 & 189 & -8 \\ 
3 & -20 & 2000 & 1+10i \\ 
\end{array}
$$

## 矩阵
使用`$$\begin{matrix}...\end{matrix}$$`来表示矩阵，在\begin与\end之间加入矩阵的元素即可。矩阵的行之间用\\分隔，列之间用&分隔。
例如 
```
$$
\begin{matrix}
 1 & x & x^2 \\
 1 & y & y^2 \\ 
 1 & z & z^2 
 \end{matrix}
$$
``` 
结果：
$$
\begin{matrix} 1 & x & x^2 \\ 1 & y & y^2 \\ 1 & z & z^2 \end{matrix}
$$

### 加括号

如果要对矩阵加括号，可以像上文中提到的那样，使用`\left`与`\right`配合表示括号符号。也可以使用特殊的matrix，即替换`\begin{matrix}...\end{matrix}`中的`matrix`为`pmatrix` , `bmatrix` , `Bmatrix` , `vmatrix` , `Vmatrix`.
如 

`pmatrix`: 
$$
\begin{pmatrix} 
1 & 2 \\ 
3 & 4 \\ 
\end{pmatrix}
$$ 

`bmatrix`: 
$$
\begin{bmatrix} 1 & 2 \\ 3 & 4 \\ \end{bmatrix}
$$ 

`Bmatrix`: 
$$\begin{Bmatrix} 1 & 2 \\ 3 & 4 \\ \end{Bmatrix}$$ 

`vmatrix`: 
$$
\begin{vmatrix} 1 & 2 \\  3 & 4 \\ \end{vmatrix}
$$ 

`Vmatrix`: 
$$
\begin{Vmatrix} 1 & 2 \\ 3 & 4 \\ \end{Vmatrix}
$$

### 省略元素
可以使用

`\cdots`: $\cdots$  
`\ddots`: $\ddots$   
`\vdots`: $\vdots$ 

来省略矩阵中的元素，如：
```
$$
\begin{pmatrix} 
1 & a_1 & a_1^2 & \cdots & a_1^n \\ 
1 & a_2 & a_2^2 & \cdots & a_2^n \\ 
\vdots & \vdots & \vdots & \ddots & \vdots \\ 
1 & a_m & a_m^2 & \cdots & a_m^n \end{pmatrix}
$$
```
$$
\begin{pmatrix} 
1 & a_1 & a_1^2 & \cdots & a_1^n \\ 
1 & a_2 & a_2^2 & \cdots & a_2^n \\ 
\vdots & \vdots & \vdots & \ddots & \vdots \\ 
1 & a_m & a_m^2 & \cdots & a_m^n \end{pmatrix}
$$

### 增广矩阵

增广矩阵需要使用前面的array来实现，如 `$$ \left[ \begin{array}{cc|c} 1 & 2 & 3 \\ 4 & 5 & 6 \end{array} \right] $$` 结果：

$$
 \left[ \begin{array}{cc|c} 1 & 2 & 3 \\ 4 & 5 & 6 \end{array} \right] 
$$ 

### 对齐的公式

有时候可能需要一系列的公式中等号对齐，如：
```
$$ 
\begin{align} 
\sqrt{37} & = \sqrt{\frac{73^2-1}{12^2}} \\ 
& = \sqrt{\frac{73^2}{12^2} \cdot \frac{73^2-1}{73^2}} \\ 
& = \frac{73}{12} \sqrt{1 - \frac{1}{73^2}} \\ 
& \approx \frac{73}{12} \left( 1 - \frac{1}{2 \cdot 73^2} \right) \end{align} 
$$
```
$$ 
\begin{align} 
\sqrt{37} & = \sqrt{\frac{73^2-1}{12^2}} \\ 
& = \sqrt{\frac{73^2}{12^2} \cdot \frac{73^2-1}{73^2}} \\ 
& = \frac{73}{12} \sqrt{1 - \frac{1}{73^2}} \\ 
& \approx \frac{73}{12} \left( 1 - \frac{1}{2 \cdot 73^2} \right) \end{align} 
$$

这时候需要使用形如`\begin{align}...\end{align}`的格式，其中需要使用&来指示需要对齐的位置。

### 分类表达式

定义函数的时候经常需要分情况给出表达式，可使用`\begin{cases}...\end{cases}`。其中，使用\来分类，使用&指示需要对齐的位置。如：
```
$$ 
f(n) = 
\begin{cases} n/2, & \text{if $n$ is even} \\ 
3n+1, & \text{if $n$ is odd} 
\end{cases} 
$$

```
$$ 
f(n) = 
\begin{cases} n/2, & \text{if $n$ is even} \\ 
3n+1, & \text{if $n$ is odd} 
\end{cases} 
$$

上述公式也可以移动到右侧，不过需要使用array来实现，如下：
```
$$
 \left.\begin{array}{l}
 \text{if $n$ is even:} & n/2 \\ 
 \text{if $n$ is odd:} & 3n+1 
 \end{array} \right\} 
 = f(n) 
 $$

```
 $$
 \left.\begin{array}{l}
 \text{if $n$ is even:} & n/2 \\ 
 \text{if $n$ is odd:} & 3n+1 
 \end{array} \right\} 
 = f(n) 
 $$

最后，如果需要让分类之间的垂直间隔变大，可以使用`\[2ex]`代替`\`来分隔不同情况。（3ex, 4ex也可以使用，1ex相当于原始距离）。

## 空间问题

在使用LaTex公式时，有一些不会影响公式正确性，但会使其看上去很糟糕的问题。

### 不要在指数或者积分中使用`\frac`

在指数或者基本表达式中使用`\frac`会使表达式看起来不清晰，因此在专业的数学排版中很少被使用。应该使用一个水平的`/`来代替，效果如下：

```
$$
\begin{array}{cc} 
\mathrm{Bad} & \mathrm{Better} \\ 
\hline \\ 
e^{i\frac{\pi}{2}} \quad e^{\frac{i\pi}{2}} & e^{i\pi/2} \\ 
\int_{-\frac{\pi}{2}}^{\frac{\pi}{2}} \sin x \, dx & \int_{-\pi/2}^{\pi/2} \sin x \, dx \\ 
\end{array} 
$$
```

$$
\begin{array}{cc} 
\mathrm{Bad} & \mathrm{Better} \\ 
\hline \\ 
e^{i\frac{\pi}{2}} \quad e^{\frac{i\pi}{2}} & e^{i\pi/2} \\ 
\int_{-\frac{\pi}{2}}^{\frac{\pi}{2}} \sin x \, dx & \int_{-\pi/2}^{\pi/2} \sin x \, dx \\ 
\end{array} 
$$

### 使用`\mid`代替`|`作为分隔符

符号|作为分隔符时有排版空间大小的问题，应该使用`\mid`代替，效果如下：

```
$$
\begin{array}{cc} 
\mathrm{Bad} & \mathrm{Better} \\ 
\hline \\ 
\{x | x^2 \in \Bbb Z\} & \{x \mid x^2 \in \Bbb Z \} 
\end{array}
$$
```

$$
\begin{array}{cc} 
\mathrm{Bad} & \mathrm{Better} \\ 
\hline \\ 
\{x | x^2 \in \Bbb Z\} & \{x \mid x^2 \in \Bbb Z \} 
\end{array}
$$

### 多重积分

对于多重积分，不要使用`\int\int`此类的表达，应该使用`\iint \iiint`等特殊形式，效果如下：

```
$$ 
\begin{array}{cc} 
\mathrm{Bad} \mathrm{Better} \\ 
\hline \\ 
\int\int_S f(x) \, dy \, dx & \iint_S f(x) \, dy \, dx \\ \int\int\int_V f(x) \, dz \, dy \, dx & \iiint_V f(x) \, dz \, dy \, dx 
\end{array} 
$$ 

```

$$ 
\begin{array}{cc} 
\mathrm{Bad} \mathrm{Better} \\ 
\hline \\ 
\int\int_S f(x) \, dy \, dx & \iint_S f(x) \, dy \, dx \\ \int\int\int_V f(x) \, dz \, dy \, dx & \iiint_V f(x) \, dz \, dy \, dx 
\end{array} 
$$ 

此外，在微分前应该使用`\`,来增加些许空间，否则$\TeX$会将微分紧凑地排列在一起，如下：

```
$$
 \begin{array}{cc}
 \mathrm{Bad} & \mathrm{Better} \\ 
 \hline \\ 
 \iiint_V f(x) dz dy dx & \iiint_V f(x) \, dz \, dy \, dx \end{array} 
$$ 

```

$$
 \begin{array}{cc}
 \mathrm{Bad} & \mathrm{Better} \\ 
 \hline \\ 
 \iiint_V f(x) dz dy dx & \iiint_V f(x) \, dz \, dy \, dx \end{array} 
$$ 

### 连分数

书写连分数表达式时，请使用`\cfrac`代替`\frac`或者`\over`，两者效果对比如下：

```
$$
x = a_0+\cfrac{1^2}{a_1+\cfrac{2^2}{a_2+\cfrac{3^2}{a_3+\cfrac{4^2}{a_4+\cdots}}}} \tag{\cfrac}
$$

$$
x = a_0+\frac{1^2}{a_1+\frac{2^2}{a_2+\frac{3^2}{a_3+\frac{4^2}{a_4+\cdots}}}} \tag{\frac}
$$

```


$$
x = a_0+\cfrac{1^2}{a_1+\cfrac{2^2}{a_2+\cfrac{3^2}{a_3+\cfrac{4^2}{a_4+\cdots}}}} \tag{\cfrac}
$$

$$
x = a_0+\frac{1^2}{a_1+\frac{2^2}{a_2+\frac{3^2}{a_3+\frac{4^2}{a_4+\cdots}}}} \tag{\frac}
$$

### 方程组

使用`\begin{array}...\end{array}`与`\left\{...`与`\right.`配合表示方程组，如：

```
$$ 

\left\{ \begin{array}{c} 
a_1x+b_1y+c_1z=d_1 \\ 
a_2x+b_2y+c_2z=d_2 \\ 
a_3x+b_3y+c_3z=d3 
\end{array} \right. 

$$

```

$$ 

\left\{ \begin{array}{c} 
a_1x+b_1y+c_1z=d_1 \\ 
a_2x+b_2y+c_2z=d_2 \\ 
a_3x+b_3y+c_3z=d3 
\end{array} \right. 

$$

同时，还可以使用`\begin{cases}...\end{cases}`表达同样的方程组，如：

$$ 
\begin{cases} a_1x+b_1y+c_1z=d_1 \\ a_2x+b_2y+c_2z=d_2 \\ a_3x+b_3y+c_3z=d_3 
\end{cases} 
$$

对齐方程组中的＝号，可以使用`\begin{aligned}...\end{aligned}`，如：

$$ 
\left\{ \begin{aligned} 
a_1x+b_1y+c_1z & = d_1+e_1 \\ 
a_2x+b_2y & = d_2 \\ 
a_3x+b_3y+c_3z & = d_3 
\end{aligned} \right. 
$$

## 颜色

命名颜色是浏览器相关的，如果浏览器没有定义相关的颜色名称，则相关文本将被渲染为黑色。以下颜色是HTML4和CSS2标准中定义的一些颜色，其应该被大多数浏览器定义了。

$$ 
 \begin{array}{|rc|} \hline \\
 \verb+\color{black}{text}+ & \color{black}{text} \\ 
 \verb+\color{gray}{text}+ & \color{gray}{text} \\ 
 \verb+\color{silver}{text}+ & \color{silver}{text} \\ 
 \verb+\color{white}{text}+ & \color{white}{text} \\ 
 \hline \\ 
 \verb+\color{maroon}{text}+ & \color{maroon}{text} \\ 
 \verb+\color{red}{text}+ & \color{red}{text} \\ 
 \verb+\color{yellow}{text}+ & \color{yellow}{text} \\ 
 \verb+\color{lime}{text}+ & \color{lime}{text} \\ 
 \verb+\color{olive}{text}+ & \color{olive}{text} \\ 
 \verb+\color{green}{text}+ & \color{green}{text} \\ 
 \verb+\color{teal}{text}+ & \color{teal}{text} \\ 
 \verb+\color{aqua}{text}+ & \color{aqua}{text} \\ 
 \verb+\color{blue}{text}+ & \color{blue}{text} \\ 
 \verb+\color{navy}{text}+ & \color{navy}{text} \\ 
 \verb+\color{purple}{text}+ & \color{purple}{text} \\ 
 \verb+\color{fuchsia}{text}+ & \color{fuchsia}{text} \\ 
 \verb+\color{magenta}{text}+ & \color{magenta}{text} \\ 
 \hline \end{array} 
$$

此外，HTML5和CSS3也定义了一些颜色名称，参见[](http://www.w3.org/TR/css3-color/#svg-color)。同时，颜色也可以使用#rgb的形式来表示，如下：

$$ 
\begin{array}{rrrrrrrr} \hline 
\verb+#000+ & \color{#000}{text} & & & \verb+#00F+ & \color{#00F}{text} & & \\ 
& & \verb+#0F0+ & \color{#0F0}{text} & & & \verb+#0FF+ & \color{#0FF}{text} \\ 
\verb+#F00+ & \color{#F00}{text} & & & \verb+#F0F+ & \color{#F0F}{text} & & \\ 
& & \verb+#FF0+ & \color{#FF0}{text} & & & \verb+#FFF+ & \color{#FFF}{text} & & \\
\hline 
\end{array} 
$$

[HTML色彩快速参考手册](http://www.w3schools.com/html/html_colors.asp)

## 公式标记与引用
使用`\tag{yourtag}`来标记公式，如果想在之后引用该公式，则还需要加上`\label{yourlabel}`在`\tag`之后，如：

```
$$ a:= x^2-y^3 \tag{*}\label{*} $$

```

$$ a:= x^2-y^3 \tag{*}\label{*} $$

为了引用公式，可以使用`\eqref{rlabel}`，如：

```
$$ a+y^3 \stackrel{\eqref{*}}=x^2 $$ 

```

$$ a+y^3 \stackrel{\eqref{*}}=x^2 $$ 
可以看到，通过超链接可以跳转到被引用公式的位置。