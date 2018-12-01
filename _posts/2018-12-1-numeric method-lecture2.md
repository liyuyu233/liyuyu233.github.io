---
title: 近似法，数值微分与积分
layout: post
---

- [近似法、数值微分法与积分法 Approximations, Numerical Differentiation and Integration](#%E8%BF%91%E4%BC%BC%E6%B3%95%E6%95%B0%E5%80%BC%E5%BE%AE%E5%88%86%E6%B3%95%E4%B8%8E%E7%A7%AF%E5%88%86%E6%B3%95-approximations-numerical-differentiation-and-integration)
  - [目标](#%E7%9B%AE%E6%A0%87)
  - [泰勒展开](#%E6%B3%B0%E5%8B%92%E5%B1%95%E5%BC%80)
  - [拉格朗日多项式→拉格朗日插值法](#%E6%8B%89%E6%A0%BC%E6%9C%97%E6%97%A5%E5%A4%9A%E9%A1%B9%E5%BC%8F%E2%86%92%E6%8B%89%E6%A0%BC%E6%9C%97%E6%97%A5%E6%8F%92%E5%80%BC%E6%B3%95)
    - [推导](#%E6%8E%A8%E5%AF%BC)
    - [定理](#%E5%AE%9A%E7%90%86)
    - [拉格朗日插值法的误差分析](#%E6%8B%89%E6%A0%BC%E6%9C%97%E6%97%A5%E6%8F%92%E5%80%BC%E6%B3%95%E7%9A%84%E8%AF%AF%E5%B7%AE%E5%88%86%E6%9E%90)
      - [定理及其证明](#%E5%AE%9A%E7%90%86%E5%8F%8A%E5%85%B6%E8%AF%81%E6%98%8E)
      - [推论](#%E6%8E%A8%E8%AE%BA)
      - [评价](#%E8%AF%84%E4%BB%B7)
- [数值微分](#%E6%95%B0%E5%80%BC%E5%BE%AE%E5%88%86)
  - [步骤](#%E6%AD%A5%E9%AA%A4)
  - [两点法](#%E4%B8%A4%E7%82%B9%E6%B3%95)
  - [三点法](#%E4%B8%89%E7%82%B9%E6%B3%95)
- [舍入误差round off error instability](#%E8%88%8D%E5%85%A5%E8%AF%AF%E5%B7%AEround-off-error-instability)
- [数值积分](#%E6%95%B0%E5%80%BC%E7%A7%AF%E5%88%86)
  - [步骤](#%E6%AD%A5%E9%AA%A4-1)
  - [梯形法则](#%E6%A2%AF%E5%BD%A2%E6%B3%95%E5%88%99)
  - [辛普森法则](#%E8%BE%9B%E6%99%AE%E6%A3%AE%E6%B3%95%E5%88%99)
    - [形式](#%E5%BD%A2%E5%BC%8F)
  - [精确度确定](#%E7%B2%BE%E7%A1%AE%E5%BA%A6%E7%A1%AE%E5%AE%9A)
  - [牛顿科茨公式 Newton-Cotes Formulas](#%E7%89%9B%E9%A1%BF%E7%A7%91%E8%8C%A8%E5%85%AC%E5%BC%8F-newton-cotes-formulas)
  - [复合积分法 Composite Numerical Integration](#%E5%A4%8D%E5%90%88%E7%A7%AF%E5%88%86%E6%B3%95-composite-numerical-integration)
    - [复合辛普森法则](#%E5%A4%8D%E5%90%88%E8%BE%9B%E6%99%AE%E6%A3%AE%E6%B3%95%E5%88%99)
      - [评价](#%E8%AF%84%E4%BB%B7-1)
      - [复合辛普森法则的算法](#%E5%A4%8D%E5%90%88%E8%BE%9B%E6%99%AE%E6%A3%AE%E6%B3%95%E5%88%99%E7%9A%84%E7%AE%97%E6%B3%95)
  - [数值积分法的稳定性](#%E6%95%B0%E5%80%BC%E7%A7%AF%E5%88%86%E6%B3%95%E7%9A%84%E7%A8%B3%E5%AE%9A%E6%80%A7)
  - [自适应方法 self-adaptive method](#%E8%87%AA%E9%80%82%E5%BA%94%E6%96%B9%E6%B3%95-self-adaptive-method)
    - [自适应的辛普森法则](#%E8%87%AA%E9%80%82%E5%BA%94%E7%9A%84%E8%BE%9B%E6%99%AE%E6%A3%AE%E6%B3%95%E5%88%99)


# 近似法、数值微分法与积分法 Approximations, Numerical Differentiation and Integration

## 目标

* 求解 $\int_a ^b f(x)dx$ 形式的定积分。其中 $f(x)$ 可以是任意可积方程。
* 如果能找到原函数 $F(x)$ ，则 $\int_a ^b f(x)dx=F(b)-F(a)$
* 如果找不到原函数，考虑将 $f$ 用满足以下条件的 $g$ 替代：
  * $g$ 在某种程度上接近 $f$
  * 计算 $\int_a ^b g(x)dx$ 更加简单
* $g$ 的选择可以考虑 $\color{aqua}{多项式}$ ：
  * 魏尔斯特拉斯定理（Weierstrass Approximation Theorem）：闭区间上的任意连续函数都能由一个多项式一致趋近。any continuous function on a closed interval can be uniformly approximated by a polynomial
  * 多项式积分很简单，而且结果也还是多项式。

---

## 泰勒展开
考虑一个足够光滑的函数 $f$，它在 $x_0$ 点附近的泰勒展开为：

$$
f(x)=f(x_0)+f'(x_0)(x-x_0)+\frac{1}{2}f''(x_0)(x-x_0)^2+\cdots+\frac{1}{n!}f^{(n)}(x_0)(x-x_0)^n+\cdots
$$

但是泰勒展开并不总是 $f$ 的良好估计，这是因为：
1. 用于估计的信息集中在单点 $x_0$ 上，所以当远离这一点时，估计变得不准确。
2. 所以包含多点信息的估计方式会更有效。

  > 但一般而言泰勒展式并不是接近一个函数的好的方法：  
  它使用的只有函数的一个点，没有函数的其他信息。  
  → 需要使用尽可能多的点的信息  
  → 多项式应该穿过这些点  
  → 方程组  
  → 系数是一个范德蒙行列式  
  → 只有一个解  
  → 拉格朗日插值法（来聪明地求解） 

## 拉格朗日多项式→拉格朗日插值法
### 推导
* 对于 $n+1$ 个不同的点 $(x_0,y_0),\cdots,(x_n,y_n)$，有唯一的n阶多项式 $P_n(X)$ 能够使 $P_n(x_k)=y_k$ 对于所有的 $k=0,1,\cdots, n$ 都成立。
* 这样一个多项式的性质是：
  * 所有的 $L_k(x)$ 都是n阶多项式。
  * $$
    L_{n,k}(x_j)=\left\{\begin{align}
    &0,&j \not= k\\
    &1,&j = k
    \end{align}\right
    $$
  可以得到 $P_n(x)=\sum_{k=0} ^n y_k L_{n,k}(x)$
* $L_{n,k}(x)$ 可以构造为
  $$
  L_{n,k}(x)=\frac{\prod_{j \neq k} (x-x_j)}{\prod_{j \neq k} (x_k-x_j)}
  $$ 

### 定理
If $x_0, x_1, \cdots , x_n$ are $n + 1$ distinct numbers and $f$ is a function whose values are given at these numbers, then a unique polynomial $P(x)$ of degree at most $n$ exists with $f (x_k ) = P(x_k )$ , for each $k = 0, 1,\cdots, n$ . This polynomial is 

$$
P(x) = f (x_0)L_{n,0}(x) + \cdots + f (x_n)L_{n,n}(x) = \sum_{k=0}^{n}f(x_k)L_{n,k}(x)
$$
where, for each $k = 0, 1,\cdots, n$

$$
  L_{n,k}(x)=\frac{\prod_{j \neq k} (x-x_j)}{\prod_{j \neq k} (x_k-x_j)}
$$ 

### 拉格朗日插值法的误差分析

#### 定理及其证明
* (Theorem) Suppose $x_0, x_1, \cdots, x_n$ are distinct numbers in the interval $[a, b]$ and $f \in C^{n+1}[a, b]$. Then, for each $x \in [a, b]$, a number $\xi (x)$ (generally unknown) between $x_0, x_1, \cdots, x_n$, and hence in $(a, b)$, exists with

$$
f (x) = P(x) + \frac{f^{(n+1)}(\xi(x))}{(n+1)!}(x-x_0)(x-x_1)\cdots(x-x_n)
$$

#### 推论
设 $f$ 在 $(a,b)$ 上的 n+1 阶导数满足 $|f^{(n+1)}(x)|\le C$ ,则n阶拉格朗日插值的误差满足
$$
|f(x)-P(x)|\le\frac{M(b-a)^n}{(n+1)!}
$$

#### 评价
高阶多项式在现实中常常不是很好的选择。其他的选择，比如后面将要讨论的三次样条函数cubic splines，更加合理。

> 一般而言高次多项式剧烈震荡，因此可以用样条插值法：  
>
> 把点分组，每一组分别用多项式近似，再把这些函数连接起来。

---

# 数值微分
假设已知函数 $f \in C^{(n+1)}(I)$ ，以及在不同的点 $x_0,x_1,\cdots, x_n$ 上的函数值。那么对于任意的 $x \in I$ ，如何估计f'(x)?

首先用拉格朗日多项式 $P$ 近似 $f$ ,再用 $P$ 的导数来近似 $f$ 的导数。$\color{aqua}{使用拉格朗日插值法，再对函数的两边求导（余项也要求导）}$


## 步骤
已知
$$
f (x) = \sum_{k=0}^{n}f(x_k)L_{n,k}(x) + \frac{f^{(n+1)}(\xi(x))}{(n+1)!}(x-x_0)(x-x_1)\cdots(x-x_n)
$$

因此

$$
f'(x) = \sum_{k=0}^{n}f(x_k)L'_{n,k}(x) + D_x\frac{f^{(n+1)}(\xi(x))}{(n+1)!}(x-x_0)(x-x_1)\cdots(x-x_n) + \frac{f^{(n+1)}(\xi(x))}{(n+1)!}D_x((x-x_0)(x-x_1)\cdots(x-x_n))
$$

当 $x=x_j$ 时，有

$$
\color{aqua}
f'(x_j) = \sum_{k=0}^{n}f(x_k)L'_{n,k}(x_j) + \frac{f^{(n+1)}(\xi(x_j))}{(n+1)!}\prod _{i \neq j}(x_j-x_i)
$$

$$
\color{aqua}
  L_{n,k}(x)=\frac{\prod_{j \neq k} (x-x_j)}{\prod_{j \neq k} (x_k-x_j)}
$$ 

## 两点法

假设已知两点 $x_0, x_1=x_0+h$ 的函数值，可以得到以下形式：

$$
f(x)=f(x_0)\frac{(x-x_1)}{(x_0-x_1)}+f(x_1)\frac{(x-x_0)}{(x_1-x_0)}+\frac{f''(\xi(x))}{2}(x-x_0)(x-x_1)
$$

则 
$$
\begin{align}
f'(x)&=\frac{f(x_1)-f(x_0)}{h}+ D_x[\frac{(x-x_0)(x-x_0-h)}{2}f''(\xi(x))]\\
&= \frac{f(x_0+h-f(x_0))}{h}+\frac{2(x-x_0)-h}{2}f''(\xi(x))+\frac{(x-x_0)(x-x_0-h)}{2}D_x(f''(\xi(x)))
\end{align}
$$

得到向前差分接近 Forward difference approximation
$$
f'(x_0)=\frac{f(x_0+h)-f(x_0)}{h} - \frac{h}{2}f''(\xi_0)
$$

与向后差分接近 Backward difference approximation 
$$
f'(x_1)=\frac{f(x_1)-f(x_1-h)}{h} + \frac{h}{2}f''(\xi_1)
$$

## 三点法
$$
f(x)=f(x_0)\frac{(x-x_1)(x-x_2)}{(x_0-x_1)(x_0-x_2)}+f(x_1)\frac{(x-x_0)(x-x_2)}{(x_1-x_0)(x_1-x_2)}+f(x_2)\frac{(x-x_0)(x-x_1)}{(x_2-x_0)(x_2-x_1)}+\frac{f^{(3)}(\xi(x))}{6}(x-x_0)(x-x_1)(x-x_2)
$$

$$
f'(x_0)=\frac{1}{h} [-\frac{3}{2}f(x_0)+2f(x_1)-\frac{1}{2}f(x_2)]+\frac{h^2}{3}f^{(3)}(\xi_0)
$$

$$
f'(x_1)=\frac{1}{h} [-\frac{1}{2}f(x_0)+\frac{1}{2}f(x_2)]-\frac{h^2}{6}f^{(3)}(\xi_1)
$$

$$
f'(x_2)=\frac{1}{h} [\frac{1}{2}f(x_0)-2f(x_1)+\frac{3}{2}f(x_2)]+\frac{h^2}{3}f^{(3)}(\xi_2)
$$

还可以求二阶导
$$
f''(x_0)=\frac{1}{h^2}[f(x_0-h)-2f(x_0)+f(x_0+h)]-\frac{h^2}{12}f^{(4)}(\xi_0)
$$

# 舍入误差round off error instability

真实值=储存值+舍入误差  
整体误差=理论真实值-计算结果=舍入误差+截断误差  
 
由于舍入误差，数值微分法是不稳定的。  
一般而言，在数值计算中我们应该避免用较小的数字作为分母。  
步长h对整体误差的影响：舍入误差随h减小而增大  

---

# 数值积分

基本方法：数值求积法numerical quadrature，即用有限积 $\sum_{i=0}^n a_if(x_i)$ 来接近积分 $\int_a^bf(x)dx$

## 步骤
1. 选择一系列插值点： $x_i: i=0,1,\cdots,n$
2. 建立经过插值点的拉格朗日多项式：
   $$
   f(x)= \sum_{i-0}^nf(x_i)L_i(x)+\frac{f^{(n+1)}(\xi(x))}{(n+1)!}\prod_{i-0}^n(x-x_i)
   $$
3. 对等式两边求导，得
   $$
   \int_a^bf(x)dx= \sum_{i-0}^nf(x_i)\int_a^bL_i(x)+\int_a^b\frac{f^{(n+1)}(\xi(x))}{(n+1)!}\prod_{i-0}^n(x-x_i)
   $$
4. 忽视残差项

## 梯形法则

只有两个点的时候用直线拟合一个函数

$$
P_1(x)=\frac{(x-x_1)}{(x_0-x_1)}f(x_0)+\frac{(x-x_0)}{(x-x_0)}f(x_1)
$$

$$
\int_{x_0}^{x_1}f(x)dx=\int_{x_0}{x_1}\frac{(x-x_1)}{(x_0-x_1)}f(x_0)dx+\int_{x_0}^{x_1}\frac{(x-x_0)}{(x-x_0)}f(x_1)dx+\int_{x_0}^{x_1}\frac{f''(\xi(x))}{2}(x-x_0)(x-x_1)dx
$$

根据中值定理，存在 $\xi$ 使得
$$
\begin{align}
& int_{x_0}^{x_1}\frac{f''(\xi(x))}{2}(x-x_0)(x-x_1)dx\\
=& \frac{f''(\xi(x))}{2}int_{x_0}^{x_1}(x-x_0)(x-x_1)dx\\
=& -\frac{h^3}{6}f''(\xi)
\end{align}
$$

得到$\color{aqua}{梯形法则}$

$$
\int_{x_0}^{x_1} f(x)dx=\frac{x_1-x_0}{2}(f(x_0)+f(x_1))-\frac{h^3}{6}f''{\xi}
$$

> 误差来自于二阶导数
> 
> 二阶导数衡量的是函数的弯曲程度

## 辛普森法则

有三个点用二次函数进行拟合（假定这三个点是等距离的）

### 形式
$$
\int_{x_0}^{x_2}f(x)dx=\frac{h}{3}(f(x_0)+4f(x_1)+f(x_2)) - \frac{h^5}{90}f^(4)(\xi)
$$

辛普森法则对于至多三次的函数都是精确的

## 精确度确定

求积法的精确度取决于 $x^k, k = 0,1,\cdots,n$ 中最大的正整数n。

梯形法则与辛普森法则的精确度分别是1和3。

梯形法则与辛普森法则只是牛顿科茨公式的特殊例子。

## 牛顿科茨公式 Newton-Cotes Formulas

牛顿科茨公式在大的插值区间integration intervals上的近似比较糟糕（因为需要更多点的函数值以及高阶多项式是震荡的 oscillatory

更多牛顿科茨法相关信息请见课本p199-201

需要拟合大区间的时候，可以将区间分割成小区间，在每个小区间上求，再加到一起。这种方法叫做复合积分法。

## 复合积分法 Composite Numerical Integration

把大的求解区间分割为小的求解区间再把每个区间上的积分加起来（一般而言划分成偶数个小区间：辛普森法则一般要用三个点（两个小区间））

### 复合辛普森法则

选择一个偶数 $n=2m$ ，将区间 $[a,b]$ 分割为 $n$ 个子区间，在连续的两个子区间上运用辛普森法则。

在子区间 $[x_{2k},x_{x_{2k+1}}]$ 与 $[x_{2k+1},x_{x_{2k+2}}]$ 上，辛普森法则为 

$$
\int_{x_{2k}}^{x_{2k+2}}f(x)dx=\frac{h}{3}(f(x_{2k})+4f(x_{2k+1})+f(x_{2k+2}))-\frac{h^5}{90}f^(4)(\xi_k)
$$

加起来之后的误差为

$$
\begin{align}
E(f)&=-\frac{h^5}{90}\sum_{k=0}^{m-1}f^{(4)}(\xi_k)\\
&=-\frac{h^5}{180}nf^{(4)}(\xi)\\
&=-\frac{(b-a)h^4}{180}f^{(4)}(\xi)
\end{align}
$$

假设 $f$ 是 $C^4$

#### 评价
复合辛普森法则的误差是 $O(h^4)$ 的，辛普森法则的误差是 $O(h^4)$ 的。但是这两个是不可比的，因为步长不同。

#### 复合辛普森法则的算法
INPUT endpoints a, b; even positive integer n.
OUTPUT approximation XI to I.
Step 1 Set h = (b − a)/n.
Step 2 Set XI0 = f (a) + f (b);
XI1 = 0; (Summation of $f (x_{2i−1})$.)
XI2 = 0. (Summation of $f (x_{2i})$.)
Step 3 For i = 1, . . . , n − 1 do Steps 4 and 5.
Step 4 Set X = a + ih.
Step 5 If i is even then set XI2 = XI2 + f (X)
else set XI1 = XI1 + f (X).
Step 6 Set XI = h(XI0 + 2 · XI2 + 4 · XI1)/3.
Step 7 OUTPUT (XI);
STOP.

## 数值积分法的稳定性
随区间的增大而减小。

Suppose we apply the composite Simpsons rule with $n$ subintervals to a function $f$ on $[a; b]$ and determine the maximum bound for the round-of error. Assume that $f (xi )$ is
approximated by $f* (x_i )$, that is, $f (x_i ) = f* (x_i ) + e_i$

Thus, the total round-off error is 
$$
\begin{align}
e(h) &= |\frac{h}{3}[e_0+2sum_{j=0}^{n/2-1}e_{2j}+4\sum_{j=1}{n/2}e_{2j-1}+e_n]|\\
&\le  \frac{h}{3}[|e_0|+2sum_{j=0}^{n/2-1}|e_{2j}|+4\sum_{j=1}{n/2}|e_{2j-1}|+|e_n|]\\
&\le \frac{h}{3}[\epsilon+2\sum_{j=0}^{n/2-1}\epsilon+4\sum_{j=1}{n/2}\epsilon+\epsilon]\\
& = nh\epsilon\\
& = (b-a)\epsilon
\end{align}
$$


## 自适应方法 self-adaptive method
p 221

Composite method can be ineective when integrating functions with large variation 

For these functions, higher order method needs to be implemented over regions with large variation

Self-adaptive methods can be used in this case (In fact, adaptive quadrature is implemented in most scientic computing packages such as MATLAB)

### 自适应的辛普森法则
Suppose that we want to approximate $\int_a^bf (x)dx$ with a
specied tolerance $\epsilon > 0$

第一步：应用辛普森法则

$$
\int_a^b f(x)dx=S(a,b)-\frac{h^5}{90}f^{(4)}(\xi)
$$

$$
S(a,b)=\frac{h}{3}(f(a)+4f(\frac{a+b}{2})+f(b))
$$

第二步：将区间分割为两个子区间，运用复合辛普森法则，得到

$$
\int_a^bf(x)dx=S(a,\frac{a+b}{2})+S(\frac{a+b}{2},b)+-\frac{1}{16}\frac{h^5}{90}f^{(4)}(\hat\xi)
$$

第三步：假设 $f^{(4)}(\xi) \approx f^{(4)}(\hat\xi)$，得到

$$
\frac{h^5}{90}f^{(4)}(\hat\xi) \approx \frac{16}{15}[S(a,b)-S(a,\frac{a+b}{2})+S(\frac{a+b}{2},b)]
$$

即

$$
|\int_a^bf(x)dx-S(a,\frac{a+b}{2})-S(\frac{a+b}{2},b)|\approx |-\frac{1}{16}\frac{h^5}{90}f^{(4)}(\xi)| \approx \frac{1}{15}|S(a,b)-S(a,\frac{a+b}{2})-S(\frac{a+b}{2},b)|
$$

