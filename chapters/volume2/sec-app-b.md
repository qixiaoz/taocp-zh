<a id="pdf-587"></a><a id="p-576"></a>

<a id="sec-app-b"></a>

# 附录 B　记号索引

在下列公式中, 未作说明的字母的意义如下:

| 字母 | 意义 |
| :--- | :--- |
| $j,k$ | 整数值的算术表达式 |
| $m,n$ | 非负整数值的算术表达式 |
| $x,y$ | 实数值的算术表达式 |
| $z$ | 复数值的算术表达式 |
| $f$ | 实数值或复数值的函数 |
| $S,T$ | 集合或多重集合 |

<a id="pdf-588"></a><a id="p-577"></a>

<a id="pdf-589"></a><a id="p-578"></a>

<a id="pdf-590"></a><a id="p-579"></a>

| <span style="white-space:nowrap">形式符号</span> | <span style="white-space:nowrap">含义</span> | <span style="white-space:nowrap">定义位置</span> |
| :--- | :--- | :--- |
| ▮ | 算法、程序或证明结束 | [1.1](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-1.html#sec-1-1) |
| $A_n\text{ 或 }A[n]$ | 线性数组 $A$ 的第 $n$ 个元素 | [1.1](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-1.html#sec-1-1) |
| $A_{mn}\text{ 或 }A[m,n]$ | 矩形数组 $A$ 的第 $m$ 行 $n$ 列元素 | [1.1](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-1.html#sec-1-1) |
| $V\leftarrow E$ | 将表达式 $E$ 的值赋给变量 $V$ | [1.1](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-1.html#sec-1-1) |
| $U\leftrightarrow V$ | 交换变量 $U$ 和 $V$ 的值 | [1.1](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-1.html#sec-1-1) |
| $(R\,?\,a:b)$ | 条件表达式: 关系 $R$ 为真时指向 $a$; 关系 $R$ 为假时指向 $b$ |  |
| $[R]$ | 关系 $R$ 的特征函数: $(R\,?\,1:0)$ | [1.2.3](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-3.html#sec-1-2-3) |
| $\delta_{kj}$ | 克罗内克 $\delta$: $[j=k]$ | [1.2.3](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-3.html#sec-1-2-3) |
| $[z^n]g(z)$ | 幂级数 $g(z)$ 中 $z^n$ 的系数 | [1.2.9](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-9.html#sec-1-2-9) |
| $\displaystyle\sum_{R(k)}f(k)$ | 使得变量 $k$ 为整数且关系 $R(k)$ 为真的所有 $f(k)$ 之和 | [1.2.3](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-3.html#sec-1-2-3) |
| $\displaystyle\prod_{R(k)}f(k)$ | 使得变量 $k$ 为整数且关系 $R(k)$ 为真的所有 $f(k)$ 之积 | [1.2.3](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-3.html#sec-1-2-3) |
| $\displaystyle\min_{R(k)}f(k)$ | 使得变量 $k$ 为整数且关系 $R(k)$ 为真的所有 $f(k)$ 之极小值 | [1.2.3](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-3.html#sec-1-2-3) |
| $\displaystyle\max_{R(k)}f(k)$ | 使得变量 $k$ 为整数且关系 $R(k)$ 为真的所有 $f(k)$ 之极大值 | [1.2.3](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-3.html#sec-1-2-3) |
| $\Re z$ | $z$ 的实部 | [1.2.2](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-2.html#sec-1-2-2) |
| $\Im z$ | $z$ 的虚部 | [1.2.2](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-2.html#sec-1-2-2) |
| $\bar z$ | 复共轭: $\Re z-i\Im z$ | [1.2.2](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-2.html#sec-1-2-2) |
| $A^T$ | 矩阵数组 $A$ 的转置: $A^T[j,k]=A[k,j]$ |  |
| $x^y$ | $x$ 的 $y$ 次方 ($x$ 为正) | [1.2.2](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-2.html#sec-1-2-2) |
| $x^k$ | $x$ 的 $k$ 次方: $\displaystyle \left(k\ge0\,?\,\prod_{0\le j<k}x:1/x^{-k}\right)$ | [1.2.2](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-2.html#sec-1-2-2) |
| $x^{\overline{k}}$ | $x$ 的 $k$ 次升幂: $\displaystyle \Gamma(x+k)/\Gamma(x)=\left(k\ge0\,?\,\prod_{0\le j<k}(x+j):1/(x+k)^{\overline{-k}}\right)$ | [1.2.5](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-5.html#sec-1-2-5) |
| $x^{\underline{k}}$ | $x$ 的 $k$ 次降幂: $\displaystyle x!/(x-k)!=\left(k\ge0\,?\,\prod_{0\le j<k}(x-j):1/(x-k)^{\underline{-k}}\right)$ | [1.2.5](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-5.html#sec-1-2-5) |
| $n!$ | $n$ 的阶乘: $\Gamma(n+1)=n^{\underline n}$ | [1.2.5](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-5.html#sec-1-2-5) |
| $f'(x)$ | $f$ 在 $x$ 处的导数 | [1.2.9](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-9.html#sec-1-2-9) |
| $f''(x)$ | $f$ 在 $x$ 处的二阶导数 | [1.2.10](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-10.html#sec-1-2-10) |
| $f^{(n)}(x)$ | $n$ 阶导数: $(n=0\,?\,f(x):g^\prime(x))$, 其中 $g(x)=f^{(n-1)}(x)$ | [1.2.11.2](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-11-2.html#sec-1-2-11-2) |
| $f^{[n]}(x)$ | 第 $n$ 次迭代: $(n=0\,?\,x:f(f^{[n-1]}(x)))$ | [4.7](./sec-4-7.md#sec-4-7) |
| $f^{\{n\}}(x)$ | 第 $n$ 次归纳函数: $f^{\{n\}}(x)=f(xf^{\{n\}}(x)^n)$ | [4.7](./sec-4-7.md#sec-4-7) |
| $H_n^{(x)}$ | $x$ 阶调和数: $\displaystyle\sum_{1\le k\le n}1/k^x$ | [1.2.7](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-7.html#sec-1-2-7) |
| $H_n$ | 调和数: $H_n^{(1)}$ | [1.2.7](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-7.html#sec-1-2-7) |
| $F_n$ | 斐波那契数: $(n\le1\,?\,n:F_{n-1}+F_{n-2})$ | [1.2.8](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-8.html#sec-1-2-8) |
| $B_n$ | 伯努利数: $n![z^n]z/(e^z-1)$ | [1.2.11.2](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-11-2.html#sec-1-2-11-2) |
| $X\cdot Y$ | 向量 $X=(x_1,\ldots,x_n)$ 和 $Y=(y_1,\ldots,y_n)$ 的点积: $x_1y_1+\cdots+x_ny_n$ | [3.3.4](./sec-3-3-4.md#sec-3-3-4) |
| $j\backslash k$ | $j$ 整除 $k$: $k\bmod j=0$ 且 $j>0$ | [1.2.4](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-4.html#sec-1-2-4) |
| $S\setminus T$ | 集合差: $\{a\mid a\text{ 在 }S\text{ 中且不在 }T\text{ 中}\}$ |  |
| $\oplus\ \ominus\ \otimes\ \oslash$ | 舍入或特殊运算 | [4.2.1](./sec-4-2-1.md#sec-4-2-1) |
| $(\ldots a_1a_0.a_{-1}\ldots)_b$ | $b$ 进制按位记数系统: $\displaystyle \sum_k a_kb^k$ | [4.1](./sec-4-1.md#sec-4-1) |
| $//x_1,x_2,\ldots,x_n//$ | 连分数: $1/(x_1+1/(x_2+1/(\cdots+1/(x_n)\cdots)))$ | [4.5.3](./sec-4-5-3.md#sec-4-5-3) |
| $\binom{x}{k}$ | 二项式系数: $(k<0\,?\,0:x^{\underline k}/k!)$ | [1.2.6](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-6.html#sec-1-2-6) |
| $\binom{n}{n_1,n_2,\ldots,n_m}$ | 多项式系数 (仅当 $n=n_1+n_2+\cdots+n_m$ 时) | [1.2.6](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-6.html#sec-1-2-6) |
| $\begin{bmatrix}n\\m\end{bmatrix}$ | 第一类斯特林数: $\displaystyle\sum_{0<k_1<k_2<\cdots<k_{n-m}<n}k_1k_2\cdots k_{n-m}$ | [1.2.6](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-6.html#sec-1-2-6) |
| $\begin{Bmatrix}n\\m\end{Bmatrix}$ | 第二类斯特林数: $\displaystyle\sum_{1\le k_1\le k_2\le\cdots\le k_{n-m}\le m}k_1k_2\cdots k_{n-m}$ | [1.2.6](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-6.html#sec-1-2-6) |
| $\{a\mid R(a)\}$ | 使得关系 $R(a)$ 为真的所有 $a$ 的集合 |  |
| $\{a_1,\ldots,a_n\}$ | 集合或多重集合 $\{a_k\mid1\le k\le n\}$ |  |
| $\{x\}$ | 小数部分 (用于蕴涵实数值而非集合的范畴时): $x-\lfloor x\rfloor$ | [1.2.11.2](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-11-2.html#sec-1-2-11-2) |
| $[a..b]$ | 闭区间: $\{x\mid a\le x\le b\}$ | [1.2.2](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-2.html#sec-1-2-2) |
| $(a..b)$ | 开区间: $\{x\mid a<x<b\}$ | [1.2.2](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-2.html#sec-1-2-2) |
| $[a..b)$ | 半开区间: $\{x\mid a\le x<b\}$ | [1.2.2](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-2.html#sec-1-2-2) |
| $(a..b]$ | 半闭区间: $\{x\mid a<x\le b\}$ | [1.2.2](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-2.html#sec-1-2-2) |
| $\vert S\vert$ | 基数: 集合 $S$ 的元素个数 |  |
| $\vert x\vert$ | $x$ 的绝对值: $(x\ge0\,?\,x:-x)$ |  |
| $\vert z\vert$ | $z$ 的绝对值: $\sqrt{z\bar z}$ | [1.2.2](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-2.html#sec-1-2-2) |
| $\lfloor x\rfloor$ | $x$ 的下整, 最大整数函数: $\displaystyle \max_{k\le x}k$ | [1.2.4](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-4.html#sec-1-2-4) |
| $\lceil x\rceil$ | $x$ 的上整, 最小整数函数: $\displaystyle \min_{k\ge x}k$ | [1.2.4](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-4.html#sec-1-2-4) |
| $((x))$ | 锯齿函数 | [3.3.3](./sec-3-3-3.md#sec-3-3-3) |
| $\langle X_n\rangle$ | 无穷序列 $X_0,X_1,X_2,\ldots$ (这里的字母 $n$ 是符号的一部分) | [1.2.9](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-9.html#sec-1-2-9) |
| $\gamma$ | 欧拉常数: $\displaystyle \lim_{n\to\infty}(H_n-\ln n)$ | [1.2.7](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-7.html#sec-1-2-7) |
| $\gamma(x,y)$ | 不完全 $\Gamma$ 函数: $\displaystyle \int_0^y e^{-t}t^{x-1}\,dt$ | [1.2.11.3](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-11-3.html#sec-1-2-11-3) |
| $\Gamma(x)$ | $\Gamma$ 函数: $(x-1)!=\gamma(x,\infty)$ | [1.2.5](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-5.html#sec-1-2-5) |
| $\delta(x)$ | 整数的特征函数 | [3.3.3](./sec-3-3-3.md#sec-3-3-3) |
| $e$ | 自然对数的底: $\displaystyle \sum_{n\ge0}1/n!$ | [1.2.2](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-2.html#sec-1-2-2) |
| $\zeta(x)$ | $\zeta$ 函数: $\displaystyle \lim_{n\to\infty}H_n^{(x)}$(when $x>1$) | [1.2.7](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-7.html#sec-1-2-7) |
| $K_n(x_1,\ldots,x_n)$ | 连续多项式 | [4.5.3](./sec-4-5-3.md#sec-4-5-3) |
| $\ell(u)$ | 多项式 $u$ 的前导系数 | [4.6](./sec-4-6.md#sec-4-6) |
| $l(n)$ | $n$ 的最短加法链长度 | [4.6.3](./sec-4-6-3.md#sec-4-6-3) |
| $\Lambda(n)$ | 曼戈尔特函数 | [4.5.3](./sec-4-5-3.md#sec-4-5-3) |
| $\mu(n)$ | 莫比乌斯函数 | [4.5.2](./sec-4-5-2.md#sec-4-5-2) |
| $\nu(n)$ | 侧向和 | [4.6.3](./sec-4-6-3.md#sec-4-6-3) |
| $O(f(n))$ | 当变量 $n\to\infty$, $f(n)$ 的大 $O$ | [1.2.11.1](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-11-1.html#sec-1-2-11-1) |
| $O(f(z))$ | 当变量 $z\to0$, $f(z)$ 的大 $O$ | [1.2.11.1](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-11-1.html#sec-1-2-11-1) |
| $\Omega(f(n))$ | 当变量 $n\to\infty$, $f(n)$ 的大 $\Omega$ | [1.2.11.1](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-11-1.html#sec-1-2-11-1) |
| $\Theta(f(n))$ | 当变量 $n\to\infty$, $f(n)$ 的大 $\Theta$ | [1.2.11.1](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-11-1.html#sec-1-2-11-1) |
| $\pi(x)$ | 素数计数: $\displaystyle \sum_{n\le x}[n\text{ 是素数}]$ | [4.5.4](./sec-4-5-4.md#sec-4-5-4) |
| $\pi$ | 圆周率: $\displaystyle 4\sum_{n\ge0}(-1)^n/(2n+1)$ | [4.3.1](./sec-4-3-1.md#sec-4-3-1) |
| $\phi$ | 黄金分割比: $\tfrac12(1+\sqrt5)$ | [1.2.8](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-8.html#sec-1-2-8) |
| $\emptyset$ | 空集: $\{x\mid0=1\}$ |  |
| $\varphi(n)$ | 欧拉函数: $\displaystyle \sum_{0\le k<n}[k\perp n]$ | [1.2.4](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-4.html#sec-1-2-4) |
| $\infty$ | 无穷: 大于任何数 | [4.2.2](./sec-4-2-2.md#sec-4-2-2) |
| $\det(A)$ | 方阵 $A$ 的行列式 | [1.2.3](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-3.html#sec-1-2-3) |
| $\operatorname{sign}(x)$ | $x$ 的符号: $(x=0\,?\,0:x/\vert x\vert )$ |  |
| $\deg(u)$ | 多项式 $u$ 的次数 | [4.6](./sec-4-6.md#sec-4-6) |
| $\operatorname{cont}(u)$ | 多项式 $u$ 的容度 | [4.6.1](./sec-4-6-1.md#sec-4-6-1) |
| $\operatorname{pp}(u(x))$ | 多项式 $u$ 的本原部分 | [4.6.1](./sec-4-6-1.md#sec-4-6-1) |
| $\log_bx$ | $x$ 的以 $b$ 为底的对数 ($x>0,b>0$ 且 $b\ne1$): 使得 $x=b^y$ 的 $y$ | [1.2.2](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-2.html#sec-1-2-2) |
| $\ln x$ | 自然对数: $\log_e x$ | [1.2.2](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-2.html#sec-1-2-2) |
| $\lg x$ | 以 2 为底的对数: $\log_2 x$ | [1.2.2](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-2.html#sec-1-2-2) |
| $\exp x$ | $x$ 的指数: $e^x$ | [1.2.9](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-9.html#sec-1-2-9) |
| $j\perp k$ | $j$ 与 $k$ 互素: $\gcd(j,k)=1$ | [1.2.4](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-4.html#sec-1-2-4) |
| $\gcd(j,k)$ | $j$ 和 $k$ 的最大公因数: $\displaystyle \left(j=k=0\,?\,0:\max_{d\backslash j,\,d\backslash k}d\right)$ | [4.5.2](./sec-4-5-2.md#sec-4-5-2) |
| $\operatorname{lcm}(j,k)$ | $j$ 和 $k$ 的最小公倍数: $\displaystyle \left(jk=0\,?\,0:\min_{d>0,\,j\backslash d,\,k\backslash d}d\right)$ | [4.5.2](./sec-4-5-2.md#sec-4-5-2) |
| $x\bmod y$ | $\mathrm{mod}$ 函数: $(y=0\,?\,x:x-y\lfloor x/y\rfloor)$ | [1.2.4](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-4.html#sec-1-2-4) |
| $u(x)\bmod v(x)$ | 多项式 $u$ 除以多项式 $v$ 的余式 | [4.6.1](./sec-4-6-1.md#sec-4-6-1) |
| $x\equiv x^\prime\quad(\text{modulo }y)$ | 同余关系: $x\bmod y=x^\prime\bmod y$ | [1.2.4](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-4.html#sec-1-2-4) |
| $x\approx y$ | $x$ 近似等于 $y$ | [3.5](./sec-3-5.md#sec-3-5), [4.2.2](./sec-4-2-2.md#sec-4-2-2) |
| $\Pr(S(n))$ | 对于随机正整数 $n$, 命题 $S(n)$ 为真的概率 | [3.5](./sec-3-5.md#sec-3-5) |
| $\Pr(S(X))$ | 对于 $X$ 的随机值, 命题 $S(X)$ 为真的概率 | [1.2.10](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-10.html#sec-1-2-10) |
| $\mathrm E X$ | $X$ 的期望值: $\displaystyle \sum_x x\Pr(X=x)$ | [1.2.10](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-10.html#sec-1-2-10) |
| $\operatorname{mean}(g)$ | 用生成函数 $g$ 表示的概率分布的均值: $g^\prime(1)$ | [1.2.10](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-10.html#sec-1-2-10) |
| $\operatorname{var}(g)$ | 用生成函数 $g$ 表示的概率分布的方差: $g^{\prime\prime}(1)+g^\prime(1)-g^\prime(1)^2$ | [1.2.10](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-10.html#sec-1-2-10) |
| $\displaystyle \left(\min x_1,\operatorname{ave}x_2,\max x_3,\operatorname{dev}x_4\right)$ | 具有最小值 $x_1$、平均 (期望) 值 $x_2$、最大值 $x_3$、标准差 $x_4$ 的随机变量 | [1.2.10](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-2-10.html#sec-1-2-10) |
| ␣ | 一个空格 | [1.3.1](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-3-1.html#sec-1-3-1) |
| `rA` | MIX 的寄存器 A (累加器) | [1.3.1](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-3-1.html#sec-1-3-1) |
| `rX` | MIX 的寄存器 X (扩展) | [1.3.1](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-3-1.html#sec-1-3-1) |
| `rI1,...,rI6` | MIX 的 (变址) 寄存器 I1, …, I6 | [1.3.1](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-3-1.html#sec-1-3-1) |
| `rJ` | MIX 的 (转址) 寄存器 | [1.3.1](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-3-1.html#sec-1-3-1) |
| `(L:R)` | MIX 字的部分字段, $0\le L\le R\le5$ | [1.3.1](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-3-1.html#sec-1-3-1) |
| `OP ADDRESS,I(F)` | MIX 指令的记号 | [1.3.1](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-3-1.html#sec-1-3-1), [1.3.2](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-3-2.html#sec-1-3-2) |
| $u$ | MIX 中的时间单位 | [1.3.1](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-3-1.html#sec-1-3-1) |
| `*` | MIXAL 中的 “self” | [1.3.2](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-3-2.html#sec-1-3-2) |
| `0F,1F,2F,...,9F` | MIXAL 中的 “forward” 局部符号 | [1.3.2](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-3-2.html#sec-1-3-2) |
| `0B,1B,2B,...,9B` | MIXAL 中的 “backward” 局部符号 | [1.3.2](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-3-2.html#sec-1-3-2) |
| `0H,1H,2H,...,9H` | MIXAL 中的 “here” 局部符号 | [1.3.2](https://qixiaoz.github.io/taocp-zh/volume1/sec-1-3-2.html#sec-1-3-2) |
