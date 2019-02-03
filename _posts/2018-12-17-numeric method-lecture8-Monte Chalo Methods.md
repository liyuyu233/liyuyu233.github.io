---
title: 蒙特卡洛模拟
layout: post
---

# 背景

计算随机变量 $X$ 的函数 $g(X)$ 的期望时，经常采用两种不同的方法
* 对 $g$ 在 $X$ 的分布上积分：
  $$
    E[g(X)]=\int_{-\infty}^{\infty}g(x)dF(X)=\int_{-\infty}^{\infty}g(x)f(x)dx
  $$
* 大数定理：
  $$
    E[g(X)]=\lim_{n \to \infty} \frac{1}{n}\sum_{i=1}^{n}g(X_i)
  $$
  其中 $X_i$ 是 $X$ 的样本。

第一种方法可能会比较难。

# 产生随机数
蒙特卡洛模拟的核心在于如何产生符合给定分布的函数 $F(X)$ 的样本。

定理：给定随机变量 $X$ 与严格递增的值域为 $[0,1]$ 的函数 $F(x)$，则$X$ 的分布就是 $F(X)$

# 逆变换 Inverse Transformation
# 接受-拒绝方法 Accept-Reject Method
# Box-Mulle 方法
# 相关正态随机分布变量 Correlated Normal Random Variables