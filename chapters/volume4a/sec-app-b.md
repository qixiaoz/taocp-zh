<a id="pdf-705"></a><a id="p-690"></a>

<a id="sec-app-b"></a>

# 附录 B 记号索引

在下列公式中, 未作说明的字母具有如下含义.

| 字母 | 含义 |
| ---: | :--- |
| $j,k$ | 整数值算术表达式 |
| $m,n$ | 非负整数值算术表达式 |
| $p,q$ | 二进制值算术表达式 (0 或 1) |
| $x,y$ | 实数值算术表达式 |
| $z$ | 复数值算术表达式 |
| $f$ | 整数值、实数值或复数值函数 |
| $G,H$ | 图 |
| $S,T$ | 集合或多重集 |
| $\mathcal F,\mathcal G$ | 集合族 |
| $u,v$ | 图的顶点 |
| $\alpha,\beta$ | 符号串 |

定义位置是当前卷中的页码或其他各卷中的小节号. 许多其他的符号, 如 $n$ 个顶点上的完全图 $K_n$, 出现在本书末尾的主索引中.

<a id="tab-app-b"></a>

<table aria-label="附录B完整160项记号索引">
<thead><tr><th style="text-align:right">形式符号</th><th>含义</th><th>定义位置</th></tr></thead>
<tbody>
<tr><td style="text-align:right">$V\leftarrow E$</td><td>将表达式 $E$ 的值赋给变量 $V$</td><td>§1.1</td></tr>
<tr><td style="text-align:right">$U\leftrightarrow V$</td><td>交换变量 $U$ 和 $V$ 的值</td><td>§1.1</td></tr>
<tr><td style="text-align:right">$A_n$ 或 $A[n]$</td><td>线性数组 $A$ 的第 $n$ 个元素</td><td>§1.1</td></tr>
<tr><td style="text-align:right">$A_{mn}$ 或 $A[m,n]$</td><td>矩形数组 $A$ 的第 $m$ 行第 $n$ 列元素</td><td>§1.1</td></tr>
<tr><td style="text-align:right">$(R\mathbin? a:b)$</td><td>条件表达式. 如果 $R$ 为真, 表示 $a$. 如果 $R$ 为假, 表示 $b$</td><td><a href="./sec-7-1-1.md#p-78">78</a></td></tr>
<tr><td style="text-align:right">$[R]$</td><td>关系 $R$ 的特征函数. $(R\mathbin?1:0)$</td><td>§1.2.3</td></tr>
<tr><td style="text-align:right">$\delta_{jk}$</td><td>克罗内克 $\delta$. $[j=k]$</td><td>§1.2.3</td></tr>
<tr><td style="text-align:right">$[z^n]f(z)$</td><td>幂级数 $f(z)$ 中 $z^n$ 的系数</td><td>§1.2.9</td></tr>
<tr><td style="text-align:right">$z_1+z_2+\cdots+z_n$</td><td>$n$ 个数的和, 即使 $n$ 为 0 或 1</td><td>§1.2.3</td></tr>
<tr><td style="text-align:right">$a_1a_2\ldots a_n$</td><td>$n$ 个元素的积、串或向量</td><td></td></tr>
<tr><td style="text-align:right">$(x_1,\ldots,x_n)$</td><td>$n$ 个元素的向量</td><td></td></tr>
<tr><td style="text-align:right">$\langle x_1x_2\ldots x_{2k-1}\rangle$</td><td>中位数, 即排序后的中间值</td><td><a href="./sec-7-1-1.md#p-60">60</a></td></tr>
<tr><td style="text-align:right">$\displaystyle\sum_{R(k)} f(k)$</td><td>使关系 $R(k)$ 为真的所有 $f(k)$ 之和</td><td>§1.2.3</td></tr>
<tr><td style="text-align:right">$\displaystyle\prod_{R(k)} f(k)$</td><td>使关系 $R(k)$ 为真的所有 $f(k)$ 之积</td><td>§1.2.3</td></tr>
<tr><td style="text-align:right">$\displaystyle\min_{R(k)} f(k)$</td><td>使关系 $R(k)$ 为真的所有 $f(k)$ 之最小值</td><td>§1.2.3</td></tr>
<tr><td style="text-align:right">$\displaystyle\max_{R(k)} f(k)$</td><td>使关系 $R(k)$ 为真的所有 $f(k)$ 之最大值</td><td>§1.2.3</td></tr>
<tr><td style="text-align:right">$\displaystyle\bigcup_{R(k)} S(k)$</td><td>使关系 $R(k)$ 为真的所有 $S(k)$ 之并集</td><td></td></tr>
<tr><td style="text-align:right">$\displaystyle\sum_{k=a}^b f(k)$</td><td>$\sum_{a\le k\le b}f(k)$ 的简写</td><td>§1.2.3</td></tr>
<tr><td style="text-align:right">$\{a\mid R(a)\}$</td><td>使关系 $R(a)$ 为真的所有 $a$ 的集合</td><td></td></tr>
<tr><td style="text-align:right">$\sum\{f(k)\mid R(k)\}$</td><td>$\sum_{R(k)} f(k)$ 的另一种写法</td><td></td></tr>
<tr><td style="text-align:right">$\{a_1,a_2,\ldots,a_n\}$</td><td>集合或多重集 $\{a_k\mid1\le k\le n\}$</td><td></td></tr>
</tbody>
<tbody id="pdf-706">
<tr id="p-691"><td style="text-align:right">$[x..y]$</td><td>闭区间. $\{a\mid x\le a\le y\}$</td><td>§1.2.2</td></tr>
<tr><td style="text-align:right">$(x..y)$</td><td>开区间. $\{a\mid x\lt a\lt y\}$</td><td>§1.2.2</td></tr>
<tr><td style="text-align:right">$[x..y)$</td><td>半开区间. $\{a\mid x\le a\lt y\}$</td><td>§1.2.2</td></tr>
<tr><td style="text-align:right">$(x..y]$</td><td>半闭区间. $\{a\mid x\lt a\le y\}$</td><td>§1.2.2</td></tr>
<tr><td style="text-align:right">$\lvert S\rvert$</td><td>基数. 集合 $S$ 的元素个数</td><td></td></tr>
<tr><td style="text-align:right">$\lvert f\rvert$</td><td>解的个数 (当 $f$ 为布尔函数时). $\sum_x f(x)$</td><td><a href="./sec-7-1-4.md#p-172">172</a></td></tr>
<tr><td style="text-align:right">$\lvert x\rvert$</td><td>$x$ 的绝对值. $(x\ge0\mathbin?x:-x)$</td><td></td></tr>
<tr><td style="text-align:right">$\lvert z\rvert$</td><td>$z$ 的绝对值. $\sqrt{z\bar z}$</td><td>§1.2.2</td></tr>
<tr><td style="text-align:right">$\lvert\alpha\rvert$</td><td>$\alpha$ 的长度. 如果 $\alpha=a_1a_2\ldots a_m$, 则为 $m$</td><td></td></tr>
<tr><td style="text-align:right">$\lfloor x\rfloor$</td><td>$x$ 的下整, 最大整数函数. $\max_{k\le x}k$</td><td>§1.2.4</td></tr>
<tr><td style="text-align:right">$\lceil x\rceil$</td><td>$x$ 的上整, 最小整数函数. $\min_{k\ge x}k$</td><td>§1.2.4</td></tr>
<tr><td style="text-align:right">$x\bmod y$</td><td>模函数. $(y=0\mathbin?x:x-y\lfloor x/y\rfloor)$</td><td>§1.2.4</td></tr>
<tr><td style="text-align:right">$\{x\}$</td><td>小数部分 (用于蕴涵实数值而非集合的范畴). $x\bmod 1$</td><td>§1.2.11.2</td></tr>
<tr><td style="text-align:right">$x\equiv x'\pmod y$</td><td>同余关系. $x\bmod y=x'\bmod y$</td><td>§1.2.4</td></tr>
<tr><td style="text-align:right">$j\mathbin{\backslash}k$</td><td>$j$ 整除 $k$. $k\bmod j=0$ 且 $j>0$</td><td>§1.2.4</td></tr>
<tr><td style="text-align:right">$S\setminus T$</td><td>集合差. $\{s\mid s\in S\text{ 且 }s\notin T\}$</td><td></td></tr>
<tr><td style="text-align:right">$S\setminus t$</td><td>$S\setminus\{t\}$ 的简写</td><td></td></tr>
<tr><td style="text-align:right">$G\setminus U$</td><td>删除集合 $U$ 中的顶点后的 $G$</td><td><a href="./sec-7.md#p-10">10</a></td></tr>
<tr><td style="text-align:right">$G\setminus v$</td><td>删除顶点 $v$ 后的 $G$</td><td><a href="./sec-7.md#p-10">10</a></td></tr>
<tr><td style="text-align:right">$G\setminus e$</td><td>删除边 $e$ 后的 $G$</td><td><a href="./sec-7.md#p-10">10</a></td></tr>
<tr><td style="text-align:right">$G/e$</td><td>边 $e$ 收缩为一个点后的 $G$</td><td><a href="./sec-7-2-1-6.md#p-384">384</a></td></tr>
<tr><td style="text-align:right">$S\cup t$</td><td>$S\cup\{t\}$ 的简写</td><td></td></tr>
<tr><td style="text-align:right">$S\uplus T$</td><td>多重集的和. 例如 $\{a,b\}\uplus\{a,c\}=\{a,a,b,c\}$</td><td>§4.6.3</td></tr>
<tr><td style="text-align:right">$\gcd(j,k)$</td><td>最大公因数. $(j=k=0\mathbin?0:\max_{d\mid j,\,d\mid k}d)$</td><td>§1.1</td></tr>
<tr><td style="text-align:right">$j\perp k$</td><td>$j$ 与 $k$ 互素. $\gcd(j,k)=1$</td><td>§1.2.4</td></tr>
<tr><td style="text-align:right">$A^{\mathsf T}$</td><td>矩形数组 $A$ 的转置. $A^{\mathsf T}[j,k]=A[k,j]$</td><td></td></tr>
<tr><td style="text-align:right">$\alpha^{\mathsf R}$</td><td>串 $\alpha$ 的左右反转</td><td></td></tr>
<tr><td style="text-align:right">$\alpha^{\mathsf T}$</td><td>分划 $\alpha$ 的共轭</td><td><a href="./sec-7-2-1-4.md#p-327">327</a></td></tr>
<tr><td style="text-align:right">$x^y$</td><td>$x$ 的 $y$ 次方 (当 $x>0$ 时). $e^{y\ln x}$</td><td>§1.2.2</td></tr>
<tr><td style="text-align:right">$x^k$</td><td>$x$ 的 $k$ 次方. $\displaystyle\left(k\ge0\mathbin?\prod_{j=0}^{k-1}x:1/x^{-k}\right)$</td><td>§1.2.2</td></tr>
<tr><td style="text-align:right">$x^-$</td><td>$x$ 的逆 (或倒数). $x^{-1}$</td><td>§1.3.3</td></tr>
<tr><td style="text-align:right">$x^{\overline k}$</td><td>$x$ 的 $k$ 次升幂. $\Gamma(x+k)/\Gamma(x)=\displaystyle\left(k\ge0\mathbin?\prod_{j=0}^{k-1}(x+j):1/(x+k)^{\overline{-k}}\right)$</td><td>§1.2.5</td></tr>
<tr><td style="text-align:right">$x^{\underline k}$</td><td>$x$ 的 $k$ 次降幂. $x!/(x-k)!=\displaystyle\left(k\ge0\mathbin?\prod_{j=0}^{k-1}(x-j):1/(x-k)^{\underline{-k}}\right)$</td><td>§1.2.5</td></tr>
<tr><td style="text-align:right">$n!$</td><td>$n$ 的阶乘. $\Gamma(n+1)=n^{\underline n}$</td><td>§1.2.5</td></tr>
<tr><td style="text-align:right">$\binom{x}{k}$</td><td>二项式系数. $(k\lt 0\mathbin?0:x^{\underline k}/k!)$</td><td>§1.2.6</td></tr>
<tr><td style="text-align:right">$\binom{n}{n_1,\ldots,n_m}$</td><td>多项式系数 (当 $n=n_1+\cdots+n_m$ 时). </td><td>§1.2.6</td></tr>
<tr><td style="text-align:right">$\left[\begin{smallmatrix}n\\m\end{smallmatrix}\right]$</td><td>斯特林循环数. $\displaystyle\sum_{0\lt k_1\lt \cdots\lt k_{n-m}\lt n}k_1\ldots k_{n-m}$</td><td>§1.2.6</td></tr>
<tr><td style="text-align:right">$\left\{\begin{smallmatrix}n\\m\end{smallmatrix}\right\}$</td><td>斯特林集合划分数. $\displaystyle\sum_{1\le k_1\le\cdots\le k_{n-m}\le m}k_1\ldots k_{n-m}$</td><td>§1.2.6</td></tr>
</tbody>
<tbody id="pdf-707">
<tr id="p-692"><td style="text-align:right">$\left\langle\begin{smallmatrix}n\\m\end{smallmatrix}\right\rangle$</td><td>欧拉数. $\displaystyle\sum_{k=0}^m(-1)^k\binom{n+1}{k}(m+1-k)^n$</td><td>§5.1.3</td></tr>
<tr><td style="text-align:right">$\left\vert\begin{smallmatrix}n\\m\end{smallmatrix}\right\vert$</td><td>$n$ 的恰好有 $m$ 个部分的分划数. $\displaystyle\sum_{1\le k_1\le\cdots\le k_m}[k_1+\cdots+k_m=n]$</td><td><a href="./sec-7-2-1-4.md#p-331">331</a></td></tr>
<tr><td style="text-align:right">$(\ldots a_1a_0.a_{-1}\ldots)_b$</td><td>基数为 $b$ 的位置表示. $\sum_k a_kb^k$</td><td>§4.1</td></tr>
<tr><td style="text-align:right">$\Re z$</td><td>$z$ 的实部</td><td>§1.2.2</td></tr>
<tr><td style="text-align:right">$\Im z$</td><td>$z$ 的虚部</td><td>§1.2.2</td></tr>
<tr><td style="text-align:right">$\bar z$</td><td>复共轭. $\Re z-i\Im z$</td><td>§1.2.2</td></tr>
<tr><td style="text-align:right">$\neg p$ 或 $\mathord{\sim}p$ 或 $\bar p$</td><td>补. $1-p$</td><td><a href="./sec-7-1-1.md#p-40">40</a></td></tr>
<tr><td style="text-align:right">$\mathord{\sim}x$ 或 $\bar x$</td><td>按位补</td><td><a href="./sec-7-1-3.md#p-110">110</a></td></tr>
<tr><td style="text-align:right">$p\land q$</td><td>布尔合取 (与). $pq$</td><td><a href="./sec-7-1-1.md#p-40">40</a></td></tr>
<tr><td style="text-align:right">$x\land y$</td><td>最小值. $\min\{x,y\}$</td><td><a href="./sec-7-1-1.md#p-51">51</a></td></tr>
<tr><td style="text-align:right">$x\mathbin{\&}y$</td><td>按位 AND</td><td><a href="./sec-7-1-2.md#p-109">109</a></td></tr>
<tr><td style="text-align:right">$p\lor q$</td><td>布尔析取 (或). $\overline{\bar p\bar q}$</td><td><a href="./sec-7-1-1.md#p-40">40</a></td></tr>
<tr><td style="text-align:right">$x\lor y$</td><td>最大值. $\max\{x,y\}$</td><td><a href="./sec-7-1-1.md#p-51">51</a></td></tr>
<tr><td style="text-align:right">$x\mid y$</td><td>按位 OR</td><td><a href="./sec-7-1-2.md#p-109">109</a></td></tr>
<tr><td style="text-align:right">$p\oplus q$</td><td>布尔互斥析取 (异或). $(p+q)\bmod2$</td><td><a href="./sec-7-1-1.md#p-40">40</a></td></tr>
<tr><td style="text-align:right">$x\oplus y$</td><td>按位 XOR</td><td><a href="./sec-7-1-3.md#p-110">110</a></td></tr>
<tr><td style="text-align:right">$x\mathbin{\dot-}y$</td><td>饱和减法, $x$ 点减 $y$. $\max\{0,x-y\}$</td><td>§1.3.1′</td></tr>
<tr><td style="text-align:right">$x\ll k$</td><td>按位左移. $\lfloor2^kx\rfloor$</td><td><a href="./sec-7-1-3.md#p-111">111</a></td></tr>
<tr><td style="text-align:right">$x\gg k$</td><td>按位右移. $x\ll(-k)$</td><td><a href="./sec-7-1-3.md#p-111">111</a></td></tr>
<tr><td style="text-align:right">$x\ddagger y$</td><td>用于交错二进制位的 “拉链函数”, $x$ 拉链 $y$</td><td><a href="./sec-7-1-3.md#p-122">122</a></td></tr>
<tr><td style="text-align:right">$\log_bx$</td><td>$x$ 的以 $b$ 为底的对数 ($x>0,b>0$ 且 $b\ne1$). 使得 $x=b^y$ 的 $y$</td><td>§1.2.2</td></tr>
<tr><td style="text-align:right">$\ln x$</td><td>自然对数. $\log_e x$</td><td>§1.2.2</td></tr>
<tr><td style="text-align:right">$\lg x$</td><td>以 2 为底的对数. $\log_2 x$</td><td>§1.2.2</td></tr>
<tr><td style="text-align:right">$\lambda n$</td><td>以 2 为底的对数尺度 (当 $n>0$ 时). $\lfloor\lg n\rfloor$</td><td><a href="./sec-7-1-3.md#p-117">117</a></td></tr>
<tr><td style="text-align:right">$\exp x$</td><td>$x$ 的指数. $e^x=\sum_{k=0}^{\infty}x^k/k!$</td><td>§1.2.9</td></tr>
<tr><td style="text-align:right">$\rho n$</td><td>直尺函数 (当 $n>0$ 时). $\max_{2^m\mathbin{\backslash}n}m$</td><td><a href="./sec-7-1-3.md#p-116">116</a></td></tr>
<tr><td style="text-align:right">$\nu n$</td><td>位叠加和 (当 $n\ge0$ 时). $\sum_{k\ge0}((n\gg k)\mathbin{\&}1)$</td><td><a href="./sec-7-1-3.md#p-118">118</a></td></tr>
<tr><td style="text-align:right">$\langle X_n\rangle$</td><td>无穷序列 $X_0,X_1,X_2,\ldots$, 字母 $n$ 是记号的一部分</td><td>§1.2.9</td></tr>
<tr><td style="text-align:right">$f'(x)$</td><td>$f$ 在 $x$ 处的导数</td><td>§1.2.9</td></tr>
<tr><td style="text-align:right">$f''(x)$</td><td>$f$ 在 $x$ 处的二阶导数</td><td>§1.2.10</td></tr>
<tr><td style="text-align:right">$H_n^{(x)}$</td><td>$x$ 阶调和数. $\sum_{k=1}^n1/k^x$</td><td>§1.2.7</td></tr>
<tr><td style="text-align:right">$H_n$</td><td>调和数. $H_n^{(1)}$</td><td>§1.2.7</td></tr>
<tr><td style="text-align:right">$F_n$</td><td>斐波那契数. $(n\le1\mathbin?n:F_{n-1}+F_{n-2})$</td><td>§1.2.8</td></tr>
<tr><td style="text-align:right">$B_n$</td><td>伯努利数. $n![z^n]z/(e^z-1)$</td><td>§1.2.11.2</td></tr>
<tr><td style="text-align:right">$\det(A)$</td><td>方阵 $A$ 的行列式</td><td>§1.2.3</td></tr>
<tr><td style="text-align:right">$\operatorname{sign}(x)$</td><td>$x$ 的符号. $[x>0]-[x\lt 0]$</td><td></td></tr>
</tbody>
<tbody id="pdf-708">
<tr id="p-693"><td style="text-align:right">$\zeta(x)$</td><td>$\zeta$ 函数. $\lim_{n\to\infty}H_n^{(x)}$, 当 $x>1$ 时</td><td>§1.2.7</td></tr>
<tr><td style="text-align:right">$\Gamma(x)$</td><td>$\Gamma$ 函数. $(x-1)!=\gamma(x,\infty)$</td><td>§1.2.5</td></tr>
<tr><td style="text-align:right">$\gamma(x,y)$</td><td>不完全 $\Gamma$ 函数. $\int_0^y e^{-t}t^{x-1}\,dt$</td><td>§1.2.11.3</td></tr>
<tr><td style="text-align:right">$\gamma$</td><td>欧拉常数. $-\Gamma'(1)=\lim_{n\to\infty}(H_n-\ln n)$</td><td>§1.2.7</td></tr>
<tr><td style="text-align:right">$e$</td><td>自然对数的底. $\sum_{n\ge0}1/n!$</td><td>§1.2.2</td></tr>
<tr><td style="text-align:right">$\pi$</td><td>圆周率. $4\sum_{n\ge0}(-1)^n/(2n+1)$</td><td>§1.2.2</td></tr>
<tr><td style="text-align:right">$\infty$</td><td>无穷大, 大于任何数</td><td></td></tr>
<tr><td style="text-align:right">$\Lambda$</td><td>空链 (不指向地址的指针)</td><td>§2.1</td></tr>
<tr><td style="text-align:right">$\emptyset$</td><td>空集 (没有元素的集合)</td><td></td></tr>
<tr><td style="text-align:right">$\epsilon$</td><td>空串 (长度为 0 的串)</td><td></td></tr>
<tr><td style="text-align:right">$\epsilon$</td><td>单位族. $\{\emptyset\}$</td><td><a href="./sec-7-1-4.md#p-227">227</a></td></tr>
<tr><td style="text-align:right">$\phi$</td><td>黄金分割比. $(1+\sqrt5)/2$</td><td>§1.2.8</td></tr>
<tr><td style="text-align:right">$\varphi(n)$</td><td>欧拉 $\varphi$ 函数. $\sum_{k=0}^{n-1}[k\perp n]$</td><td>§1.2.4</td></tr>
<tr><td style="text-align:right">$x\approx y$</td><td>$x$ 近似等于 $y$</td><td>§1.2.5</td></tr>
<tr><td style="text-align:right">$G\cong H$</td><td>$G$ 同构于 $H$</td><td><a href="./sec-7.md#p-10">10</a></td></tr>
<tr><td style="text-align:right">$O(f(n))$</td><td>当变量 $n\to\infty$, $f(n)$ 的大 $O$</td><td>§1.2.11.1</td></tr>
<tr><td style="text-align:right">$O(f(z))$</td><td>当变量 $z\to0$, $f(z)$ 的大 $O$</td><td>§1.2.11.1</td></tr>
<tr><td style="text-align:right">$\Omega(f(n))$</td><td>当变量 $n\to\infty$, $f(n)$ 的大 $\Omega$</td><td>§1.2.11.1</td></tr>
<tr><td style="text-align:right">$\Theta(f(n))$</td><td>当变量 $n\to\infty$, $f(n)$ 的大 $\Theta$</td><td>§1.2.11.1</td></tr>
<tr><td style="text-align:right">$\bar G$</td><td>图 $G$ 的补图 (或一致超图的补图)</td><td><a href="./sec-7.md#p-20">20</a></td></tr>
<tr><td style="text-align:right">$G\mid U$</td><td>受限于集合 $U$ 的顶点的图 $G$</td><td><a href="./sec-7.md#p-10">10</a></td></tr>
<tr><td style="text-align:right">$u\mathbin{-}v$</td><td>$u$ 邻接于 $v$</td><td><a href="./sec-7.md#p-10">10</a></td></tr>
<tr><td style="text-align:right">$u\mathbin{\not-}v$</td><td>$u$ 不邻接于 $v$</td><td><a href="./sec-7.md#p-10">10</a></td></tr>
<tr><td style="text-align:right">$u\to v$</td><td>有一条从 $u$ 到 $v$ 的有向边</td><td><a href="./sec-7.md#p-14">14</a></td></tr>
<tr><td style="text-align:right">$u\to^* v$</td><td>传递闭包. 从 $u$ 可以到达 $v$</td><td><a href="./sec-7-1-3.md#p-132">132</a></td></tr>
<tr><td style="text-align:right">$d(u,v)$</td><td>从 $u$ 到 $v$ 的距离</td><td><a href="./sec-7.md#p-12">12</a></td></tr>
<tr><td style="text-align:right">$G\cup H$</td><td>$G$ 和 $H$ 的并图</td><td><a href="./sec-7.md#p-21">21</a></td></tr>
<tr><td style="text-align:right">$G\oplus H$</td><td>$G$ 和 $H$ 的直和 (并置)</td><td><a href="./sec-7.md#p-21">21</a></td></tr>
<tr><td style="text-align:right">$G\mathbin{-}H$</td><td>$G$ 和 $H$ 的联合</td><td><a href="./sec-7.md#p-21">21</a></td></tr>
<tr><td style="text-align:right">$G\to H$</td><td>$G$ 和 $H$ 的有向联合</td><td><a href="./sec-7.md#p-21">21</a></td></tr>
<tr><td style="text-align:right">$G\mathbin{\square}H$</td><td>$G$ 和 $H$ 的笛卡儿积</td><td><a href="./sec-7.md#p-21">21</a></td></tr>
<tr><td style="text-align:right">$G\otimes H$</td><td>$G$ 和 $H$ 的直积 (并合)</td><td><a href="./sec-7.md#p-22">22</a></td></tr>
<tr><td style="text-align:right">$G\boxtimes H$</td><td>$G$ 和 $H$ 的强积</td><td><a href="./sec-7.md#p-22">22</a></td></tr>
<tr><td style="text-align:right">$G\mathbin{\triangle}H$</td><td>$G$ 和 $H$ 的奇积</td><td><a href="./sec-7.md#p-22">22</a></td></tr>
<tr><td style="text-align:right">$G\circ H$</td><td>$G$ 和 $H$ 的字典积 (合成)</td><td><a href="./sec-7.md#p-22">22</a></td></tr>
<tr><td style="text-align:right">$e_j$</td><td>基本族. $\{\{j\}\}$</td><td><a href="./sec-7-1-4.md#p-227">227</a></td></tr>
<tr><td style="text-align:right">$\wp$</td><td>全域族. 给定领域的全部子集</td><td><a href="./sec-7-1-4.md#p-229">229</a></td></tr>
<tr><td style="text-align:right">$\mathcal F\cup\mathcal G$</td><td>族的并. $\{S\mid S\in\mathcal F\text{ 或 }S\in\mathcal G\}$</td><td><a href="./sec-7-1-4.md#p-227">227</a></td></tr>
<tr><td style="text-align:right">$\mathcal F\cap\mathcal G$</td><td>族的交. $\{S\mid S\in\mathcal F\text{ 且 }S\in\mathcal G\}$</td><td><a href="./sec-7-1-4.md#p-227">227</a></td></tr>
<tr><td style="text-align:right">$\mathcal F\setminus\mathcal G$</td><td>族的差. $\{S\mid S\in\mathcal F\text{ 且 }S\notin\mathcal G\}$</td><td><a href="./sec-7-1-4.md#p-227">227</a></td></tr>
</tbody>
<tbody id="pdf-709">
<tr id="p-694"><td style="text-align:right">$\mathcal F\oplus\mathcal G$</td><td>族的对称差. $(\mathcal F\setminus\mathcal G)\cup(\mathcal G\setminus\mathcal F)$</td><td><a href="./sec-7-1-4.md#p-227">227</a></td></tr>
<tr><td style="text-align:right">$\mathcal F\sqcup\mathcal G$</td><td>族的联合. $\{S\cup T\mid S\in\mathcal F,\,T\in\mathcal G\}$</td><td><a href="./sec-7-1-4.md#p-227">227</a></td></tr>
<tr><td style="text-align:right">$\mathcal F\sqcap\mathcal G$</td><td>族的交叉. $\{S\cap T\mid S\in\mathcal F,\,T\in\mathcal G\}$</td><td><a href="./sec-7-1-4.md#p-227">227</a></td></tr>
<tr><td style="text-align:right">$\mathcal F\boxplus\mathcal G$</td><td>族的异或. $\{S\oplus T\mid S\in\mathcal F,\,T\in\mathcal G\}$</td><td><a href="./sec-7-1-4.md#p-227">227</a></td></tr>
<tr><td style="text-align:right">$\mathcal F/\mathcal G$</td><td>族的商 (余子式)</td><td><a href="./sec-7-1-4.md#p-227">227</a></td></tr>
<tr><td style="text-align:right">$\mathcal F\bmod\mathcal G$</td><td>族的余数. $\mathcal F\setminus(\mathcal G\sqcup(\mathcal F/\mathcal G))$</td><td><a href="./sec-7-1-4.md#p-227">227</a></td></tr>
<tr><td style="text-align:right">$\mathcal F\mathbin{\S}k$</td><td>族的对称化, 如果 $\mathcal F=e_{j_1}\cup e_{j_2}\cup\cdots\cup e_{j_n}$</td><td><a href="./sec-7-1-4.md#p-228">228</a></td></tr>
<tr><td style="text-align:right">$\mathcal F^\uparrow$</td><td>$\mathcal F$ 的极大元素集. $\{S\in\mathcal F\mid T\in\mathcal F\text{ 且 }S\subseteq T\text{ 蕴涵 }S=T\}$</td><td><a href="./sec-7-1-4.md#p-230">230</a></td></tr>
<tr><td style="text-align:right">$\mathcal F^\downarrow$</td><td>$\mathcal F$ 的极小元素集. $\{S\in\mathcal F\mid T\in\mathcal F\text{ 且 }S\supseteq T\text{ 蕴涵 }S=T\}$</td><td><a href="./sec-7-1-4.md#p-230">230</a></td></tr>
<tr><td style="text-align:right">$\mathcal F\nearrow\mathcal G$</td><td>非子集. $\{S\in\mathcal F\mid T\in\mathcal G\text{ 蕴涵 }S\nsubseteq T\}$</td><td><a href="./sec-7-1-4.md#p-230">230</a></td></tr>
<tr><td style="text-align:right">$\mathcal F\searrow\mathcal G$</td><td>非超集. $\{S\in\mathcal F\mid T\in\mathcal G\text{ 蕴涵 }S\nsupseteq T\}$</td><td><a href="./sec-7-1-4.md#p-230">230</a></td></tr>
<tr><td style="text-align:right">$\mathcal F\swarrow\mathcal G$</td><td>子集. $\{S\in\mathcal F\mid T\in\mathcal G\text{ 蕴涵 }S\subseteq T\}=\mathcal F\setminus(\mathcal F\nearrow\mathcal G)$</td><td><a href="./answers/7-1-4.md#p-560">560</a></td></tr>
<tr><td style="text-align:right">$\mathcal F\nwarrow\mathcal G$</td><td>超集. $\{S\in\mathcal F\mid T\in\mathcal G\text{ 蕴涵 }S\supseteq T\}=\mathcal F\setminus(\mathcal F\searrow\mathcal G)$</td><td><a href="./answers/7-1-4.md#p-560">560</a></td></tr>
<tr><td style="text-align:right">$X\cdot Y$</td><td>向量 $X=x_1x_2\ldots x_n$ 和 $Y=y_1y_2\ldots y_n$ 的点积. $x_1y_1+x_2y_2+\cdots+x_ny_n$</td><td><a href="./sec-7.md#p-9">9</a></td></tr>
<tr><td style="text-align:right">$X\subseteq Y$</td><td>向量 $X=x_1x_2\ldots x_n$ 和 $Y=y_1y_2\ldots y_n$ 的包含. 对 $1\le k\le n$ 都有 $x_k\le y_k$</td><td><a href="./sec-7-1-3.md#p-110">110</a></td></tr>
<tr><td style="text-align:right">$\alpha\diamond\beta$</td><td>真值表的合并</td><td><a href="./sec-7-1-4.md#p-181">181</a></td></tr>
<tr><td style="text-align:right">$\alpha(G)$</td><td>$G$ 的独立数</td><td><a href="./sec-7.md#p-28">28</a></td></tr>
<tr><td style="text-align:right">$\gamma(G)$</td><td>$G$ 的控制数</td><td><a href="./answers/7-1-4.md#p-563">563</a></td></tr>
<tr><td style="text-align:right">$\kappa(G)$</td><td>$G$ 的顶点连通度</td><td>§7.4.1</td></tr>
<tr><td style="text-align:right">$\lambda(G)$</td><td>$G$ 的边连通度</td><td>§7.4.1</td></tr>
<tr><td style="text-align:right">$\nu(G)$</td><td>$G$ 的匹配数</td><td>§7.5.5</td></tr>
<tr><td style="text-align:right">$\chi(G)$</td><td>$G$ 的色数</td><td><a href="./sec-7.md#p-28">28</a></td></tr>
<tr><td style="text-align:right">$\omega(G)$</td><td>$G$ 的团数</td><td><a href="./sec-7.md#p-28">28</a></td></tr>
<tr><td style="text-align:right">$c(G)$</td><td>$G$ 的生成树的数量</td><td><a href="./sec-7-2-1-6.md#p-401">401</a></td></tr>
<tr><td style="text-align:right">▮</td><td>算法、程序、证明的结束标志</td><td>§1.1</td></tr>
</tbody>
</table>

> 于是为了避免单调乏味地重复 “是等于” 这几个字, 就像我在工作中经常做的那样, 我用了一对平行线, 或等长的双直线, 也就是 $\xlongequal{\phantom{xx}}$, 因为再没有其他两样东西可能是相等的.
>
> ——罗伯特·雷科德,*The Whetstone of Witte*[^v4a-p694-1] (1557)

> 勒让德教授在他的著作 (以后我们将经常引用) 中, 对同余简单地采用了与相等一样的符号. 为了避免混淆, 我没有仿效他, 而是做了区分.
>
> ——高斯, 《算术探索》(1801)

> 有人告诉我, 我放在书中的每一个方程都会使本书的销售量减半.
>
> ——霍金, 《时间简史》(1987)

[^v4a-p694-1]: 这是最早用英文出版的一本代数书. 作者是 16 世纪英国的一位博学者, 曾取得牛津大学数学和剑桥大学医学学位, 是最早牛津大学万灵学院院士 (这所最高傲的学院只设院士不收学生), 担任过两位国王的私人医生. 他在数学上的贡献是首次提出用“=”表示相等. ——译者注
