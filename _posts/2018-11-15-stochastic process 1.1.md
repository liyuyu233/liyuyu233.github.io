# 随机过程1.1
这一章主要介绍了样本空间、 $\sigma$域、概率、事件列的基本概念、相关定理或命题及其证明。

## 样本空间 $\varOmega$
样本空间是随机试验可能出现的所有结果的集合。

## $\sigma$ 域
$\sigma$ 域是一种对交、并、差运算封闭的集类。具体而言，如果由 $\varOmega$ 的一些子集构成的非空集类 $\mathcal{F}$ 满足

$$
A \in \mathcal{F}, A^C = \varOmega - A \to A^C \in \mathcal{F}\\
A_i \in \mathcal{F}, i \in N \to \bigcup_{i=1}^{\infty} A_i \in \mathcal{F}

$$

则称 $\mathcal{F}$ 为 $\sigma$ 域。

最小 $\sigma$ 域：$A$ 为 $\varOmega$ 的一些子集构成的集类，一切包含 $A$ 的 $\sigma$ 域的交即为包含 $A$ 的最小 $\sigma$ 域（或者由 $A$ 生成的 $\sigma$ 域），记为 $\sigma(A)$

一维Borel $\sigma$ 域： 即 $\sigma((-\infty, a], \forall a \in R)$ ，记为 $B$ 

> 一维Borel $\sigma$ 域可以理解为包含一切点集、开集、闭集、左开右闭集、左闭右开集以及它们经过可列次交、并、差运算所得到的集合的集类。

## 概率
概率表示事件发生的可能性。是一个定义在 $\mathcal{F}$ 上的集函数，满足  
1. （非负性）$P(A) \ge 0, \forall A \in \mathcal{F}$ 
2. （规一性）$P(\varOmega)=1$ 
3. （可列可加性）若 
   $$
   A_i \in \mathcal{F}, i=1,2,\dots\\
   A_iA_j=\phi，\forall i \neq j
   $$

   则

   $$
   P(\bigcup_{i=1}^{\infty} A_i)=\sum_{i=1}^{\infty} P(A_i)
   $$

称 $(\varOmega, \mathcal{F}, P)$ 为概率空间

## 事件列的极限
序列$\lbrace A_n,n\ge 1\rbrace$ 若满足$A_n \subset A_{n+1}, n \ge 1$，则该序列为单调增序列，其极限

$$
\lim\limits_{n \rightarrow \infty} A_n=\bigcup_{i=1}^{\infty}A_i
$$

序列$\lbrace A_n,n\ge 1\rbrace$ 若满足$A_n \supset A_{n+1}, n \ge 1$，则该序列为单调减序列，其极限

$$
\lim\limits_{n \rightarrow \infty} A_n=\bigcap_{i=1}^{\infty}A_i
$$

**连续性定理**：
若$\lbrace A_n,n\ge 1\rbrace$是单调增（减）序列，则

$$
P(\lim\limits_{n \rightarrow +\infty}A_n)=\lim\limits_{n \rightarrow  +\infty}P(A_n)
$$