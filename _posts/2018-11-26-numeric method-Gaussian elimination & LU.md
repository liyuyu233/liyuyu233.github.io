---
title: 高斯消元法&LU分解&QR分解
layout: post
---
- [高斯消元法](#%E9%AB%98%E6%96%AF%E6%B6%88%E5%85%83%E6%B3%95)
    - [选主元Pivoting](#%E9%80%89%E4%B8%BB%E5%85%83pivoting)
- [LU分解](#lu%E5%88%86%E8%A7%A3)
    - [性质](#%E6%80%A7%E8%B4%A8)
    - [作用：](#%E4%BD%9C%E7%94%A8)
        - [解方程组](#%E8%A7%A3%E6%96%B9%E7%A8%8B%E7%BB%84)
        - [计算行列式](#%E8%AE%A1%E7%AE%97%E8%A1%8C%E5%88%97%E5%BC%8F)
- [QR分解](#qr%E5%88%86%E8%A7%A3)
    - [格拉姆施密特正交化过程](#%E6%A0%BC%E6%8B%89%E5%A7%86%E6%96%BD%E5%AF%86%E7%89%B9%E6%AD%A3%E4%BA%A4%E5%8C%96%E8%BF%87%E7%A8%8B)

# 高斯消元法

由于计算机不擅长解微积分（理想化的东西太多）而擅长线性代数，所以……

方法：高斯消元法——加减乘除消元

灵感来源：三角矩阵非常好解

```
# 解对角矩阵
for i = n : -1 : 1 % 反向循环：从n到1， 每次-1
    x(i)=b(i);
    for j = n :-1 :i+1
        x(i) = x(i) - a(i,j)*x(j)
    end
    x(i)=x(i)/a(i,i)
end
```

初等变幻：
```
# 解三角矩阵
for i = 1 : (n-1) 
    for j = (i+1):n %（n-i+2)*(n-i) 次乘法
        mj = -a(j,i)/a(i,i)
        for k = (i+1):n % n-i 次乘法
            a(j,k) = a(j,k)+mj*a(i,k);
        end 
        b(j)=b(j)+mj*b(i);
    end
end
```
算法效率：数进行了几次加减乘除的运算
对于高斯消元法，需要 $O(n^3/3)$ 次(总共是 $\sum  _{i=1} ^{n-1} （n-i+2)*(n-i)$ 次乘法)

## 选主元Pivoting
简单地说就是如果某一列的第一项系数为零的话就从下面找一个不为零的调换位置。选绝对值最大的那个会便于计算。如果这个值小的话，可能会带来很大的$\color{aqua}{舍入误差}$（因为要拿过去除，见前面`mj`的算法）然后达到 $a_{ii} \not= 0$ 的目的。

> $\color{aqua}{舍入误差}$: 由于计算机位数的问题（四舍五入了）造成的误差。数字越大误差越大（自行举例）。

```
选主元操作
for i = 1 : (n-1) 
    maxValue = abs(a(i,i)); rowIndex = i;
    for j = (i+1):n 
        if abs(a(j,i))>maxValue
            maxValue = abs(a(j,i));
            rowIndex = j;
    end

    tmpRow = a(i,:);tmpb=b(i);
    a(i,:) = a (rowIndex,:); b(i)=b(rowIndex);
    a(rowIndex,;) = tmpRow; b(rowIndex)=tmpb;
    
    ......
    
    end
end

```
选主元失败：意味着这个线性方程组没有唯一解，它是奇异的，这个时候return 1。

# LU分解

如果 $Ax=b_1$，$Ax=b_2$，...  
怎么解？

由线性代数可知，对矩阵进行初等运算相当于将该矩阵乘以一个单位矩阵。

高斯消元第一步相当于

$$
\begin{bmatrix}
1 & 0 & 0 & \cdots\\
\frac{a_{21}}{a_{11}} & 1 & 0 & \cdots \\
\frac{a_{31}}{a_{11}} & 0 & 1 & \cdots \\
\vdots & \vdots & \vdots & \ddots
\end{bmatrix}A
$$

接下来的几步就相当于

$$L_{n-1}L_{n-2}...L_1A=U \Rightarrow A= L_1^{-1}L_2^{-1}...L_{n-1}^{-1}U=LU$$

$L$代表下三角矩阵，$U$代表上三角矩阵。  
限定$L$的对角线上的元素都是1的时候，$L$是唯一的

## 性质
LU分解需要$O(n^3)$次操作（同高斯消元）。  

需要选主元的时候也有LU分解。
## 作用：

### 解方程组
得到
$$
Ax=b \Rightarrow LUx=b
$$

然后解

$$
Ly=b \\
Ux=y
$$

### 计算行列式

$$|A|=|L||U|$$

能够极大地减少运算量。

# QR分解
有一个非奇异的矩阵$A$，一定能分解成$A=QR$

$Q$是正交矩阵，$R$是上三角矩阵。

> 正交矩阵是指 $Q^T=Q^{-1}$ 的矩阵

$$
\begin{align}
A &=QR\\
Ax &=b\\
QRx &=b\\
Q^TQRx &=Q^Tb\\
Rx &=Q^Tb
\end{align}
$$

## 格拉姆施密特正交化过程
首先，对于$(a_1,a_2,...,a_n)$找标准正交基

$$
\begin{align}
b_1 &=a_1 \Rightarrow e_1=\frac{b_1}{|b_1|}\\
b_2 &=a_2-<a_2,e_1>e_1 \Rightarrow e_2=\frac{b_2}{|b_2|}\\
b_3 &=a_3-<a_3,e_1>e_1-<a_3,e_2>e_2 \Rightarrow e_3=\frac{b_3}{|b_3|}\\
&...
\end{align}
$$

易知$<b_1,b_2>=0$, ...

这些标准正交基排列起来可以得到一个正交矩阵。从而

$$
\begin{align}
a_1 &=|b_1|e_1\\
a_2 &=|b_2|e_2 + <a_2,e_1>e_1\\
a_3 &=|b_3|e_3 + <a_3,e_1>e_1 + <a_3,e_2>e_2\\
&...
\end{align}
$$

$$
(a_1,a_2,...a_n)=(e_1,e_2,...,e_n)
\begin{bmatrix}
|b_1| & <a_2,e_1> & <a_3,e_1> & \cdots\\
0 & |b_2| & <a_3,e_2> & \cdots\\
0 & 0 & |b_3| & \cdots\\
\vdots & \vdots & \vdots & \ddots\\
\end{bmatrix}
$$

